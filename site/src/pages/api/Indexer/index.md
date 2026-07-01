# Indexer

High-level indexer that watches blocks via a viem `PublicClient` and dispatches matching logs to your event handlers in real time.

## Examples

Below are some examples demonstrating common usages of the `Indexer` module:

- [Basic Usage](#basic-usage)

- [Handling Errors](#handling-errors)

### Basic Usage

Start an indexer with a viem client and one or more [`Handler.Handler`](/api/Handler/types#handler) handlers. The indexer subscribes to new blocks and dispatches each block's matching logs:

```ts twoslash
import { Handler, Indexer } from 'openindex'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)
const handler = Handler.fromAbi([transfer], (logs) => {
  for (const log of logs) console.log(log.args)
})

Indexer.start(client, [handler])
```

### Handling Errors

Pass an `onError` callback to capture indexing failures without crashing the process. Errors are wrapped in [`Indexer.IndexingError`](/api/Indexer/errors#indexingerror):

```ts twoslash
// @noErrors
import { Indexer } from 'openindex'

Indexer.start(client, [handler], {
  onError: (error) => {
    if (error instanceof Indexer.IndexingError) {
      console.error(`Indexing failed: ${error.shortMessage}`)
    }
  },
})
```

## Functions

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Indexer.start`](/api/Indexer/start) | Starts a new indexer with the provided [viem PublicClient](https://viem.sh/docs/clients/public#public-client) and [`Handler.Handler`](/api/Handler/types#handler) array. Watches new blocks and dispatches their logs to each handler. |

## Errors

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Indexer.IndexingError`](/api/Indexer/errors#indexerindexingerror) | Thrown when an unexpected error occurs during indexing. |