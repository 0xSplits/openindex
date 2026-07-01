# OpenIndex – Type-safe Ethereum Indexer

## Overview

OpenIndex is a lightweight, type-safe Ethereum indexer built on [viem](https://viem.sh). It watches new blocks through a viem `PublicClient` and dispatches matching logs to ABI-typed event handlers.

It provides a minimal set of primitives that compose into a working indexer in a few lines of TypeScript. There is no embedded RPC client, no scheduler, no storage layer: OpenIndex handles dispatch, you bring the transport and decide what to do with the events. This enables unlimited possibilities for how to filter, transform, and store indexed events.

As a thin layer above viem, OpenIndex can take advantage of all existing viem features with zero overhead, including typed events, RPC fallbacks, and more.

## Installation

:::code-group
```bash [pnpm]
pnpm add openindex viem
```

```bash [npm]
npm install openindex viem
```

```bash [bun]
bun add openindex viem
```
:::

## Example Usage

```ts twoslash
import { EventHandler, Indexer } from 'openindex'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

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

:::tip
OpenIndex takes advantage of modules for code readability and editor autocomplete. It's important to note that these differ from classes and are fully tree-shakable, meaning the final bundle size will only include what you use. See [Imports & Bundle Size](/imports) to learn more.
:::

## How to Read These Docs

The docs are split into two parts — **Guides** and the [API Reference](/api).

The **Guides** walk through complete flows: setting up a client, writing an event handler, and handling errors at the indexer level. Start there if you're new to OpenIndex.

The **API Reference** documents every module and function. Each page follows the Module → Function pattern, so `Indexer.start` lives at [`/api/Indexer/start`](/api/Indexer/start), `EventHandler.from` at [`/api/EventHandler/from`](/api/EventHandler/from), and so on.

If you know what you're looking for, hit `/` to search.
