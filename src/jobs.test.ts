import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import nock from 'nock'
import { type StoredJob, add, remove } from './jobs'
import { setAuthorization } from './utils/httpClient'

beforeAll(() => {
  nock.disableNetConnect()
  setAuthorization('jobs-tests-ts')
})

describe('add()', () => {
  test('makes http request', async () => {
    const job = {
      id: '123-4567-8901-234',
      endpoint: 'http://localhost',
      method: 'GET',
      // body: {},
      scheduleAt: new Date().toJSON(),
      createdAt: new Date().toJSON(),
      updatedAt: new Date().toJSON(),
      // executedAt: '',
      status: 'STORED',
    } satisfies StoredJob
    const endpoint = nock(/api\.lingering\.io/)
      .post('/jobs')
      .reply(200, job)

    const res = await add({
      endpoint: job.endpoint,
      method: job.method,
      scheduleAt: job.scheduleAt,
    })

    endpoint.done()
    expect(res).toEqual(job)
  })

  test('throws non-2xx responses', async () => {
    const endpoint = nock(/api\.lingering\.io/)
      .post('/jobs')
      .reply(401, { message: 'Your API key is invalid or some such' })

    await expect(async () => {
      await add({
        endpoint: 'http://localhost',
        method: 'GET',
        scheduleAt: new Date().toJSON(),
      })
    }).rejects.toThrowError('HTTP 401: Your API key is invalid or some such')

    endpoint.done()
  })
})

describe.each([
  { id: '123', arg: '123' },
  { id: 'abc', arg: { id: 'abc' } },
])('remove($arg)', ({ arg, id }) => {
  test('sends DELETE request', async () => {
    const endpoint = nock(/api\.lingering\.io/)
      .delete(`/jobs/${id}`)
      .reply(200, '"OK"')

    await remove(arg)

    endpoint.done()
  })
})

afterAll(() => {
  nock.restore()
})
