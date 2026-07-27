#!/usr/bin/env zx
import dedent from "dedent";
import { log } from "node:console";
import { parseArgs, type ParseArgsConfig } from "node:util";
import { cwd } from "node:process";
import { match, P } from "ts-pattern";
import { z } from "zod";
import { $ as zx$ } from "zx";
import { tryCatch } from "../src/types/result.ts";
import { join } from "node:path";
import { writeFile } from "node:fs";

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
async function bumpVersion(version: BumpType) {
  // TODO: Ensure not to add commit messages that were previously
  // included commit lines changeset version files.
  const out = await $`git log --reverse --format="→ [%h] %s%n%b"`;
  const outStr = out.stdout;

  const dirName = cwd();
  const outFile = "git-commit-history.txt";

  // FIXME: remove this outfile and replace with
  // sending the output straight to changeset's message
  // field for the command `pnpm changesets`
  return writeFile(join(dirName, outFile), outStr, "utf8", (error) => {
    if (error) {
      log(`failed to write ${outFile} to ${dirName}: ${error}`);
    } else {
      log(`wrote ${outFile} to ${dirName}`);
    }
  });

  // FIXME: DO THIS INSTEAD
  // $`p changeset add --${version} --message ${text}`;
}

function main() {
  const result = tryCatch(() => parseArgs(opts), "failed to parse args");

  match(result)
    .when(
      (result) => result.success,
      ({ data: args }) => {
        match(args)
          .with(
            {
              values: {
                help: true,
              },
            },
            printUsage,
          )
          .with(
            {
              values: { version: P.string.and(P.when(isBumpType)).select() },
            },
            (version) => bumpVersion(version),
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

              bumpVersion(version);
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
