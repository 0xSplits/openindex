import type { Abi, Log } from 'viem'
import type * as Errors from './Errors.js'

/**
 * Log event handler for a given contract ABI.
 */
export type Type<ABI extends Abi> = {
  abi: ABI
  handler: (
    event: Array<Log<bigint, number, boolean, undefined, false, ABI>>,
  ) => void | Promise<void>
}

/**
 * Creates a new EventHandler from an [abitype Abi](https://abitype.dev/api/types#abi).
 *
 * @example
 * ### Single Event
 *
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 * import { parseAbiItem } from 'viem'
 *
 * const event = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
 *
 * EventHandler.from([event], (events) => {
 *   // store the events
 * })
 * ```
 *
 * @example
 * ### From an Existing Contract ABI
 *
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 * import { erc20Abi, getAbiItem } from 'viem'
 *
 * const event = getAbiItem({ abi: erc20Abi, name: 'Transfer' })
 *
 * EventHandler.from([event], (events) => {
 *   // store the events
 * })
 * ```
 *
 * @example
 * ### Full Contract ABI
 *
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 * import { erc20Abi } from 'viem'
 *
 * EventHandler.from(erc20Abi, (events) => {
 *   // store the events
 * })
 * ```
 *
 * @param abi - An [abitype Abi](https://abitype.dev/api/types#abi) or array of [abitype AbiEvent](https://abitype.dev/api/types#abievent).
 * @param handler - Log handler typed to the provided ABI.
 * @returns An {@link openindex#EventHandler.Type} bound to the given ABI.
 */
export function from<ABI extends Abi>(
  abi: ABI,
  handler: (
    event: Array<Log<bigint, number, boolean, undefined, false, ABI>>,
  ) => void | Promise<void>,
): from.ReturnType<ABI> {
  return {
    abi,
    handler,
  }
}

export declare namespace from {
  type ReturnType<ABI extends Abi> = Type<ABI>

  type ErrorType = Errors.GlobalErrorType
}
