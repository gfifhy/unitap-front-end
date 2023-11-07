import { defineStore } from "pinia"

type Identity = {
  //'nfc_id': String|null
  'first_name': String
  'middle_name': String|null
  'last_name': String
  'student_id': String
  'email': String
  'role': any
  'contact': String
  'password': String
  'guardian_first_name': String
  'guardian_middle_name': String|null
  'guardian_last_name': String
  'guardian_contact': String
  //'user_image': String|null
  //'user_signature': String|null
}

export const useUsersStore = defineStore('users', () => {

  const violations = ref(null)

  const getViolations = async () => {
    if (!violations.value) {
      await fetchViolation()
    } 
    return violations.value
  }

  async function fetchUsers(id) {
    if (id) {
      const { res } = await doRequest(`api/admin/users/${id}`)
      return res
    }
    await useFetch('http://127.0.0.1') // shit workaround for first fetch err
    const { res } = await doRequest('api/admin/users')
    return res.data
  }

  async function addStudent(id: Identity) { // replace with add user
    let { res, err } = await doRequest('api/admin/student', {
      method: "POST",
      body: id
    })
    res = res.data
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
    addStudent,
    editUser,
    getViolations,
  }

})


function removeNullProperties(obj) {
  const filteredEntries = Object.entries(obj).filter(([key, value]) => value !== null);
  return Object.fromEntries(filteredEntries);
}