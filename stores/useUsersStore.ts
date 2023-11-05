import { defineStore } from "pinia"

export const useUsersStore = defineStore('users', () => {

  const violations = ref(null)

  const getViolations = async () => {
    if (!violations.value) {
      await fetchViolation()
      violations.value = JSON.parse(JSON.stringify(violations._rawValue))
    } 
    return violations.value
  }

  async function fetchUsers() {
    try {
      await useFetch('http://127.0.0.1') // shit workaround for first fetch err
      const { data } = await doRequest('api/admin/users')
      return data._rawValue.data
    } catch (e) {
      throw new Error(e)
    }
  }

  async function fetchViolation() {
    try {
      const { data } = await doRequest('api/student/violation', {
        method: "POST"
      })
      violations.value = data._rawValue
    } catch (e) {
      throw new Error(e)
    }
  }

  return { 
    fetchUsers,
    getViolations,
  }

})