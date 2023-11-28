import { defineStore } from "pinia"

export const useUsersStore = defineStore('users', () => {

  const violations = ref(null)

  const getViolations = async () => {
    if (!violations.value) await fetchViolation()
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
      body: convertForm(id)
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

  async function fetchViolation() {
    const { res } = await doRequest('api/student/violation', {
      method: "POST"
    })
    violations.value = res
  }

  return { 
    fetchUsers,
    addUser,
    editUser,
    getViolations,
  }

})


function removeNullProperties(obj) {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== null);
  return Object.fromEntries(filteredEntries);
}

function convertForm(obj) {
  const formData: FormData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (Object.prototype.toString.call(value) === '[object Object]') {
        formData.append(key, JSON.stringify(value));
    } else {
        formData.append(key, value);
    }
  }
  
  for (var pair of formData.entries()) {
    console.warn(pair[0]+ ', ' + pair[1]); 
  }

  return formData
}