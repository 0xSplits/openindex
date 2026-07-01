# Foo.from

Creates a typed [`Foo.Foo`](/api/Foo/types#foo) from the provided foo-like string.

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

Foo.from('FOO')
// @log: 'foo'
```

```ts twoslash
import { Foo } from 'pkgstart'

Foo.from('oof')
// @error: InvalidFooError: Foo 'oof' is invalid.
```

## Definition

```ts
function from(
  foo: string,
  options?: from.Options,
): from.ReturnType
```

**Source:** [src/core/Foo.ts](https://github.com/wevm/ox/blob/main/src/core/Foo.ts#L164)

## Parameters

### foo

- **Type:** `string`

### options

- **Type:** `from.Options`
- **Optional**

Conversion options.



## Return Type

The typed Address.

`from.ReturnType`