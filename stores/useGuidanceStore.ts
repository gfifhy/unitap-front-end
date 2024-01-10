import { defineStore } from "pinia"

export const useGuidanceStore = defineStore('guidance-staff', () => {


  const locationPopulations = ref(null)

  const getLocationPopulations = async (role) => {
    if (!locationPopulations.value) locationPopulations.value = await fetchLocationPopulations(role)
    return locationPopulations.value
  }

  async function fetchLocationPopulations(role) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/${role}/data/location`)
    return res
  }

  return { 
    getLocationPopulations,
  }

})
