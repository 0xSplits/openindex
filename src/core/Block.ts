import { type Abi, parseEventLogs } from 'viem'
import type { EventHandler } from '../index.js'
import type { Client } from './Client.js'
import * as Errors from './Errors.js'

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
export function start<ABI extends Abi>(
  client: Client,
  handlers: Array<EventHandler.Type<ABI>>,
  options: start.Options = {},
): void {
  const { onError } = options

  client.watchBlocks({
    emitMissed: true, // This ensures blocks that appear between polling intervals are picked up
    onBlock: async (block) => {
      const logs = await client.getLogs({ blockHash: block.hash })
      await Promise.all(
        handlers.map(async ({ abi, handler }) => {
          const eventLogs = parseEventLogs({ logs, abi })
          await handler(eventLogs)
        }),
      )
    },
    onError: (error) => {
      const indexingError = new IndexingError({ client, cause: error })
      if (onError) onError(indexingError)
      else throw indexingError
    },
  })
}

export declare namespace start {
  type Options = {
    onError?: undefined | ((error: Error) => void)
  }

  type ErrorType = Errors.GlobalErrorType
}

/**
 * Thrown when an unexpected error occurs during indexing.
 */
export class IndexingError<
  cause extends Error,
> extends Errors.BaseError<cause> {
  override readonly name = 'Indexer.IndexingError'

  constructor({ client, cause }: { client: Client; cause: cause }) {
    super(`Error while indexing ${client.chain.id}.`, {
      cause,
    })
  }
}
