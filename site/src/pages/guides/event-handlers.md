---
showAskAi: false
---

# Event Handlers

## Overview

An [`EventHandler.Type`](/api/EventHandler/types#type) pairs an ABI with a callback. OpenIndex uses the ABI two ways: to filter incoming logs to the events you care about, and to fully type the `logs` argument passed to your callback.

There are three common shapes for constructing a handler, and one pattern for combining them.

## Single Event

When you only care about a single event, define it inline with viem's [`parseAbiItem`](https://viem.sh/docs/abi/parseAbiItem) and pass it as a one-element array.

```ts twoslash
import { EventHandler } from 'openindex'
import { parseAbiItem } from 'viem'

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)

const handler = EventHandler.from([transfer], (logs) => {
  for (const log of logs) {
    log.args.from
    //       ^?
  }
})
```

## From an Existing Contract ABI

If you already have a contract ABI (e.g. viem's `erc20Abi`), pull a single event off it with [`getAbiItem`](https://viem.sh/docs/abi/getAbiItem):

```ts twoslash
import { EventHandler } from 'openindex'
import { erc20Abi, getAbiItem } from 'viem'

const transfer = getAbiItem({ abi: erc20Abi, name: 'Transfer' })

const handler = EventHandler.from([transfer], (logs) => {
  for (const log of logs) {
    log.args.value
    //       ^?
  }
})
```

## Full Contract ABI

When you want a single handler that fires for *every* event on a contract — for audit logs, generic event sinks, or full contract mirroring — pass the whole ABI. The callback receives a union of all event types; narrow with `log.eventName` when you need per-event behavior.

```ts twoslash
import { EventHandler } from 'openindex'
import { erc20Abi } from 'viem'

const handler = EventHandler.from(erc20Abi, (logs) => {
  for (const log of logs) {
    if (log.eventName === 'Transfer') {
      log.args.value
      //       ^?
    }
    if (log.eventName === 'Approval') {
      log.args.spender
      //       ^?
    }
  }
})
```

:::tip
If you only care about a few of the contract's events, prefer one handler per event with a narrow ABI (see below) — it makes the handler's contract obvious without runtime checks.
:::

## Multiple Handlers in One Indexer

[`Indexer.start`](/api/Indexer/start) accepts an array of handlers. Each handler should be scoped to exactly the events it cares about via its ABI — no runtime filtering needed.

```ts twoslash
// @noErrors
import { EventHandler, Indexer } from 'openindex'
import { parseAbiItem } from 'viem'

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)
const approval = parseAbiItem(
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
)

const transferHandler = EventHandler.from([transfer], async (logs) => {
  await writeTransfersToDb(logs)
})

const approvalHandler = EventHandler.from([approval], async (logs) => {
  for (const log of logs) {
    await trackApproval(log)
  }
})

Indexer.start(client, [transferHandler, approvalHandler])
```

:::note
Handlers run concurrently within a single block via `Promise.all`. If your handlers write to a shared store, make sure the writes are safe to interleave.
:::

## Related Modules

| Module                              | Description                                                             |
| ----------------------------------- | ----------------------------------------------------------------------- |
| [EventHandler](/api/EventHandler)   | Constructors and types for ABI-typed event handlers.                    |
| [Indexer](/api/Indexer)             | High-level indexer that watches blocks and dispatches logs to handlers. |
| [Block](/api/Block)                 | Block-level indexing primitives, including the per-block dispatch loop. |
