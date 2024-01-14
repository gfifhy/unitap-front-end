import { defineStore } from "pinia"

export const useUsersStore = defineStore('users', () => {

  const allUsers = ref(null)

  function $reset() {
    allUsers.value = null
  }

  const getAllUsers = async (id = false, role = 'admin') => {
    if (!allUsers.value) allUsers.value = await fetchUsers(id, role)
    return allUsers.value
  }

  async function fetchUsers(id, role) {
    if (id) {
      const { res } = await doRequest(`api/${role}/users/${id}`)
      return res
    }
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/${role}/users`)
    return res.data
  }

  async function fetchUser(id) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/admin/users/${id}`)
    return res
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
    fetchUser,
    getAllUsers,
    addUser,
    editUser,
    $reset,
  }

})

const removeNullProperties = obj => {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== null);
  return Object.fromEntries(filteredEntries);
}