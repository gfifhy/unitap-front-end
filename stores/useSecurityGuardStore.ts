import { defineStore } from "pinia"

export const useSecurityGuardStore = defineStore('security-guard', () => {

  const violations = ref(null)
  const userViolations = ref(null)
  const locations = ref(null)

  function $reset() {
    violations.value = null
    userViolations.value = null
    locations.value = null
  }

  const getUserViolations = async (id) => {
    if (!userViolations.value) userViolations.value = await fetchUserViolations(id)
    return userViolations.value
  }

  const getViolations = async () => {
    if (!violations.value) violations.value = await fetchViolation()
    return violations.value
  }

  const getLocations = async () => {
    if (!locations.value) locations.value = await fetchLocations()
    return locations.value
  }

  async function fetchLocations() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/security-guard/locations`)
    return res
  }

  async function fetchViolation() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/security-guard/violation-list`)
    return res
  }

  async function fetchUserViolations(id) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest(`api/security-guard/user-violations${id ? '/' + id : ''}`)
    return res
  }

  async function addUserViolation(val) {
    const { res, err } = await doRequest('api/security-guard/violation', {
      method: 'POST',
      body: convertForm(val, 0)
    })
    return { res, err }
  }

  async function studentEntry(val: Array) {
    const { res, err } = await doRequest('api/security-guard/student-entry', {
      method: 'POST',
      body: { user_id: val[0], nfc_id: val[1] }
    })
    return res
  }

  async function updateLocation(val) {
    const { res, err } = await doRequest('api/security-guard/update-location', {
      method: 'POST',
      body: { location_id: val }
    })
    return { res, err }
  }

  return { 
    $reset,
    getLocations,
    getViolations,
    getUserViolations,
    addUserViolation,
    studentEntry,
    updateLocation,
  }

})
