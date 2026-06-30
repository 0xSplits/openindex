import type { Chain, PublicClient } from 'viem'

/**
 * A [viem PublicClient](https://viem.sh/docs/clients/public#public-client) with required chain.
 */
export type Client = PublicClient & { chain: Chain }
