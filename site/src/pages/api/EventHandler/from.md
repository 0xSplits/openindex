# EventHandler.from

Creates a new EventHandler from an [abitype Abi](https://abitype.dev/api/types#abi).

## Imports

:::code-group
```ts [Named]
import { EventHandler } from 'openindex'
```
```ts [Entrypoint]
import * as EventHandler from 'openindex/EventHandler'
```
:::

## Examples

### Single Event
```ts twoslash
import { EventHandler } from 'openindex'
import { parseAbiItem } from 'viem'

const event = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')

EventHandler.from([event], (events) => {
  // store the events
})
```

### From an Existing Contract ABI
```ts twoslash
import { EventHandler } from 'openindex'
import { erc20Abi, getAbiItem } from 'viem'

const event = getAbiItem({ abi: erc20Abi, name: 'Transfer' })

EventHandler.from([event], (events) => {
  // store the events
})
```

### Full Contract ABI
```ts twoslash
import { EventHandler } from 'openindex'
import { erc20Abi } from 'viem'

EventHandler.from(erc20Abi, (events) => {
  // store the events
})
```

## Definition

```ts
function from<ABI>(
  abi: ABI,
  handler: (event: Array<Log<bigint, number, boolean, undefined, false, ABI>>) => void | Promise<void>,
): from.ReturnType<ABI>
```

**Source:** [src/core/EventHandler.ts](https://github.com/gregfromstl/openindex/blob/main/src/core/EventHandler.ts#L78)

## Parameters

### abi

- **Type:** `ABI`

An [abitype Abi](https://abitype.dev/api/types#abi) or array of [abitype AbiEvent](https://abitype.dev/api/types#abievent).

### handler

- **Type:** `(event: Array<Log<bigint, number, boolean, undefined, false, ABI>>) => void | Promise<void>`

Log handler typed to the provided ABI.

## Return Type

An [`EventHandler.Type`](/api/EventHandler/types#type) bound to the given ABI.

`from.ReturnType<ABI>`