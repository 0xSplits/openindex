/** @entrypointCategory Core */
// biome-ignore lint/complexity/noUselessEmptyExport: tsdoc
export type {}

/**
 * Block-level indexing primitives. Use {@link openindex#Block.(index:function)} directly when you want to process a known block on demand — for backfilling a specific block, custom schedulers, or testing — rather than subscribing to live blocks via {@link openindex#Indexer.(start:function)}.
 *
 * @example
 * ### Indexing a Single Block
 *
 * Fetch a block and dispatch its logs to a handler:
 *
 * ```ts twoslash
 * import { Block, Handler } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 * const block = await client.getBlock()
 *
 * const transfer = parseAbiItem(
 *   'event Transfer(address indexed from, address indexed to, uint256 value)',
 * )
 * const handler = Handler.fromAbi([transfer], (logs) => {
 *   for (const log of logs) console.log(log.args)
 * })
 *
 * await Block.index(client, block, [handler])
 * ```
 *
 * @category Indexing
 */
export * as Block from './core/Block.js'

/**
 * Base error class and global error type inherited by all OpenIndex errors. Use {@link openindex#Errors.(BaseError:class)} to build custom error types that integrate with OpenIndex's error reporting.
 *
 * @example
 * ### Catching an OpenIndex Error
 *
 * All OpenIndex errors extend `Errors.BaseError`, which carries a structured `shortMessage`, `details`, and optional `cause`:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Errors, Indexer } from 'openindex'
 *
 * try {
 *   Indexer.start(client, [handler])
 * } catch (error) {
 *   if (error instanceof Errors.BaseError) {
 *     console.error(error.shortMessage)
 *     console.error(error.details)
 *   }
 * }
 * ```
 *
 * @category Errors
 */
export * as Errors from './core/Errors.js'

/**
 * Constructors and types for event handlers. Build an ABI-typed handler with {@link openindex#Handler.(fromAbi:function)} — pairing an [abitype Abi](https://abitype.dev/api/types#abi) with a callback that receives strongly-typed logs matching the ABI — or a native transfer handler with {@link openindex#Handler.(native:function)} to receive every value transfer (including internal transfers) in a block.
 *
 * @example
 * ### Single Event
 *
 * Build a handler for one event with viem's [parseAbiItem](https://viem.sh/docs/abi/parseAbiItem):
 *
 * ```ts twoslash
 * import { Handler } from 'openindex'
 * import { parseAbiItem } from 'viem'
 *
 * const transfer = parseAbiItem(
 *   'event Transfer(address indexed from, address indexed to, uint256 value)',
 * )
 *
 * const handler = Handler.fromAbi([transfer], (logs) => {
 *   for (const log of logs) console.log(log.args.value)
 * })
 * ```
 *
 * @example
 * ### From a Contract ABI
 *
 * Pull an event off an existing contract ABI with viem's [getAbiItem](https://viem.sh/docs/abi/getAbiItem):
 *
 * ```ts twoslash
 * import { Handler } from 'openindex'
 * import { erc20Abi, getAbiItem } from 'viem'
 *
 * const transfer = getAbiItem({ abi: erc20Abi, name: 'Transfer' })
 *
 * const handler = Handler.fromAbi([transfer], (logs) => {
 *   for (const log of logs) console.log(log.args.value)
 * })
 * ```
 *
 * @category Indexing
 */
export * as Handler from './core/Handler.js'

/**
 * High-level indexer that watches blocks via a viem `PublicClient` and dispatches matching logs to your event handlers in real time.
 *
 * @example
 * ### Basic Usage
 *
 * Start an indexer with a viem client and one or more {@link openindex#Handler.Handler} handlers. The indexer subscribes to new blocks and dispatches each block's matching logs:
 *
 * ```ts twoslash
 * import { Handler, Indexer } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 *
 * const transfer = parseAbiItem(
 *   'event Transfer(address indexed from, address indexed to, uint256 value)',
 * )
 * const handler = Handler.fromAbi([transfer], (logs) => {
 *   for (const log of logs) console.log(log.args)
 * })
 *
 * Indexer.start(client, [handler])
 * ```
 *
 * @example
 * ### Handling Errors
 *
 * Pass an `onError` callback to capture indexing failures without crashing the process. Errors are wrapped in {@link openindex#Indexer.IndexingError}:
 *
 * ```ts twoslash
 * // @noErrors
 * import { Indexer } from 'openindex'
 *
 * Indexer.start(client, [handler], {
 *   onError: (error) => {
 *     if (error instanceof Indexer.IndexingError) {
 *       console.error(`Indexing failed: ${error.shortMessage}`)
 *     }
 *   },
 * })
 * ```
 *
 * @category Indexing
 */
export * as Indexer from './core/Indexer.js'

/**
 * Low-level access to a block's execution traces. {@link openindex#Traces.(get:function)} fetches the full call tree for every transaction in a block via the node's `debug_traceBlockByHash` method (using the `callTracer`) and flattens it into a list of {@link openindex#Traces.BaseTrace} — one entry per call. This is the primitive that powers native transfer indexing; reach for it directly when you need custom internal-call logic beyond {@link openindex#Handler.(native:function)}.
 *
 * :::warning
 * Tracing requires an RPC endpoint that exposes the `debug` namespace (`debug_traceBlockByHash`). Many public providers disable it — use a node or provider with tracing enabled.
 * :::
 *
 * @example
 * ### Fetching Block Traces
 *
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
 *   console.log(transactionHash, frame.from, frame.to, frame.value)
 * }
 * ```
 *
 * @category Traces
 */
export * as Traces from './core/Traces.js'
