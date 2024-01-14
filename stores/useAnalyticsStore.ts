import { defineStore } from "pinia"

export const useAnalyticsStore = defineStore('analytics', () => {

  const gloss = ref(null)

  function $reset() {
    gloss.value = null
  }

  const getGloss = async () => {
    if (!gloss.value) gloss.value = await fetchGloss()
    return gloss.value
  }

  async function fetchGloss() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest('api/analytics/user/gloss')
    return res
  }


  async function fetchViolations(time = 'w', t, id = '00000000-0000-0000-0000-000000000000') {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/analytics/violation/${ (t ? 'type/' : '') +
      (time)}/${id}`)
    return res
  }

  return { 
    $reset,
    getGloss,
    fetchViolations,
  }

})
