---
showOutline: 1
---

# Foo Errors

## `Foo.InvalidCaseError`

Thrown when a provided foo is not fromd.

**Source:** [src/core/Foo.ts](https://github.com/wevm/ox/blob/main/src/core/Foo.ts#L164)

## `Foo.InvalidFooError`

Thrown when a foo is invalid.

### Examples

```ts twoslash
import { Foo } from 'pkgstart'

Foo.assert('bar')
// @error: Foo.InvalidFooError: Foo 'bar' is invalid.
```

**Source:** [src/core/Foo.ts](https://github.com/wevm/ox/blob/main/src/core/Foo.ts#L164)

## `Foo.InvalidInputError`

Thrown when a provided string is not foo.

**Source:** [src/core/Foo.ts](https://github.com/wevm/ox/blob/main/src/core/Foo.ts#L164)