import type { UseFetchOptions } from 'nuxt/app'

export async function doRequest<T>(
  path: string,
  options: UseFetchOptions<T> = {}
) {

  const $cfg = useAppConfig()

  const token = useCookie('XSRF-TOKEN')

  const head: any = {
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
        options.headers = options.headers || {}
      },
      onResponse({ request, response, options }) {
        res = response._data
      },
      onResponseError({ response }) {
        err = response._data
      }
    }
  )

  return { res, err }
}