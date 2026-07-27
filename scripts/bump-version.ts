#!/usr/bin/env zx
import { $ as zx$ } from "zx";
import { parseArgs, type ParseArgsConfig } from "node:util";
import { log } from "node:console";
import dedent from "dedent";
import { z } from "zod";

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

function main() {
  const { values: args } = parseArgs(opts);
  const help = args.help;
  if (help) {
    printUsage();
    return;
  }

  const version = args.version;
  const { success, data } = bumpTypes.safeParse(version);
  if (!success) {
    printUsage();
    return;
  }

  $`echo "bumping ${data} version"`;
  // $`p changeset add --${version}`;
}

main();
