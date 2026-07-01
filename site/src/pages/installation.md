---
showAskAi: false
---

# Installation

Install OpenIndex via your package manager.

## Package Manager

OpenIndex depends on [viem](https://viem.sh) as a peer dependency. Install both together.

:::code-group
```bash [pnpm]
pnpm add openindex viem
```

```bash [npm]
npm install openindex viem
```

```bash [yarn]
yarn add openindex viem
```

```bash [bun]
bun add openindex viem
```
:::

## Using Unreleased Commits

If a fix or feature you need is on `main` but not yet in a release, install from the `canary` tag, which tracks the [`main`](https://github.com/gregfromstl/openindex/tree/main) branch on every push.

:::code-group
```bash [pnpm]
pnpm add openindex@canary
```

```bash [npm]
npm install openindex@canary
```

```bash [yarn]
yarn add openindex@canary
```

```bash [bun]
bun add openindex@canary
```
:::

Or clone the repo and link it locally:

```bash
gh repo clone gregfromstl/openindex
cd openindex
pnpm install
pnpm build
pnpm link --global
```

Then in your project: `pnpm link --global openindex` (or your package manager's equivalent).

## Security

JavaScript supply-chain attacks have been on the rise. A few low-effort steps to reduce your risk:

- Pin package versions, upgrade mindfully, and review lockfile diffs in PRs. See the Node.js [supply-chain attacks](https://nodejs.org/en/guides/security/#supply-chain-attacks) guide.
- Install [Socket Security](https://socket.dev)'s [GitHub App](https://github.com/apps/socket-security) to flag risky dependency changes before merge.
- Add a [Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) if you're shipping to a browser.
