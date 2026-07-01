# Handler

Constructors and types for event handlers. Build an ABI-typed handler with [`Handler.fromAbi`](/api/Handler/fromAbi) — pairing an [abitype Abi](https://abitype.dev/api/types#abi) with a callback that receives strongly-typed logs matching the ABI — or a native transfer handler with [`Handler.native`](/api/Handler/native) to receive every value transfer (including internal transfers) in a block.

## Examples

Below are some examples demonstrating common usages of the `Handler` module:

- [Single Event](#single-event)

- [From a Contract ABI](#from-a-contract-abi)

### Single Event

Build a handler for one event with viem's [parseAbiItem](https://viem.sh/docs/abi/parseAbiItem):

```ts twoslash
import { Handler } from 'openindex'
import { parseAbiItem } from 'viem'

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)

const handler = Handler.fromAbi([transfer], (logs) => {
  for (const log of logs) console.log(log.args.value)
})
```

### From a Contract ABI

Pull an event off an existing contract ABI with viem's [getAbiItem](https://viem.sh/docs/abi/getAbiItem):

```ts twoslash
import { Handler } from 'openindex'
import { erc20Abi, getAbiItem } from 'viem'

const transfer = getAbiItem({ abi: erc20Abi, name: 'Transfer' })

const handler = Handler.fromAbi([transfer], (logs) => {
  for (const log of logs) console.log(log.args.value)
})
```

## Functions

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Handler.fromAbi`](/api/Handler/fromAbi) | Creates a new ABI event handler from an [abitype Abi](https://abitype.dev/api/types#abi). |
| [`Handler.native`](/api/Handler/native) | Creates a new native transfer handler. The handler receives every native value (ETH) transfer in each indexed block — including internal transfers made by contracts (`CALL` value sends, `CREATE`/`CREATE2` endowments, and `SELFDESTRUCT` payouts). Value-less calls and `DELEGATECALL`/`CALLCODE` frames, which never move value between accounts, are excluded. |

## Types

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Handler.AbiEventHandler`](/api/Handler/types#handlerabieventhandler) | Log event handler for a given contract ABI. Create it with [`Handler.fromAbi`](/api/Handler/fromAbi). |
| [`Handler.Handler`](/api/Handler/types#handlerhandler) | Generalized handler type. |
| [`Handler.NativeHandler`](/api/Handler/types#handlernativehandler) | Handler that receives the native transfers in each indexed block. Create it with [`Handler.native`](/api/Handler/native). |
| [`Handler.NativeTransfer`](/api/Handler/types#handlernativetransfer) | A single native value (ETH) transfer extracted from a block's execution traces. Covers both top-level transfers and internal transfers made by contracts. Delivered to handlers created with [`Handler.native`](/api/Handler/native). |