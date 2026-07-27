#!/usr/bin/env zx
import { $ as zx$ } from "zx";
import { parseArgs, type ParseArgsConfig } from "node:util";
import { log } from "node:console";
import dedent from "dedent";
import { z } from "zod";
import { match, P } from "ts-pattern";
import { tryCatch } from "../src/types/result.ts";

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

function bumpVersion(version: BumpType) {
  // $`p changeset add --${version}`;
  $`echo "not implemented"`;
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
                log("Invalid version specified:", version);
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
