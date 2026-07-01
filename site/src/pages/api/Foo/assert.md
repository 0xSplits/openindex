# Foo.assert

Asserts that the given value is a valid [`Foo.Foo`](/api/Foo/types#foo)

## Imports

:::code-group
```ts [Named]
import { Foo } from 'pkgstart'
```
```ts [Entrypoint]
import * as Foo from 'pkgstart/Foo'
```
:::

## Examples

```ts twoslash
import { Foo } from 'pkgstart'

Foo.assert('foo')
```

```ts twoslash
import { Foo } from 'pkgstart'

Foo.assert('fool')
// @error: InvalidFooError: Foo "fool" is invalid.
```

Set `fighters` to `true` to allow 'fighters' as a valid value.
```ts twoslash
import { Foo } from 'pkgstart'

Foo.assert('bar', { fighters: true })
```

## Definition

```ts
function assert(
  value: string,
  options?: assert.Options,
): asserts value is Foo
```

**Source:** [src/core/Foo.ts](https://github.com/wevm/ox/blob/main/src/core/Foo.ts#L164)

## Parameters

### value

- **Type:** `string`

The Foo value to assert

### options

- **Type:** `assert.Options`
- **Optional**

Assertion options

#### options.fighters

- **Type:** `boolean`
- **Optional**

Allows 'fighters' to pass as a valid Foo