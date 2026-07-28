import { $ as zx } from "zx";
// json import
import pkg from "../package.json" with { type: "json" };
import { log } from "node:console";

const $ = zx({
  verbose: true,
});

const COMMITTED_PATHS = [".changeset", "package.json", "CHANGE"] as const;

async function main() {
  const versionNumber = pkg.version;
  const msg = `chore: bump version to ${versionNumber}`;

  await $`pnpm changeset version`;
  await $`git add ${COMMITTED_PATHS.join(" ")}`;
  await $`git commit -m "${msg}"`;

  log(`Version ${versionNumber} has been committed.`);
}

main();
