import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'
import { EventHandler, Indexer } from '../src/index.js'

const client = createPublicClient({
  chain: mainnet,
  transport: http(
    'https://lb.drpc.live/ethereum/AtXRonZmRUXdocc1cfqduME31-GPXq4R8ZlD7sA_udJz',
  ),
})

const event = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)
const handler = EventHandler.from([event], (logs) => {
  logs.forEach((log) => {
    console.log(`Txhash: ${log.transactionHash}\nFrom: ${log.args.from}`)
  })
})

Indexer.start(client, [handler])

await new Promise<never>(() => {})
