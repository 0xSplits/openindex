import {
  type Chain,
  hexToBigInt,
  type PublicClient,
  parseEventLogs,
  type Address as viem__Address,
  type Block as viem__Block,
  type Hex as viem__Hex,
} from 'viem'
import { type Handler, Traces } from '../index.js'
import type * as Errors from './Errors.js'
import type { Compute } from './internal/types.js'

/**
 * The base Block type, extended from [viem Block](https://viem.sh/docs/api/classes/Block).
 */
export type Block = viem__Block & {
  hash: viem__Hex
}

/**
 * Indexes a single block by fetching its logs and dispatching them to the matching {@link openindex#Handler.Handler} handlers.
 *
 * @example
 * ```ts twoslash
 * import { Block, Handler } from 'openindex'
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 *
 * const client = createPublicClient({ chain: mainnet, transport: http() })
 * const block = await client.getBlock()
 *
 * const transfer = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
 * const handler = Handler.fromAbi([transfer], (events) => {
 *   // store events
 * })
 *
 * await Block.index(client, block, [handler])
 * ```
 *
 * @param client - A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).
 * @param block - The block to index.
 * @param handlers - Array of {@link openindex#Handler.Handler} to dispatch logs to.
 */
export async function index(
  client: Compute<PublicClient & { chain: Chain }>,
  block: Block,
  handlers: Array<Handler.Handler>,
): Promise<void> {
  const handleLogsPromise = (async () => {
    const eventHandlers = handlers.filter((handler) => handler.type === 'abi')
    if (eventHandlers.length === 0) return
    const logs = await client.getLogs({ blockHash: block.hash })
    await Promise.all(
      eventHandlers.map(async ({ abi, handler }) => {
        const eventLogs = parseEventLogs({ logs, abi })
        await handler(eventLogs)
      }),
    )
  })()

  const handleNativePromise = (async () => {
    const nativeHandlers = handlers.filter(
      (handler) => handler.type === 'native',
    )
    if (nativeHandlers.length === 0) return
    const traces = await Traces.get(client, block)
    const validTraces = traces.filter(
      (trace): trace is typeof trace & { frame: { to: viem__Address } } =>
        hexToBigInt(trace.frame.value ?? '0x0') > 0n &&
        trace.frame.type !== 'DELEGATECALL' &&
        trace.frame.type !== 'CALLCODE' &&
        !trace.frame.error &&
        !!trace.frame.to,
    )

    const transfers = validTraces.map(({ transactionHash, frame }) => ({
      from: frame.from,
      to: frame.to,
      value: hexToBigInt(frame.value ?? '0x0'),
      transactionHash: transactionHash,
    }))

    await Promise.all(
      nativeHandlers.map(async ({ handler }) => await handler(transfers)),
    )
  })()

  await Promise.all([handleLogsPromise, handleNativePromise])
}

export declare namespace index {
  type ErrorType = Errors.GlobalErrorType
}
