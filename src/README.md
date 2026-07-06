<br/>

<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/0xSplits/openindex/main/.github/openindex-dark.svg">
      <img alt="OpenIndex logo" src="https://raw.githubusercontent.com/0xSplits/openindex/main/.github/openindex-light.svg" width="auto" height="200">
    </picture>
</p>

<p align="center">
  Easier indexing for Ethereum.
<p>

<p align="center">
  <a href="https://www.npmjs.com/package/openindex">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/v/openindex?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/v/openindex?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Version">
    </picture>
  </a>
  <a href="https://github.com/0xSplits/openindex/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/npm/l/openindex?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/npm/l/openindex?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="MIT License">
    </picture>
  </a>
  <a href="https://app.codecov.io/gh/0xSplits/openindex">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/codecov/c/github/0xSplits/openindex?colorA=21262d&colorB=21262d&style=flat">
      <img src="https://img.shields.io/codecov/c/github/0xSplits/openindex?colorA=f6f8fa&colorB=f6f8fa&style=flat" alt="Code coverage">
    </picture>
  </a>
</p>

## Overview

OpenIndex is a lightweight, type-safe EVM indexer built on [viem](https://viem.sh). It turns a viem `PublicClient` into a live event indexer: you describe the events you care about with an ABI, write a handler, and OpenIndex watches new blocks and dispatches matching logs to your handler in real time.

Handlers are imperative, so you keep full control over event filters, transforms, and storage — index into a database, a queue, memory, or anywhere else you like.

## Install

```bash
pnpm add openindex viem
```

```bash
npm install openindex viem
```

```bash
bun add openindex viem
```

## Example

Index `Transfer` events on Ethereum mainnet:

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'
import { EventHandler, Indexer } from 'openindex'

const client = createPublicClient({ chain: mainnet, transport: http() })

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)

const handler = EventHandler.from([transfer], (logs) => {
  for (const log of logs) {
    console.log(log.args.from, '→', log.args.to, log.args.value)
  }
})

Indexer.start(client, [handler])
```

The `logs` passed to your handler are fully typed from the ABI you provide.

## License

[MIT](https://github.com/0xSplits/openindex/blob/main/LICENSE) License
