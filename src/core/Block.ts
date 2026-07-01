import {
  type Abi,
  parseEventLogs,
  type Block as viem__Block,
  type Hex as viem__Hex,
} from 'viem'
import type { Client, EventHandler } from '../index.js'
import type * as Errors from './Errors.js'

/**
 * The base Block type, extended from [viem Block](https://viem.sh/docs/api/classes/Block).
 */
export type Block = viem__Block & {
  hash: viem__Hex
}

/**
 * Indexes a single block by fetching its logs and dispatching them to the matching {@link openindex#EventHandler.Type} handlers.
 *
 * @example
 * ```ts twoslash
 * import { Block, EventHandler } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 * const block = await client.getBlock()
 *
 * const transfer = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
 * const handler = EventHandler.from([transfer], (events) => {
 *   // store events
 * })
 *
 * await Block.index(client, block, [handler])
 * ```
 *
 * @param client - A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).
 * @param block - The block to index.
 * @param handlers - Array of {@link openindex#EventHandler.Type} to dispatch logs to.
 */
export async function index<ABI extends Abi>(
  client: Client.Type,
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
