import { afterAll, beforeAll, beforeEach, vi } from 'vitest'

beforeAll(() => {
  vi.mock('../src/core/internal/errors.ts', async () => ({
    ...(await vi.importActual('../src/core/internal/errors.ts')),
    getVersion: vi.fn().mockReturnValue('x.y.z'),
    getUrl: vi.fn().mockReturnValue('https://openindex.dev/rpc'),
  }))
})

beforeEach(() => {})

afterAll(async () => {
  vi.restoreAllMocks()
})
