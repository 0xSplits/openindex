import * as Errors from './Errors.js'
import { isLowercase } from './internal/lowercase.js'

/*
 * The branded address type ensures the string has been properly parsed and verified.
 * See more about branded types here: https://www.learningtypescript.com/articles/branded-types
 */
declare const FooBrand: unique symbol
/**
 * The root Foo type.
 */
export type Foo = 'foo' & {
  readonly [FooBrand]: true
}

/**
 * Asserts that the given value is a valid {@link openindex#Foo.Foo}
 *
 * @example
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.assert('foo')
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.assert('fool')
 * // @error: InvalidFooError: Foo "fool" is invalid.
 * ```
 *
 * @example
 * Set `fighters` to `true` to allow 'fighters' as a valid value.
 *
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.assert('bar', { fighters: true })
 * ```
 *
 * @param value - The Foo value to assert
 * @param options - Assertion options
 *
 * @throws `InvalidFooError` if the provided Foo is not 'foo'.
 */
export function assert(
  value: string,
  options: assert.Options = {},
): asserts value is Foo {
  const { fighters = false } = options

  if (!isLowercase(value)) {
    throw new InvalidFooError({
      value,
      cause: new InvalidCaseError(),
    })
  }

  if (value !== 'foo') {
    if (value === 'fighters' && fighters) return
    throw new InvalidFooError({
      value,
      cause: new InvalidInputError(),
    })
  }
}

export declare namespace assert {
  type Options = {
    /**
     * Allows 'fighters' to pass as a valid Foo
     *
     * @default false
     */
    fighters?: boolean | undefined
  }

  type ReturnType = Foo

  type ErrorType = InvalidFooError | Errors.GlobalErrorType
}

/**
 * Creates a typed {@link openindex#Foo.Foo} from the provided foo-like string.
 *
 * @example
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.from('FOO')
 * // @log: 'foo'
 * ```
 *
 * @example
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.from('oof')
 * // @error: InvalidFooError: Foo 'oof' is invalid.
 * ```
 *
 * @param address - An address string to convert to a typed Address.
 * @param options - Conversion options.
 * @returns The typed Address.
 *
 * @throws `InvalidFooError` if the provided Foo is not valid.
 */
export function from(foo: string, options: from.Options = {}): from.ReturnType {
  const lowercased = foo.toLowerCase()
  assert(lowercased, options)
  return lowercased
}

export declare namespace from {
  type Options = assert.Options

  type ReturnType = Foo

  type ErrorType = assert.ErrorType | Errors.GlobalErrorType
}

/**
 * Thrown when a foo is invalid.
 *
 * @example
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.assert('bar')
 * // @error: Foo.InvalidFooError: Foo 'bar' is invalid.
 * ```
 */
export class InvalidFooError<
  cause extends InvalidInputError | InvalidCaseError =
    | InvalidInputError
    | InvalidCaseError,
> extends Errors.BaseError<cause> {
  override readonly name = 'Foo.InvalidFooError'

  constructor({ value, cause }: { value: string; cause: cause }) {
    super(`Foo "${value}" is invalid.`, {
      cause,
    })
  }
}

/** Thrown when a provided string is not foo. */
export class InvalidInputError extends Errors.BaseError {
  override readonly name = 'Foo.InvalidInputError'

  constructor() {
    super('String is not "foo".')
  }
}

/** Thrown when a provided foo is not fromd. */
export class InvalidCaseError extends Errors.BaseError {
  override readonly name = 'Foo.InvalidCaseError'

  constructor() {
    super('Foo is not fromd')
  }
}
