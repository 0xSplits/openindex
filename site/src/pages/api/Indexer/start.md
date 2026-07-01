---
showAskAi: false
---

# Indexer.start

Starts a new indexer with the provided [viem PublicClient](https://viem.sh/docs/clients/public#public-client) and [`EventHandler.Type`](/api/EventHandler/types#type) array. Watches new blocks and dispatches their logs to each handler.

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
import { EventHandler, Indexer } from 'openindex'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

const transfer = parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)')
const handler = EventHandler.from([transfer], (events) => {
  // store events
})

Indexer.start(client, [handler], {
  onError: (error) => console.error(error),
})
```

## Definition

```ts
function start<ABI>(
  client: Client.Type,
  handlers: Array<EventHandler.Type<ABI>>,
  options?: start.Options,
): void
```

**Source:** [src/core/Indexer.ts](https://github.com/gregfromstl/openindex/blob/main/src/core/Indexer.ts#L84)

## Parameters

### client

- **Type:** `Client.Type`

A [viem PublicClient](https://viem.sh/docs/clients/public#public-client).

#### client.chain

- **Type:** `Chain`

### handlers

- **Type:** `Array<EventHandler.Type<ABI>>`

Array of [`EventHandler.Type`](/api/EventHandler/types#type) to dispatch logs to.

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