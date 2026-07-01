---
showAskAi: false
---

# Getting Started

## Overview

OpenIndex turns a viem `PublicClient` into a live event indexer. You provide a chain client, describe the events you care about with an ABI, and write a handler. OpenIndex watches new blocks and dispatches matching logs to your handler in real time.

Walk through the three steps below to index `Transfer` events on Ethereum mainnet.

::::steps

### Setup a viem client

OpenIndex consumes a [viem `PublicClient`](https://viem.sh/docs/clients/public#public-client). The client must have a `chain` configured — OpenIndex uses it for error reporting and chain-aware dispatch.

```ts twoslash
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
})
```

:::tip
Any viem transport works — `http`, `webSocket`, or `fallback`. For high-throughput indexing, prefer `webSocket` or a `fallback` over several reliable RPCs.
:::

### Define an event handler

A [`Handler.AbiEventHandler`](/api/Handler/types#handlerabieventhandler) pairs an ABI with a callback. The callback receives strongly-typed log entries matching the ABI you provided.

```ts twoslash
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { Handler } from 'openindex' // [!code focus]
import { parseAbiItem } from 'viem' // [!code focus]

const client = createPublicClient({ chain: mainnet, transport: http() })

const transfer = parseAbiItem( // [!code focus]
  'event Transfer(address indexed from, address indexed to, uint256 value)', // [!code focus]
) // [!code focus]

const handler = Handler.fromAbi([transfer], (logs) => { // [!code focus]
  for (const log of logs) { // [!code focus]
    console.log(log.args.from, '→', log.args.to, log.args.value) // [!code focus]
  } // [!code focus]
}) // [!code focus]
```

:::note
The `logs` parameter is fully typed based on the ABI you pass. Hover over `log.args` in your editor to see the inferred fields.
:::

### Start the indexer

[`Indexer.start`](/api/Indexer/start) subscribes to new blocks and dispatches each block's matching logs to every handler you pass in.

```ts twoslash
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { Handler, Indexer } from 'openindex'
import { parseAbiItem } from 'viem'

const client = createPublicClient({ chain: mainnet, transport: http() })

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)

const handler = Handler.fromAbi([transfer], (logs) => {
  for (const log of logs) {
    console.log(log.args.from, '→', log.args.to, log.args.value)
  }
})

Indexer.start(client, [handler]) // [!code focus]
```

The indexer is now watching new blocks and dispatching `Transfer` events to your handler. Keep the process alive to keep indexing.

::::

## Related Modules

| Module                                | Description                                                                |
| ------------------------------------- | -------------------------------------------------------------------------- |
| [Indexer](/api/Indexer)               | High-level indexer that watches blocks and dispatches logs to handlers.    |
| [Handler](/api/Handler)               | Constructors and types for event handlers — ABI and native transfers.      |
| [Block](/api/Block)                   | Block-level indexing primitives.                                           |
