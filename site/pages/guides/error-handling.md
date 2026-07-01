# Error Handling

## Overview

OpenIndex surfaces errors two ways depending on where they originate:

- **Indexing errors** (RPC failures, dropped subscriptions, malformed responses) are reported through the `onError` callback on [`Indexer.start`](/api/Indexer/start). They're wrapped in an [`Indexer.IndexingError`](/api/Indexer/errors) so you know which chain and client they came from.
- **Handler errors** — anything your event handler throws — bubble up through that same `onError` path. Catch them inside the handler if you want per-handler recovery; let them propagate if you want central handling.

## Handling Indexer Errors

Pass an `onError` callback to `Indexer.start`. If you omit it, the error is thrown — which is rarely what you want for a long-running indexer.

```ts twoslash
// @noErrors
import { Indexer } from 'openindex'

Indexer.start(client, [handler], {
  onError: (error) => {
    if (error instanceof Indexer.IndexingError) {
      console.error(
        `Indexing failed on chain ${error.cause}: ${error.shortMessage}`,
      )
    } else {
      console.error('Unknown error:', error)
    }
  },
})
```

:::tip
Log the error and decide whether to restart the indexer based on the failure mode. Transient RPC errors usually resolve on their own; persistent ones warrant a restart with backoff.
:::

## Typed Catch Blocks with `.ErrorType`

Every OpenIndex function exposes a `.ErrorType` property — a union of every error the function can throw. Use it to type your `catch` block without sprinkling `any` casts.

```ts twoslash
// @noErrors
import { Indexer } from 'openindex'

try {
  Indexer.start(client, [handler])
} catch (err) {
  const error = err as Indexer.start.ErrorType
  error.name
  //    ^?

  if (error.name === 'Indexer.IndexingError') {
    error.cause
    //    ^?
  }
}
```

:::note
[TypeScript doesn't have an abstraction for typed exceptions](https://github.com/microsoft/TypeScript/issues/13219), so the `as` cast is the pragmatic workaround. The `.ErrorType` union is exact — narrowing on `error.name` will refine to the specific error class.
:::

## Usage with `neverthrow`

You can feed `.ErrorType` into typed result-handling libraries like [`neverthrow`](https://github.com/supermacro/neverthrow):

```ts twoslash
// @noErrors
import { Indexer } from 'openindex'
import { fromThrowable } from 'neverthrow'

const safeStart = fromThrowable(
  Indexer.start,
  (e) => e as Indexer.start.ErrorType,
)

const result = safeStart(client, [handler])

if (result.isErr())
  result.error.name
  //           ^?
```

## Related Modules

| Module                              | Description                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------- |
| [Indexer](/api/Indexer)             | High-level indexer; defines `IndexingError` and the `onError` callback.     |
| [Errors](/api/Errors)               | Base error class and global error type inherited by all OpenIndex errors.   |
