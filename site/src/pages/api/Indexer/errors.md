---
showOutline: 1
showAskAi: false
---

# Indexer Errors

## `Indexer.IndexingError`

Thrown when an unexpected error occurs during indexing.

### Examples

```ts twoslash
import { Indexer } from 'openindex'

try {
  // ...
} catch (error) {
  if (error instanceof Indexer.IndexingError) {
    // handle indexing error
  }
}
```

**Source:** [src/core/Indexer.ts](https://github.com/0xSplits/openindex/blob/main/src/core/Indexer.ts#L84)