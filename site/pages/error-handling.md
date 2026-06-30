# Error Handling 

Every function namespace in your package can export an accompanying error type (`ErrorType`) and parser (`parseError`) that you can use to strongly type your `catch` statements, or inject into a custom type-safe error handling library (e.g. [`neverthrow`](https://github.com/supermacro/neverthrow), [`Effect`](https://effect.website/), etc.).

## Usage with Vanilla TypeScript

Unfortunately, [TypeScript doesn't have an abstraction for typed exceptions](https://github.com/microsoft/TypeScript/issues/13219), so the most pragmatic & vanilla approach would be to explicitly cast error types in the `catch` statement with the function's `.ErrorType` property.

```ts twoslash
import { Foo } from 'openindex'

try {
  Foo.from('oof')
} catch (err) {
  const error = err as Foo.from.ErrorType
  error.name
  //    ^? 










  if (error.name === 'Foo.InvalidFooError') {
    error.cause.name
    //          ^? 
  }
}






```

## Usage with `neverthrow`

You can utilize your package's `.ErrorType` property into custom type-safe error handling libraries like [`neverthrow`](https://github.com/supermacro/neverthrow).

```ts twoslash
// @noErrors
import { Foo } from 'openindex'

const fromString = fromThrowable( // [!code hl]
  Foo.from, // [!code hl]
  e => e as Foo.from.ErrorType // [!code hl]
)

const result = fromString('oof') // [!code hl]

if (result.isErr()) // [!code hl]
	result.error.name // [!code hl]
  //           ^?







```

