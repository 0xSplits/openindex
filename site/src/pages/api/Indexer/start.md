# Indexer.start

Starts a new indexer with the provided [viem PublicClient](https://viem.sh/docs/clients/public#public-client) and [`Handler.Handler`](/api/Handler/types#handler) array. Watches new blocks and dispatches their logs to each handler.

## Imports

:::code-group
```ts [Named]
import { Indexer } from 'openindex'
```
```ts [Entrypoint]
import * as Indexer from 'openindex/Indexer'
```
:::

## Examples

```ts twoslash
import { Handler, Indexer } from 'openindex'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

const transfer = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
const handler = Handler.fromAbi([transfer], (events) => {
  // store events
})

Indexer.start(client, [handler], {
  onError: (error) => console.error(error),
})
```

## Definition

```ts
function start(
  client: Compute<PublicClient & {
    chain: Chain;
}>,
  handlers: Array<Handler.Handler>,
  options?: start.Options,
): void
```

**Source:** [src/core/Indexer.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Indexer.ts#L88)

## Parameters

### client

- **Type:** `Compute<PublicClient & {
    chain: Chain;
}>`

A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).

### handlers

- **Type:** `Array<Handler.Handler>`

Array of [`Handler.Handler`](/api/Handler/types#handler) to dispatch logs to.

### options

- **Type:** `start.Options`
- **Optional**

Indexing options.

#### options.onError

- **Type:** `(error: Error) => void`
- **Optional**

Called when an error occurs during indexing. If omitted, the error is thrown.

## Return Type

`void`