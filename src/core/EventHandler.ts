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
 * Create an EventHandler for a single event with viem's [parseAbiItem](https://viem.sh/docs/abi/parseAbiItem#parseabiitem).
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 * import { parseAbiItem } from 'viem'
 *
 * const event = parseAbiItem("event Transfer(address indexed from, address indexed to, uint256 value)")
 * EventHandler.from([event], (event) => {
 *  // store the event in your database
 * })
 * ```
 *
 * @example
 * Alternatively, get the event ABI from a viem contract.
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 * import { getAbiItem } from 'viem';
 *
 * const event = getAbiItem({ abi: erc20Abi, name: "Transfer" })
 * EventHandler.from([event], (event) => {
 *  // store the event in your database
 * })
 * ```
 *
 * @example
 * You can also include an entire ABI to handle all possible events on the contract.
 * ```ts twoslash
 * import { EventHandler } from 'openindex'
 *
 * EventHandler.from(erc20Abi, (event) => {
 *  // store the event in your database
 * })
 * ```
 *
 * @param abi - An [abitype Abi](https://abitype.dev/api/types#abi) or array of [abitype AbiEvent](https://abitype.dev/api/types#abievent).
 * @param handler - Your log handler, typed to the provided ABI
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
