import { expect, test } from 'vitest'
import { isLowercase } from '../../internal/lowercase.js'

test('isLowercase', () => {
  expect(isLowercase('aaaaBaaaaa')).toBe(false)
  expect(isLowercase('aaaaa')).toBe(true)
})
