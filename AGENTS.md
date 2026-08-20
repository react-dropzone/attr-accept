# AGENTS.md

Guidance for AI coding agents in this repo. Human contributors: see the
[Contributing](./README.md#contributing) section of the README.

This is `attr-accept`: a single function, `accept(file, acceptedFiles)`, that checks whether a file
matches an HTML `<input type="file">` `accept` attribute value (MIME types and/or file extensions).
It is a tiny, published npm library written in TypeScript with no runtime dependencies; keep it that
way - the whole point is to stay small.

The toolchain is the Rust-based oxc stack: [oxlint](https://oxc.rs/) to lint,
[oxfmt](https://oxc.rs/) to format, [tsdown](https://tsdown.dev/) (Rolldown + oxc) to build and emit
declarations, and [Vitest](https://vitest.dev/) to test; TypeScript (`tsc --noEmit`) type-checks and
`size-limit` budgets the bundle. There is no Babel, ESLint, Prettier, or Rollup; do not reintroduce
them.

## Workflow

- Clarify the design before implementing. For anything non-trivial, agree on the approach first.
- One unit of change per commit. Never mix unrelated changes. Present the change for review before
  committing.
- Every change ships with tests. Run local CI before calling it done, and do not claim it passes
  without running it.
- Verify against the code and the tools: read before you answer, run before you assert.

Local CI (must be green before review):

```shell
npm run type-check      # tsc --noEmit
npm run lint            # oxlint
npm run lint:type-aware # oxlint --type-aware
npm run format:check    # oxfmt --check
npm run build           # tsdown -> dist/
npm run test:cov        # vitest with coverage
npm run size            # size-limit bundle budget
```

The prek git hooks (installed via `npm install`) auto-run oxfmt and oxlint on staged code and
validate the commit message, but they do not run type-check, the build, or the tests, and they do
not format Markdown. Run the commands above yourself, and run `npm run format` after editing
docs/Markdown or CI's `format:check` will fail on it.

## Writing: code, comments, docs, commits

- Concise and to the point. No fluff. Explain the non-obvious; do not narrate the obvious.
- ASCII only. No em-dash and no `--`; write `-`. Use `->` not the arrow glyph, `!=` not the
  not-equal glyph, and so on.
- Comments justify _why_, not _what_. Delete any comment that restates the code.
- Formatting is not a matter of taste: oxfmt owns it. Run `npm run format` rather than
  hand-formatting. House style (`.oxfmtrc.json`) is double quotes, two-space indent, semicolons, no
  trailing commas, no bracket spacing (`{a, b}`), arrow parens omitted when possible, and a
  120-column print width.

## Commits

- [Conventional Commits](https://www.conventionalcommits.org/); the type set is enforced by a
  commit-msg hook and consumed by semantic-release. Write the subject in the present tense,
  imperative voice: `fix: match extensions case-insensitively`, not `fixed` or `fixes`.
- `feat:`/`fix:`/`perf:` cut a release; `feat!:` or a `BREAKING CHANGE:` footer cuts a major.
  `chore:`/`ci:`/`docs:`/`test:`/`refactor:`/`style:`/`build:` do not. Pick the type with that in
  mind.
- Keep the body minimal, or omit it. A good subject plus the diff is usually enough; add a body only
  for what the code cannot show (why, a trade-off, a non-obvious consequence). Never restate the
  change or narrate the diff.
- Disclose AI with an `Assisted-by: Claude:claude-opus-4-8` trailer. Never `Co-Authored-By`, and
  never add a human's `Signed-off-by`.

## Tests

- Unit tests live beside the source as `src/*.spec.ts` and run under Vitest in the `node`
  environment (the function is pure and does not touch the DOM).
- Cover the matching rules directly: wildcard MIME types (`image/*`), exact MIME types, extensions
  (`.png`), array vs comma-delimited input, and the "accept when there is nothing to match against"
  short-circuits. Table-driven cases keep this readable.
- Coverage must not drop. New code ships with tests that hold or raise it. Measure with
  `npm run test:cov`.

## Code conventions

- Source is TypeScript (ESM); no JSX. The published API is exactly what `src/index.ts` exports: the
  default `accept` function and the `FileWithType` type. Keep the README usage examples in step with
  any public change.
- Stay dependency-free and small. The `size-limit` budget in `package.json` fails the build if the
  bundle grows past its limit; treat that as a design constraint, not an obstacle to raise.

## Build and publish

- `npm run build` bundles `src/index.ts` with tsdown into `dist/` (ESM `.js`, CJS `.cjs`, and the
  `.d.ts` emitted from source). Do not hand-edit anything in `dist/` - it is generated.
- What ships to npm is the `files` allowlist in `package.json` (`dist` and `src`, minus specs); keep
  it accurate.
- Releases are automated by semantic-release from the commit history; the repo version stays
  `0.0.0-development` and is set at publish time. Never bump the version by hand. Runtime is Node
  `>= 22` (`engines`).

## CI workflows

- GitHub Actions live in `.github/workflows` (`test.yml` runs lint/format/types, the test matrix,
  and the size check; `release.yml` publishes). Write the workflow `name:`, every job name, and
  every named step in Sentence case (match the existing files).
- Dependabot groups patch/minor bumps and auto-merges patches on green CI (`.github/dependabot.yml`,
  `dependabot-auto-merge.yml`). Auto-merge trusts CI, so any check that must gate a dependency bump
  has to run in CI.
- Keep workflows minimal and scoped to one purpose; prefer the built-in `GITHUB_TOKEN` over a
  personal access token.
