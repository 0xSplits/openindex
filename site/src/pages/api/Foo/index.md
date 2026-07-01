# Foo

Utility functions for working with the string 'foo'.

## Examples

Below are some examples demonstrating common usages of the `Foo` module:

- [Validating Foo-ness](#validating-foo-ness)

- [Lowercase Foo](#lowercase-foo)

### Validating Foo-ness

The [`Foo.assert`](/api/Foo/assert) function will throw an error if the foo is invalid:

```ts twoslash
import { Foo } from 'pkgstart'

Foo.assert('oof')
// @error: InvalidFooError: Foo "oof" is invalid.
```

### Lowercase Foo

A [`Foo.Foo`](/api/Foo/types#foo) can be instantiated from a string using [`Foo.from`](/api/Foo/from):

```ts twoslash
import { Foo } from 'pkgstart'

const foo = Foo.from('FOO')
// @log: 'foo'
```

## Functions

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Foo.assert`](/api/Foo/assert) | Asserts that the given value is a valid [`Foo.Foo`](/api/Foo/types#foo) |
| [`Foo.from`](/api/Foo/from) | Creates a typed [`Foo.Foo`](/api/Foo/types#foo) from the provided foo-like string. |

## Errors

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Foo.InvalidCaseError`](/api/Foo/errors#fooinvalidcaseerror) | Thrown when a provided foo is not fromd. |
| [`Foo.InvalidFooError`](/api/Foo/errors#fooinvalidfooerror) | Thrown when a foo is invalid. |
| [`Foo.InvalidInputError`](/api/Foo/errors#fooinvalidinputerror) | Thrown when a provided string is not foo. |

## Types

| Name                | Description                         |
| ------------------- | ----------------------------------- |
| [`Foo.Foo`](/api/Foo/types#foofoo) | The root Foo type. |