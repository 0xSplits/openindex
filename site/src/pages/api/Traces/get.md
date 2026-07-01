# Traces.get

Fetches the execution trace for every transaction in a block and flattens each transaction's call tree into a list of [`Traces.BaseTrace`](/api/Traces/types#basetrace) — one entry per call. Traces are collected via the node's `debug_traceBlockByHash` method using the `callTracer`.

Reverted calls are pruned: `callTracer` stamps `error` only on the frame that reverted, but every descendant of an errored frame was reverted along with it, so those descendants are omitted. The errored frame itself is retained, carrying its `error`.

:::warning Requires an RPC endpoint that exposes the `debug` namespace (`debug_traceBlockByHash`). Many public providers disable it — use a node or provider with tracing enabled. :::

## Imports

:::code-group
```ts [Named]
import { Traces } from 'openindex'
```
```ts [Entrypoint]
import * as Traces from 'openindex/Traces'
```
:::

## Examples

```ts twoslash
import { Traces } from 'openindex'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })
const block = await client.getBlock()

const traces = await Traces.get(client, block)
for (const { frame, transactionHash } of traces) {
  console.log(transactionHash, frame.from, frame.to)
}
```

## Definition

```ts
function get(
  client: Compute<PublicClient & {
    chain: Chain;
}>,
  block: viem..Block,
): Promise<get.ReturnType>
```

**Source:** [src/core/Traces.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Traces.ts#L129)

## Parameters

### client

- **Type:** `Compute<PublicClient & {
    chain: Chain;
}>`

A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).

### block

- **Type:** `viem..Block`

The block to trace.

## Return Type

A flattened list of [`Traces.BaseTrace`](/api/Traces/types#basetrace), one per call frame.

`Promise<get.ReturnType>`