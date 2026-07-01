# Traces

Low-level access to a block's execution traces. [`Traces.get`](/api/Traces/get) fetches the full call tree for every transaction in a block via the node's `debug_traceBlockByHash` method (using the `callTracer`) and flattens it into a list of [`Traces.BaseTrace`](/api/Traces/types#basetrace) — one entry per call. This is the primitive that powers native transfer indexing; reach for it directly when you need custom internal-call logic beyond [`Handler.native`](/api/Handler/native).

:::warning
Tracing requires an RPC endpoint that exposes the `debug` namespace (`debug_traceBlockByHash`). Many public providers disable it — use a node or provider with tracing enabled.
:::

## Examples

### Fetching Block Traces

```ts twoslash
import { Traces } from 'openindex'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })
const block = await client.getBlock()

const traces = await Traces.get(client, block)
for (const { frame, transactionHash } of traces) {
  console.log(transactionHash, frame.from, frame.to, frame.value)
}
```

## Functions

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Traces.get`](/api/Traces/get) | Fetches the execution trace for every transaction in a block and flattens each transaction's call tree into a list of [`Traces.BaseTrace`](/api/Traces/types#basetrace) — one entry per call. Traces are collected via the node's `debug_traceBlockByHash` method using the `callTracer`. |

## Types

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Traces.BaseTrace`](/api/Traces/types#tracesbasetrace) | A single flattened call frame from a block's execution trace, produced by [`Traces.get`](/api/Traces/get). Each entry corresponds to one call in a transaction's call tree. |
| [`Traces.CallFrame`](/api/Traces/types#tracescallframe) | A raw call frame as returned by the `callTracer`. Represents one node in a transaction's call tree; nested sub-calls are listed in `calls`. |