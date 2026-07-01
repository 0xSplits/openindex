import type { Abi } from 'viem'
import { Block, type Client, type EventHandler } from '../index.js'
import * as Errors from './Errors.js'

/**
 * Starts a new indexer with the provided [viem PublicClient](https://viem.sh/docs/clients/public#public-client) and {@link openindex#EventHandler.Type} array. Watches new blocks and dispatches their logs to each handler.
 *
 * @example
 * ```ts twoslash
 * import { EventHandler, Indexer } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 *
 * const transfer = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
 * const handler = EventHandler.from([transfer], (events) => {
 *   // store events
 * })
 *
 * Indexer.start(client, [handler], {
 *   onError: (error) => console.error(error),
 * })
 * ```
 *
 * @param client - A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).
 * @param handlers - Array of {@link openindex#EventHandler.Type} to dispatch logs to.
 * @param options - Indexing options.
 */
export function start<ABI extends Abi>(
  client: Client.Type,
  handlers: Array<EventHandler.Type<ABI>>,
  options: start.Options = {},
): void {
  const { onError } = options

  client.watchBlocks({
    emitMissed: true, // This ensures blocks that appear between polling intervals are picked up
    onBlock: async (block) => Block.index(client, block, handlers),
    onError: (error) => {
      const indexingError = new IndexingError({ client, cause: error })
      if (onError) onError(indexingError)
      else throw indexingError
    },
  })
}

export declare namespace start {
  type Options = {
    /** Called when an error occurs during indexing. If omitted, the error is thrown. */
    onError?: undefined | ((error: Error) => void)
  }

  type ErrorType = IndexingError | Errors.GlobalErrorType
}

/**
 * Thrown when an unexpected error occurs during indexing.
 *
 * @example
 * ```ts twoslash
 * import { Indexer } from 'openindex'
 *
 * try {
 *   // ...
 * } catch (error) {
 *   if (error instanceof Indexer.IndexingError) {
 *     // handle indexing error
 *   }
 * }
 * ```
 */
export class IndexingError<
  cause extends Error = Error,
> extends Errors.BaseError<cause> {
  override readonly name = 'Indexer.IndexingError'

  constructor({ client, cause }: { client: Client.Type; cause: cause }) {
    super(`Error while indexing ${client.chain.id}.`, {
      cause,
    })
  }
}
