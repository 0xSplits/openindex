import {
  type Abi,
  parseEventLogs,
  type Block as viem__Block,
  type Hex as viem__Hex,
} from 'viem'
import type { EventHandler } from '../index.js'
import type { Client } from './Client.js'
import type * as Errors from './Errors.js'

/**
 * The base Block type, extended from [viem Block](https://viem.sh/docs/api/classes/Block).
 */
export type Block = viem__Block & {
  hash: viem__Hex
}

/**
 * Starts a new indexer with the provided [viem PublicClient](https://viem.sh/docs/clients/public#public-client) and {@link openindex#Event.Event} array.
 *
 * @example
 * ```ts twoslash
 * import { Indexer } from 'openindex'
 *
 * Indexer.start()
 * ```
 *
 * @param client - A [viem PublicClient](https://viem.sh/docs/clients/public#public-client)
 * @param handlers - Array of {@link openindex#EventHandler.Type} to index on
 * @param options - Indexing options such as error handler
 *
 * @throws `InvalidFooError` if the provided Foo is not 'foo'.
 */
export async function index<ABI extends Abi>(
  client: Client,
  block: Block,
  handlers: Array<EventHandler.Type<ABI>>,
): Promise<void> {
  const logs = await client.getLogs({ blockHash: block.hash })
  await Promise.all(
    handlers.map(async ({ abi, handler }) => {
      const eventLogs = parseEventLogs({ logs, abi })
      await handler(eventLogs)
    }),
  )
}

export declare namespace index {
  type ErrorType = Errors.GlobalErrorType
}
