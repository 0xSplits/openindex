> This is a sample OpenIndex page to get your started. Customize it with your own instructions!

# Installation

Install OpenIndex via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages.

:::code-group
```bash [pnpm]
pnpm install openindex
```

```bash [npm]
npm install openindex
```

```bash [yarn]
yarn add openindex
```

```bash [bun]
bun install openindex
```
:::

## Using Unreleased Commits

If you can't wait for a new release to test the latest features, you can either install from the `canary` tag (tracks the [`main`](https://github.com/gregfromstl/openindex/tree/main) branch).

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

Or clone the [package repo](https://github.com/gregfromstl/openindex) to your local machine, build, and link it yourself.

```bash
gh repo clone gregfromstl/openindex
cd openindex
pnpm install
pnpm build
pnpm link --global
```

Then go to the project where you are using Openindex and run `pnpm link --global openindex` (or the package manager that you used to link Openindex globally).

## Security

An increased reliance on AI in recent years has caused an influx in security incidents involving Javascript packages like this one. Make sure you follow security best-practices for your project. Some quick things to get started.

- Pin package versions, upgrade mindfully, and inspect lockfile changes to minimize the risk of [supply-chain attacks](https://nodejs.org/en/guides/security/#supply-chain-attacks).
- Install the [Socket Security](https://socket.dev) [GitHub App](https://github.com/apps/socket-security) to help detect and block supply-chain attacks.
- Add a [Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html) to defend against external scripts running in your app.

