import { defineStore } from "pinia"

export const useGuidanceStore = defineStore('guidance-staff', () => {


  const locationPopulations = ref(null)

  const getLocationPopulations = async () => {
    if (!locationPopulations.value) locationPopulations.value = await fetchLocationPopulations()
    return locationPopulations.value
  }

  async function fetchLocationPopulations() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest('api/guidance/data/location')
    return res
  }

  return { 
    getLocationPopulations,
  }

})
