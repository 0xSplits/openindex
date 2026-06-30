/** @entrypointCategory Core */
// biome-ignore lint/complexity/noUselessEmptyExport: tsdoc
export type {}

export * as Errors from './core/Errors.js'

/**
 * Utility functions for working with the string 'foo'.
 *
 * @example
 * ### Validating Foo-ness
 *
 * The {@link openindex#Foo.(assert:function)} function will throw an error if the foo is invalid:
 *
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * Foo.assert('oof')
 * // @error: InvalidFooError: Foo "oof" is invalid.
 * ```
 *
 * @example
 * ### Lowercase Foo
 *
 * A {@link openindex#Foo.Foo} can be instantiated from a string using {@link openindex#Foo.(from:function)}:
 *
 * ```ts twoslash
 * import { Foo } from 'openindex'
 *
 * const foo = Foo.from('FOO')
 * // @log: 'foo'
 * ```
 *
 * @category Foo
 */
export * as Foo from './core/Foo.js'
