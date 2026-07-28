# @qeberodev/noteberry

## 0.0.1

### Patch Changes

- 562b481: initial release
  → [18594fa] chore: initial consolidated work

  → [bd41dea] chore: create bump-version.ts
  - for bumping versions in a specific way

  → [e4c6eed] fix: refactor tryCatch error handling
  Update error-handling API in src/types/result.ts: fail now takes the
  error before ctx and tryCatch forwards the caught error. Add isBumpType
  guard, bumpVersion stub, and allow positional args in the parser.

  → [eacebc9] feat: refactor bump-version to use ts-pattern
  - robust version bump cli :)
  - for authoritative place for storing scripts

  → [81b2b81] Update result.ts

  → [6f78a8d] Update bump-version.ts

  → [5a75c45] chore: update bump-version.ts
  - setup commands to be called for reading commit mesasages
  - output the result of the listed commit messages
  - update command to create a version entry with selected version type
    and messages

  → [38fab3d] Update bump-version.ts

  → [7461758] fix: remove unused code
  - math.js: update `fail` call
  - tsconfig.app.json: supress `baseUrl` deprication warning
  - editor.tsx: remove unused react component

  → [17c358b] Update bump-version.ts
