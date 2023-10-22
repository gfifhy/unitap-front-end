import { defineStore } from "pinia"

type User = {
  id: string
  name: string
  email: string
}

type Credentials = {
  email: string
  password: string
}

type Identity = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref<User | null>(null)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser() {
    const { data } = await doRequest("api/user")
    user.value = data.value as User
  }

  async function register(id: Identity) {

    await doRequest("sanctum/csrf-cookie")

    const register = await doRequest("api/register",
      {
        method: "POST",
        body: id,
      })

    await fetchUser();

    return register

  }

  async function login(cred: Credentials) {

    await doRequest("sanctum/csrf-cookie")

    const ass = await doRequest("api/roles")
    console.log(ass.data._rawValue)

    const login = await doRequest("api/admin/login",
      {
        method: "POST",
        body: {
          email: cred.email as string,
          password: cred.password as string,
          role_id: "5762ddd2-dad9-4729-b77a-7b06ea14eb3e",
        }
      })

    await fetchUser();

    return login

  }

  async function logout() {
    await doRequest("api/logout", {method: 'POST'})
    user.value = null
    navigateTo('/login')
    this.$nuxt.refresh()
  }

  return { user, isLoggedIn, fetchUser, register, login, logout }

})