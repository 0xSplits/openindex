import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'
import { Handler, Indexer } from '../src/index.js'

const client = createPublicClient({
  chain: mainnet,
  transport: http('https://eth.llamarpc.com'),
})

const event = parseAbiItem(
  'event Transfer(address indexed from, address indexed to, uint256 value)',
)
const handler = Handler.fromAbi([event], (logs) => {
  logs.forEach((log) => {
    console.log(`Txhash: ${log.transactionHash}\nFrom: ${log.args.from}\n---`)
  })
})

const nativeHandler = Handler.native((transfers) => {
  transfers.forEach((transfer) => {
    console.log(
      `Native Txhash: ${transfer.transactionHash}\nFrom: ${transfer.from}\nTo: ${transfer.to}\nValue: ${transfer.value}\n---`,
    )
  })
})

Indexer.start(client, [handler, nativeHandler])

await new Promise<never>(() => {})
