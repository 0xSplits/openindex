import type {
  Chain,
  PublicClient,
  Address as viem__Address,
  Block as viem__Block,
  Hex as viem__Hex,
} from 'viem'

import type * as Errors from './Errors.js'
import type { Compute } from './internal/types.js'

/**
 * A single flattened call frame from a block's execution trace, produced by {@link openindex#Traces.(get:function)}. Each entry corresponds to one call in a transaction's call tree.
 */
export type BaseTrace = {
  /** The raw call frame returned by the `callTracer`. */
  frame: CallFrame
  /** Hash of the transaction this frame belongs to. */
  transactionHash: viem__Hex
  /** Index path of this frame within the transaction's call tree, from the root call. An empty array is the top-level call; `[0, 2]` is the third sub-call of the first sub-call. */
  tracePath: Array<number>
}

/**
 * Fetches the execution trace for every transaction in a block and flattens each transaction's call tree into a list of {@link openindex#Traces.BaseTrace} — one entry per call. Traces are collected via the node's `debug_traceBlockByHash` method using the `callTracer`.
 *
 * Reverted calls are pruned: `callTracer` stamps `error` only on the frame that reverted, but every descendant of an errored frame was reverted along with it, so those descendants are omitted. The errored frame itself is retained, carrying its `error`.
 *
 * :::warning
 * Requires an RPC endpoint that exposes the `debug` namespace (`debug_traceBlockByHash`). Many public providers disable it — use a node or provider with tracing enabled.
 * :::
 *
 * @example
 * ```ts twoslash
 * import { Traces } from 'openindex'
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 * const block = await client.getBlock()
 *
 * const traces = await Traces.get(client, block)
 * for (const { frame, transactionHash } of traces) {
 *   console.log(transactionHash, frame.from, frame.to)
 * }
 * ```
 *
 * @param client - A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).
 * @param block - The block to trace.
 * @returns A flattened list of {@link openindex#Traces.BaseTrace}, one per call frame.
 */
export async function get(
  client: Compute<PublicClient & { chain: Chain }>,
  block: viem__Block,
): Promise<get.ReturnType> {
  const traces: TraceBlockResult = await client.request({
    // A bug in viem's types prevents these params from being accepted without casting to `any`
    method: 'debug_traceBlockByHash' as any,
    params: [block.hash, { tracer: 'callTracer' }] as any,
  })

  const flatCalls = traces.flatMap(({ result, txHash }) =>
    flattenCalls(result, txHash, block),
  )

  return flatCalls
}

export declare namespace get {
  type ReturnType = Array<BaseTrace>

  type ErrorType = Errors.GlobalErrorType
}

const flattenCalls = (
  frame: CallFrame,
  transactionHash: viem__Hex,
  block: viem__Block,
  tracePath: Array<number> = [],
): Array<BaseTrace> => {
  // geth's callTracer only stamps `error` on the frame that reverted, but every
  // descendant of an errored frame was reverted too — skip all descendants
  if (frame.error) return [{ frame, transactionHash, tracePath }]
  return [
    { frame, transactionHash, tracePath },
    ...(frame.calls ?? []).flatMap((child, i) =>
      flattenCalls(child, transactionHash, block, [...tracePath, i]),
    ),
  ]
}

/**
 * A raw call frame as returned by the `callTracer`. Represents one node in a transaction's call tree; nested sub-calls are listed in `calls`.
 */
export type CallFrame = {
  /** Address that initiated the call. */
  from: viem__Address
  /** Address that was called. Omitted or `null` for frames without a callee. */
  to?: viem__Address | null
  /** Gas provided to the call, as a hex quantity. */
  gas: viem__Hex
  /** Gas consumed by the call, as a hex quantity. */
  gasUsed: viem__Hex
  /** Call input data. */
  input: viem__Hex
  /** Call output data, if any. */
  output?: viem__Hex
  /** Value transferred by the call, in wei, as a hex quantity. */
  value?: viem__Hex
  /** The EVM operation that produced this frame. */
  type:
    | 'CALL'
    | 'STATICCALL'
    | 'DELEGATECALL'
    | 'CALLCODE'
    | 'CREATE'
    | 'CREATE2'
    | 'SELFDESTRUCT'
  /** Revert reason, present only when the call errored. */
  error?: string
  /** Sub-calls made within this frame. */
  calls?: Array<CallFrame>
}

type TraceBlockResult = Array<{
  txHash: viem__Hex
  result: CallFrame
}>
