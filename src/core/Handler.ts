import type { Abi, Address, Log, Hex as viem__Hex } from 'viem'
import type * as Errors from './Errors.js'
import type { Compute } from './internal/types.js'

/**
 * @internal
 */
type BaseHandler<
  Type extends 'abi' | 'native' = 'abi' | 'native',
  T = Type extends 'abi'
    ? Array<Log<bigint, number, boolean, undefined, false, Abi>>
    : Array<NativeTransfer>,
> = {
  type: Type
  handler(t: T): void | Promise<void>
}

/**
 * Generalized handler type.
 */
export type Handler = AbiEventHandler<Abi> | NativeHandler

/**
 * Log event handler for a given contract ABI. Create it with {@link openindex#Handler.(fromAbi:function)}.
 */
export type AbiEventHandler<ABI extends Abi> = Compute<
  {
    abi: ABI
  } & BaseHandler<
    'abi',
    Array<Log<bigint, number, boolean, undefined, false, ABI>>
  >
>

/**
 * Creates a new ABI event handler from an [abitype Abi](https://abitype.dev/api/types#abi).
 *
 * @example
 * ### Single Event
 *
 * ```ts twoslash
 * import { Handler } from 'openindex'
 * import { parseAbiItem } from 'viem'
 *
 * const event = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
 *
 * Handler.fromAbi([event], (events) => {
 *   // store the events
 * })
 * ```
 *
 * @example
 * ### From an Existing Contract ABI
 *
 * ```ts twoslash
 * import { Handler } from 'openindex'
 * import { erc20Abi, getAbiItem } from 'viem'
 *
 * const event = getAbiItem({ abi: erc20Abi, name: 'Transfer' })
 *
 * Handler.fromAbi([event], (events) => {
 *   // store the events
 * })
 * ```
 *
 * @example
 * ### Full Contract ABI
 *
 * ```ts twoslash
 * import { Handler } from 'openindex'
 * import { erc20Abi } from 'viem'
 *
 * Handler.fromAbi(erc20Abi, (events) => {
 *   // store the events
 * })
 * ```
 *
 * @param abi - An [abitype Abi](https://abitype.dev/api/types#abi) or array of [abitype AbiEvent](https://abitype.dev/api/types#abievent).
 * @param handler - Log handler typed to the provided ABI.
 * @returns A {@link openindex#Handler.AbiEventHandler} bound to the given ABI.
 */
export function fromAbi<ABI extends Abi>(
  abi: ABI,
  handler: (
    event: Array<Log<bigint, number, boolean, undefined, false, ABI>>,
  ) => void | Promise<void>,
): fromAbi.ReturnType<ABI> {
  return {
    type: 'abi',
    abi,
    handler,
  }
}

export declare namespace fromAbi {
  type ReturnType<ABI extends Abi> = AbiEventHandler<ABI>

  type ErrorType = Errors.GlobalErrorType
}

/**
 * A single native value (ETH) transfer extracted from a block's execution traces. Covers both top-level transfers and internal transfers made by contracts. Delivered to handlers created with {@link openindex#Handler.(native:function)}.
 */
export type NativeTransfer = {
  /** Address the value was sent from. */
  from: Address
  /** Address the value was sent to. */
  to: Address
  /** Amount transferred, in wei. */
  value: bigint
  /** Hash of the transaction the transfer occurred in. */
  transactionHash: viem__Hex
}

/**
 * Handler that receives the native transfers in each indexed block. Create it with {@link openindex#Handler.(native:function)}.
 */
export type NativeHandler = BaseHandler<'native'>

/**
 * Creates a new native transfer handler. The handler receives every native value (ETH) transfer in each indexed block — including internal transfers made by contracts (`CALL` value sends, `CREATE`/`CREATE2` endowments, and `SELFDESTRUCT` payouts). Value-less calls and `DELEGATECALL`/`CALLCODE` frames, which never move value between accounts, are excluded.
 *
 * :::warning
 * Native indexing relies on block traces, which require an RPC endpoint that exposes the `debug` namespace (`debug_traceBlockByHash`). Many public providers disable it — use a node or provider with tracing enabled. See {@link openindex#Traces.(get:function)}.
 * :::
 *
 * @example
 * ```ts twoslash
 * import { Handler } from 'openindex'
 *
 * Handler.native((transfers) => {
 *   for (const transfer of transfers) {
 *     console.log(`${transfer.from} -> ${transfer.to}: ${transfer.value}`)
 *   }
 * })
 * ```
 *
 * @param handler - Handler function receiving the block's {@link openindex#Handler.NativeTransfer} list.
 * @returns A {@link openindex#Handler.NativeHandler}.
 */
export function native(
  handler: (transfers: Array<NativeTransfer>) => void | Promise<void>,
): native.ReturnType {
  return {
    type: 'native',
    handler,
  }
}

export declare namespace native {
  type ReturnType = NativeHandler

  type ErrorType = Errors.GlobalErrorType
}
