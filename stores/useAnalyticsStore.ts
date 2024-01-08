import { defineStore } from "pinia"

export const useAnalyticsStore = defineStore('analytics', () => {
/*
  const gloss = ref(null)

  const getGloss = async (time, id) => {
    if (!gloss.value) gloss.value = await fetchGloss(time, id)
    return gloss.value
  }

  async function fetchGloss(time, id) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/analytics/gloss/${id}`)
    return res
  }

*/

  async function fetchViolations(time = 'w', t, id = '00000000-0000-0000-0000-000000000000') {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/analytics/violation/${ (t ? 'type/' : '') +
      (time)}/${id}`)
    return res
  }

  return { 
    //getGloss,
    fetchViolations,
  }

})
