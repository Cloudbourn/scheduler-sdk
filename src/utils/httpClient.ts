import basePhin from 'phin'

let endpointBaseUrl = 'https://api.lingering.io'
export const setBaseUrl = (url: string): void => {
  endpointBaseUrl = url
}

let authHeader: string | undefined
export const setAuthorization = (value?: string): void => {
  if (!value?.length) {
    authHeader = undefined
  } else {
    authHeader = value
  }
}

type IOptions = Omit<basePhin.IOptions, 'parse'>
type IWithData = basePhin.IWithData<IOptions>

export const phin = async <T = unknown>(
  opts: IOptions | IWithData,
): Promise<basePhin.IJSONResponse<T>> => {
  const url = typeof opts.url === 'string'
    ? `${endpointBaseUrl}${opts.url}`
    : opts.url.toString()

  const headers = {
    Authorization: authHeader,
  }

  return await basePhin<T>({
    parse: 'json',
    timeout: 2000,
    ...opts,
    url,
    headers,
  })
}
