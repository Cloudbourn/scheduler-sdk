import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest'
import { phin, setAuthorization, setBaseUrl } from './httpClient'
import basePhin from 'phin'

vi.mock('phin', () => {
  return {
    default: vi.fn(async () => {
      return { statusCode: 200, body: {} }
    }),
  }
})
afterEach(() => {
  vi.clearAllMocks()
})

describe('phin()', async () => {
  test('requires setAuthorization() first', async () => {
    setAuthorization('')
    await expect(async () => {
      await phin({ url: '' })
    }).rejects.toThrowError(/setAuthorization\(\)/)

    setAuthorization('super-secret-api-key')
    await expect(phin({ url: '' })).resolves.toContain({ statusCode: 200 })
  })
  describe('', () => {
    const AUTH_HEADER = 'httpClient-test-ts'
    beforeEach(() => {
      setAuthorization(AUTH_HEADER)
    })
    test('calls phin', async () => {
      await phin({ url: '/potato' })

      expect(basePhin).toHaveBeenCalledTimes(1)
    })

    test('defaults to api.lingering.io', async () => {
      await phin({ url: '/potato' })

      expect(basePhin).toHaveBeenCalledTimes(1)
      expect(basePhin).toHaveBeenCalledWith(
        expect.objectContaining({
          url: expect.stringMatching(/^https:\/\/api\.lingering\.io\//),
        }),
      )
    })

    test('appends auth header', async () => {
      await phin({ url: '/fries' })

      expect(basePhin).toHaveBeenCalled()
      expect(basePhin).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: AUTH_HEADER,
          }),
        }),
      )
    })

    test('resolves with (base)phin response', async () => {
      const httpResponse = {
        statusCode: 200,
        body: { hello: 'world' },
      }
      vi.mocked(basePhin).mockResolvedValueOnce(httpResponse as any)

      const res = await phin<typeof httpResponse.body>({ url: '/hello' })

      expect(res).toBe(httpResponse)
    })
  })
})

describe('setBaseUrl()', () => {
  test('overrides api.lingering.io', async () => {
    setAuthorization('setbaseurl-test')
    setBaseUrl('https://github.com/Cloudbourn')

    await phin({ url: '/scheduler-sdk' })

    expect(basePhin).toHaveBeenCalledWith(
      expect.objectContaining({
        url: 'https://github.com/Cloudbourn/scheduler-sdk',
      }),
    )
  })
})
