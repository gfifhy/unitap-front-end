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
    const { data } = await authUserCookie("api/user")
    user.value = data.value as User
  }

  async function register(id: Identity) {

    await authUserCookie("sanctum/csrf-cookie")

    const register = await authUserCookie("api/register",
      {
        method: "POST",
        body: id,
      })

    await fetchUser();

    return register

  }

  async function login(cred: Credentials) {

    await authUserCookie("sanctum/csrf-cookie")

    const login = await authUserCookie("api/login",
      {
        method: "POST",
        body: cred,
      })

    await fetchUser();

    return login

  }

  async function logout() {
    await authUserCookie("logout", {method: 'POST'})
    user.value = null;
    navigateTo('/login')
  }

  return { user, isLoggedIn, fetchUser, register, login, logout }

})