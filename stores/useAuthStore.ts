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

  async function fetchState() {
    await fetchUser()
    return isLoggedIn
  } 

  async function register(id: Identity) {

    await doRequest("sanctum/csrf-cookie")

    const register = await doRequest("register",
      {
        method: "POST",
        body: id,
      })

    await fetchUser();

    return register

  }

  async function login(cred: Credentials) {

    await doRequest("sanctum/csrf-cookie")

    const login = await doRequest("login",
      {
        method: "POST",
        body: cred,
      })

    await fetchUser();

    return login

  }

  async function logout() {
    await doRequest("logout", {method: 'POST'})
    user.value = null;
    navigateTo('/login')
  }

  return { user, isLoggedIn, fetchState, fetchUser, register, login, logout }

})