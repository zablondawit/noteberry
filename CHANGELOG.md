# @qeberodev/noteberry

## 0.0.4

### Patch Changes

- 3aff5fc: [3a0d532] feat: use the react codemirror setup
  - use react instead of the vanilla setup

  [c6c1801] feat: react editor component
  - add a scaffold for uiw's codemirror component

  [c99e0b4] Update math.ts

  [91ad32a] feat: add vanilla-css for styling

  [08a7be5] chore: update cspell.json

  [8f093a7] feat: update switch to react
  - add an editor using @uiw's codemirror editor

## 0.0.3

### Patch Changes

- 394252c: [5a7977e] chore: update CONTRIBUTING.md
  - add a guide on how to contribute to codeberry

  [5a24c6e] chore: update generate-version.ts
  - filter from feature branch to main tip

## 0.0.2

### Patch Changes

- 0838ce5: [8cd5f2c] chore: update versioning scripts

  [e86620e] chore: generate changeset file

  [abce047] chore: update versioning scripts
  - change bump-version.ts to generate-changeset.ts, naming correction
  - add script to bump version to update package.json file and CHANGELOG
    file
  - generate changeset file using generate-changeset.ts

  [d998a72] chore: bump package version 0.0.1

  [562b481] chore: bump patch version

  [d51c30a] chore: add npm scripts for versioning

  [17c358b] Update bump-version.ts

  [7461758] fix: remove unused code
  - math.js: update `fail` call
  - tsconfig.app.json: supress `baseUrl` deprication warning
  - editor.tsx: remove unused react component

  [38fab3d] Update bump-version.ts

  [5a75c45] chore: update bump-version.ts
  - setup commands to be called for reading commit mesasages
  - output the result of the listed commit messages
  - update command to create a version entry with selected version type
    and messages

  [6f78a8d] Update bump-version.ts

  [81b2b81] Update result.ts

  [eacebc9] feat: refactor bump-version to use ts-pattern
  - robust version bump cli :)
  - for authoritative place for storing scripts

  [e4c6eed] fix: refactor tryCatch error handling
  Update error-handling API in src/types/result.ts: fail now takes the
  error before ctx and tryCatch forwards the caught error. Add isBumpType
  guard, bumpVersion stub, and allow positional args in the parser.

  [bd41dea] chore: create bump-version.ts
  - for bumping versions in a specific way

  [18594fa] chore: initial consolidated work
