# Handler.fromAbi

Creates a new ABI event handler from an [abitype Abi](https://abitype.dev/api/types#abi).

## Imports

:::code-group
```ts [Named]
import { Handler } from 'openindex'
```
```ts [Entrypoint]
import * as Handler from 'openindex/Handler'
```
:::

## Examples

### Single Event
```ts twoslash
import { Handler } from 'openindex'
import { parseAbiItem } from 'viem'

const event = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')

Handler.fromAbi([event], (events) => {
  // store the events
})
```

### From an Existing Contract ABI
```ts twoslash
import { Handler } from 'openindex'
import { erc20Abi, getAbiItem } from 'viem'

const event = getAbiItem({ abi: erc20Abi, name: 'Transfer' })

Handler.fromAbi([event], (events) => {
  // store the events
})
```

### Full Contract ABI
```ts twoslash
import { Handler } from 'openindex'
import { erc20Abi } from 'viem'

Handler.fromAbi(erc20Abi, (events) => {
  // store the events
})
```

## Definition

```ts
function fromAbi<ABI>(
  abi: ABI,
  handler: (event: Array<Log<bigint, number, boolean, undefined, false, ABI>>) => void | Promise<void>,
): fromAbi.ReturnType<ABI>
```

**Source:** [src/core/Handler.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Handler.ts#L155)

## Parameters

### abi

- **Type:** `ABI`

An [abitype Abi](https://abitype.dev/api/types#abi) or array of [abitype AbiEvent](https://abitype.dev/api/types#abievent).

### handler

- **Type:** `(event: Array<Log<bigint, number, boolean, undefined, false, ABI>>) => void | Promise<void>`

Log handler typed to the provided ABI.

## Return Type

A [`Handler.AbiEventHandler`](/api/Handler/types#abieventhandler) bound to the given ABI.

`fromAbi.ReturnType<ABI>`