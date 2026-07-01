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
 * import { Block, EventHandler } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 * const block = await client.getBlock()
 *
 * const transfer = parseAbiItem(
 *   'event Transfer(address indexed from, address indexed to, uint256 value)',
 * )
 * const handler = EventHandler.from([transfer], (logs) => {
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
 * The viem [`PublicClient`](https://viem.sh/docs/clients/public#public-client) type used throughout OpenIndex. OpenIndex requires a client with a `chain` configured — the chain is used for error reporting and chain-aware dispatch.
 *
 * @example
 * ### Setting up a Client
 *
 * ```ts twoslash
 * import type { Client } from 'openindex'
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client: Client.Type = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * ```
 *
 * @category Indexing
 */
export * as Client from './core/Client.js'
/**
 * Base error class and global error type inherited by all OpenIndex errors. Use {@link openindex#Errors.BaseError} to build custom error types that integrate with OpenIndex's error reporting.
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
 * Constructors and types for ABI-typed event handlers. An event handler pairs an [abitype Abi](https://abitype.dev/api/types#abi) with a callback that receives strongly-typed logs matching the ABI.
 *
 * @example
 * ### Single Event
 *
 * Build a handler for one event with viem's [parseAbiItem](https://viem.sh/docs/abi/parseAbiItem):
 *
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 * import { parseAbiItem } from 'viem'
 *
 * const transfer = parseAbiItem(
 *   'event Transfer(address indexed from, address indexed to, uint256 value)',
 * )
 *
 * const handler = EventHandler.from([transfer], (logs) => {
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
 * import { EventHandler } from 'openindex'
 * import { erc20Abi, getAbiItem } from 'viem'
 *
 * const transfer = getAbiItem({ abi: erc20Abi, name: 'Transfer' })
 *
 * const handler = EventHandler.from([transfer], (logs) => {
 *   for (const log of logs) console.log(log.args.value)
 * })
 * ```
 *
 * @category Indexing
 */
export * as EventHandler from './core/EventHandler.js'
/**
 * High-level indexer that watches blocks via a viem `PublicClient` and dispatches matching logs to your event handlers in real time.
 *
 * @example
 * ### Basic Usage
 *
 * Start an indexer with a viem client and one or more {@link openindex#EventHandler.Type} handlers. The indexer subscribes to new blocks and dispatches each block's matching logs:
 *
 * ```ts twoslash
 * import { EventHandler, Indexer } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 *
 * const transfer = parseAbiItem(
 *   'event Transfer(address indexed from, address indexed to, uint256 value)',
 * )
 * const handler = EventHandler.from([transfer], (logs) => {
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
