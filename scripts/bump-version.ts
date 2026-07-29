import { log } from "node:console";
import { $ } from "zx";

const STAGE_FILES = [".changeset", "package.json", "CHANGELOG.md"] as const;

async function main() {
  await $`pnpm changeset version`;
  // Read package.json version after bumping
  const pkg = (await import("../package.json", { with: { type: "json" } }))
    .default;
  const versionNumber = pkg.version;
  const msg = `chore: bump version to ${versionNumber}`;

  await $({
    // Quote the paths to avoid shell expansion
    quote: (str) => str,
    verbose: true,
  })`git add ${STAGE_FILES.join(" ")}`;
  await $`git commit -m ${msg}`;

  log(`Version ${versionNumber} has been committed.`);
}

main();
