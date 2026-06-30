import type * as Errors from '../Errors.js'

/**
 * @internal
 * Checks if a given string is lowercased.
 */
export function isLowercase(value: string): boolean {
  return value.toLowerCase() === value
}

export declare namespace foo {
  type ErrorType = Errors.GlobalErrorType
}
