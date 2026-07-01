# Handler.native

Creates a new native transfer handler. The handler receives every native value (ETH) transfer in each indexed block — including internal transfers made by contracts (`CALL` value sends, `CREATE`/`CREATE2` endowments, and `SELFDESTRUCT` payouts). Value-less calls and `DELEGATECALL`/`CALLCODE` frames, which never move value between accounts, are excluded.

:::warning Native indexing relies on block traces, which require an RPC endpoint that exposes the `debug` namespace (`debug_traceBlockByHash`). Many public providers disable it — use a node or provider with tracing enabled. See [`Traces.get`](/api/Traces/get). :::

## Imports

:::code-group
```ts [Named]
import { Handler } from 'openindex'
```
```ts [Entrypoint]
import * as Handler from 'openindex/Handler'
```
:::

## Examples

```ts twoslash
import { Handler } from 'openindex'

Handler.native((transfers) => {
  for (const transfer of transfers) {
    console.log(`${transfer.from} -> ${transfer.to}: ${transfer.value}`)
  }
})
```

## Definition

```ts
function native(
  handler: (transfers: Array<NativeTransfer>) => void | Promise<void>,
): native.ReturnType
```

**Source:** [src/core/Handler.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Handler.ts#L155)

## Parameters

### handler

- **Type:** `(transfers: Array<NativeTransfer>) => void | Promise<void>`

Handler function receiving the block's [`Handler.NativeTransfer`](/api/Handler/types#nativetransfer) list.

## Return Type

A [`Handler.NativeHandler`](/api/Handler/types#nativehandler).

`native.ReturnType`