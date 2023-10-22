import type { UseFetchOptions } from 'nuxt/app'

export function doRequest<T>(
  path: string,
  options: UseFetchOptions<T> = {}
) {

  const $cfg = useAppConfig()

  const token = useCookie('XSRF-TOKEN')

  let headers: any = {
    accept: "application/json",
    "content-type": "application/json",
    referer: ($cfg.app.protocol + $cfg.app.host.slice(0, -1)) as string
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
  
  return useFetch($cfg.api.protocol + $cfg.api.host + path,
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