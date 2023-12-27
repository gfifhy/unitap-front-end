import type { UseFetchOptions } from 'nuxt/app'

export async function doRequest<T>(
  path: string,
  options: UseFetchOptions<T> = {}
) {

  const $cfg = useAppConfig()

  const token = useCookie('XSRF-TOKEN')

  let head: any = {
    accept: "application/json"
  }

  if (token.value) {
    head['X-XSRF-TOKEN'] = token.value as string
  }

  let res;
  let err;

  await useFetch($cfg.api.base + path,
    {
      credentials: "include",
      watch: false,
      ...options,
      headers: {
        ...head,
        ...options?.headers
      },
      onRequest({ request, options }) {
        console.warn("Request:")
        console.info(options)
        options.headers = options.headers || {}
      },
      onResponse({ request, response, options }) {
        console.warn("Response:")
        console.info(response)
        res = response._data
      },
      onResponseError({ response }) {
        console.error('Error: ' + response.status)
        console.info(response)
        err = response._data
      }
    }
  )

  return { res, err }
}