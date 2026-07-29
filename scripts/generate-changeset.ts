#!/usr/bin/env zx
import dedent from "dedent";
import { log } from "node:console";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { parseArgs, type ParseArgsConfig } from "node:util";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { $ as zx$ } from "zx";
import { tryCatch } from "../src/types/result.ts";
import { randomBytes } from "node:crypto";

const opts = {
  options: {
    version: {
      type: "string",
      short: "v",
    },
    help: {
      type: "boolean",
      short: "h",
    },
  },
  allowPositionals: true,
} as const as ParseArgsConfig;

let $ = zx$({
  verbose: true,
});

const bumpTypes = z.enum(["major", "minor", "patch"]);

function printUsage() {
  const helpMessage = dedent`
    Usage: bump-version.ts [options]

    Options:
      -v, --version  <bump-type>  Specify the bump type (major, minor, patch)
      -h, --help     Display this help message
  `;
  log(helpMessage);
}

type BumpType = z.infer<typeof bumpTypes>;
const isBumpType = (version: string): version is BumpType =>
  bumpTypes.safeParse(version).success;

// usage: https://changesets.dev/guide/cli#add
async function generateChanges(version: BumpType) {
  // process result for git commit history
  // should filter from feature branch till main branch
  const pResult =
    await $`git --no-pager log --format="[%h] %s%n%b" main..HEAD`.quiet();
  const changelogMessage = pResult.stdout;

  // Read package.json to get package name
  const packageJsonPath = join(cwd(), "package.json");
  const packageJson = JSON.parse(
    await $`cat ${packageJsonPath}`.quiet().then((r) => r.stdout),
  );
  const packageName = packageJson.name;

  // Generate a random changeset ID (similar to how changesets does it)
  const changesetId = randomBytes(4).toString("hex");
  const changesetFileName = `${changesetId}.md`;
  const changesetPath = join(cwd(), ".changeset", changesetFileName);

  // Create changeset file content
  // Format: https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md
  const changesetContent = dedent`---
  "${packageName}": ${version}
  ---

  ${changelogMessage}
`;

  // Write the changeset file
  await writeFile(changesetPath, changesetContent, "utf8");

  log(`✅ Created changeset: .changeset/${changesetFileName}`);
  log(`📦 Package: ${packageName}`);
  log(`🔼 Version bump: ${version}`);
}

function main() {
  const argsResult = tryCatch(() => parseArgs(opts), "failed to parse args");

  // parse args and match result
  match(argsResult)
    .when(
      (result) => result.success,
      ({ data: args }) => {
        match(args)
          .with({ values: { help: true } }, printUsage)
          .with(
            { values: { version: P.string.and(P.when(isBumpType)).select() } },
            (version) => generateChanges(version),
          )
          .with(
            {
              positionals: P.when(
                (positionals) => P.array(P.string) && positionals.length > 1,
              ),
            },
            ({ positionals }) => {
              const version = positionals[1];
              if (!isBumpType(version)) {
                log("Invalid version type specified:", version);
                printUsage();
                return;
              }

              generateChanges(version);
            },
          )
          .otherwise(() => {
            log("No valid version specified");
            printUsage();
          });
      },
    )
    .otherwise(({ message }) => {
      log("Encountered Error:", message);
      printUsage();
    });
}

main();
