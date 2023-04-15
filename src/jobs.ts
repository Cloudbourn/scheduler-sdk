import { phin } from './utils/httpClient'

export interface JobBody {
  /**
   * A valid URL that can be called from the internet
   */
  endpoint: string

  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

  body: any

  /**
   * ISO 8601 timestamp
   * @example "2022-08-22T22:00:00.000Z"
   */
  scheduleAt: string
}

export interface StoredJob extends JobBody {
  /**
   * @example "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
   */
  id: string

  /**
   * ISO 8601 timestamp
   * @example "2022-08-25T22:11:26.099Z",
   */
  createdAt: string

  /**
   * ISO 8601 timestamp
   * @example "2022-08-25T22:11:26.370Z"
   */
  updatedAt: string

  /**
   * ISO 8601 timestamp
   * @example "2022-08-25T22:11:26.370Z"
   */
  executedAt?: string

  status: 'STORED' | 'QUEUED' | 'RUNNING' | 'DONE'
}

export const add = async (job: JobBody): Promise<StoredJob> => {
  const res = await phin<StoredJob>({
    url: '/jobs',
    method: 'POST',
    data: job,
  })
  return res.body
}

export const remove = async (jobOrId: string | { id: string }): Promise<void> => {
  const id = typeof jobOrId === 'string' ? jobOrId : jobOrId.id
  await phin({
    url: `/jobs/${id}`,
    method: 'DELETE',
  })
}
