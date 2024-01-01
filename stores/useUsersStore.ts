import { defineStore } from "pinia"

export const useUsersStore = defineStore('users', () => {

  const violations = ref(null)
  const allUsers = ref(null)

  const getAllUsers = async () => {
    if (!allUsers.value) allUsers.value = await fetchUsers()
    return allUsers.value
  }

  const getViolations = async () => {
    if (!violations.value) violations.value = await fetchViolation()
    return violations.value
  }

  async function fetchUsers(id) {
    if (id) {
      const { res } = await doRequest(`api/admin/users/${id}`)
      return res
    }
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest('api/admin/users')
    return res.data
  }

  async function addUser(id, isStaff: Boolean) {
    const { res, err } = await doRequest(`api/admin/${isStaff ? 'staff' : 'student'}`, {
      method: "POST",
      body: convertForm(id, 0)
    })
    return { res, err }
  }

  async function editUser(id, meth) {
    let { res, err } = await doRequest(`api/admin/users/${meth == 'PUT' ? id.id : id}`, {
      method: meth,
      body: meth == 'PUT' ? removeNullProperties(id) : false
    })
    res = removeNullProperties(res)
    return { res, err }
  }

  return { 
    fetchUsers,
    getAllUsers,
    addUser,
    editUser,
    getViolations,
  }

})


async function fetchViolation() {
  const { res } = await doRequest('api/student/violation', {
    method: "POST"
  })
  return res
}

const removeNullProperties = obj => {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== null);
  return Object.fromEntries(filteredEntries);
}