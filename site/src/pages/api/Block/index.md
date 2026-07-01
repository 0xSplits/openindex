# Block

Block-level indexing primitives. Use [`Block.index`](/api/Block/index) directly when you want to process a known block on demand — for backfilling a specific block, custom schedulers, or testing — rather than subscribing to live blocks via [`Indexer.start`](/api/Indexer/start).

## Examples

### Indexing a Single Block

Fetch a block and dispatch its logs to a handler:

```ts twoslash
import { Block, Handler } from 'openindex'
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })
const block = await client.getBlock()

const transfer = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)
const handler = Handler.fromAbi([transfer], (logs) => {
  for (const log of logs) console.log(log.args)
})

await Block.index(client, block, [handler])
```

## Functions

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Block.index`](/api/Block/index) | Indexes a single block by fetching its logs and dispatching them to the matching [`Handler.Handler`](/api/Handler/types#handler) handlers. |

## Types

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Block.Block`](/api/Block/types#blockblock) | The base Block type, extended from [viem Block](https://viem.sh/docs/api/classes/Block). |