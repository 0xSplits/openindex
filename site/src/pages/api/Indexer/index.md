# Indexer

High-level indexer that watches blocks and dispatches logs to handlers.

## Functions

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Indexer.start`](/api/Indexer/start) | Starts a new indexer with the provided [viem PublicClient](https://viem.sh/docs/clients/public#public-client) and [`EventHandler.Type`](/api/EventHandler/types#type) array. Watches new blocks and dispatches their logs to each handler. |

## Errors

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Indexer.IndexingError`](/api/Indexer/errors#indexerindexingerror) | Thrown when an unexpected error occurs during indexing. |