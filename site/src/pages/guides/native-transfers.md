---
showAskAi: false
---

# Native Transfers

## Overview

Not every value movement on Ethereum is an ERC-20 `Transfer` event. Native ETH moves as part of transaction execution — plain sends, contract withdrawals, `selfdestruct` payouts — and never emits a log. A [`Handler.NativeHandler`](/api/Handler/types#handlernativehandler) captures these. Create one with [`Handler.native`](/api/Handler/native) and it receives every native transfer in each block, including *internal* transfers made by contracts.

:::warning
Native indexing reads block execution traces via the node's `debug_traceBlockByHash` method. Your RPC endpoint must expose the `debug` namespace — many public providers disable it. Use a node or provider with tracing enabled.
:::

## Basic Usage

Pass a callback to [`Handler.native`](/api/Handler/native). It receives an array of [`Handler.NativeTransfer`](/api/Handler/types#handlernativetransfer) for each indexed block.

```ts twoslash
import { Handler } from 'openindex'

const handler = Handler.native((transfers) => {
  for (const transfer of transfers) {
    transfer.value
    //       ^?
  }
})
```

Each transfer carries the sender, recipient, amount (in wei), and the transaction it occurred in:

| Field             | Type      | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| `from`            | `Address` | Address the value was sent from.                   |
| `to`              | `Address` | Address the value was sent to.                     |
| `value`           | `bigint`  | Amount transferred, in wei.                        |
| `transactionHash` | `Hex`     | Hash of the transaction the transfer occurred in.  |

## What Counts as a Transfer

OpenIndex extracts transfers from the block's call traces, keeping every frame that actually moves value:

- **Top-level sends** and contract-initiated **`CALL`** transfers with a non-zero value.
- **Contract creations** (`CREATE` / `CREATE2`) that fund the new contract with an endowment.
- **`SELFDESTRUCT`** payouts to the beneficiary.

Frames that never move value between accounts are excluded: zero-value calls, `STATICCALL`, and `DELEGATECALL` / `CALLCODE` (which execute in the caller's context and carry only an inherited value, not a new transfer). Reverted calls are dropped too — a transfer inside a frame that later reverted never happened.

## Combining with Event Handlers

[`Indexer.start`](/api/Indexer/start) takes a mixed array of handlers — index native transfers alongside ABI events in the same pass over each block.

```ts twoslash
// @noErrors
import { Handler, Indexer } from 'openindex'
import { parseAbiItem } from 'viem'

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)

const erc20Handler = Handler.fromAbi([transfer], async (logs) => {
  await storeErc20Transfers(logs)
})

const nativeHandler = Handler.native(async (transfers) => {
  await storeNativeTransfers(transfers)
})

Indexer.start(client, [erc20Handler, nativeHandler])
```

:::note
Native indexing traces every block, which is heavier than fetching logs. If you only need contract events, stick to [event handlers](/guides/event-handlers) — traces are fetched only when at least one native handler is registered.
:::

## Related Modules

| Module                  | Description                                                            |
| ----------------------- | --------------------------------------------------------------------- |
| [Handler](/api/Handler) | Constructors and types for event handlers — ABI and native transfers. |
| [Traces](/api/Traces)   | Low-level block trace access that powers native transfer indexing.    |
| [Indexer](/api/Indexer) | High-level indexer that watches blocks and dispatches to handlers.    |
