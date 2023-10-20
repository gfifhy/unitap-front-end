import type { UseFetchOptions } from 'nuxt/app'

export function authUserCookie<T>(
  path: string,
  options: UseFetchOptions<T> = {}
) {

  const { apiProtocol, apiHost, appProtocol, appHost } = config()

  const token = useCookie('XSRF-TOKEN')

  let headers: any = {
    accept: "application/json",
    referer: (appProtocol + appHost.slice(0, -1)) as string
  }

  if (token.value) {
    headers['X-XSRF-TOKEN'] = token.value as string
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    }
  }

  console.log({
      credentials: "include",
      watch: false,
      ...options,
      headers: {
        ...headers,
        ...options?.headers
      }
    })
  
  return useFetch(apiProtocol + apiHost + path,
    {
      credentials: "include",
      watch: false,
      ...options,
      headers: {
        ...headers,
        ...options?.headers
      }
    })

}