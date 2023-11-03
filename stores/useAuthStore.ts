import { defineStore } from "pinia"
import WebAuthn from "~/composables/webauthn"
type Credentials = {
  email: string
  password: string
  role_id: string
}

type Identity = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {

  const user = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser() {
    
    const { data } = await doRequest("api/profile")
    user.value = data.value?.user

  }

  async function register(id: Identity) {

    await doRequest("sanctum/csrf-cookie")
    const req = await doRequest("api/register",
      {
        method: "POST",
        body: id,
      })
    await fetchUser();
    return req

  }

  async function login(cred: Credentials) {

    await doRequest("sanctum/csrf-cookie")
    const req = await doRequest("api/login",
      {
        method: "POST",
        body: {
          email: cred.email.toString(),
          password: cred.password.toString()
        }
      })
    if (req.error.value) {
      throw new Error("Incorrect username or password.")
      return
    }
    user.value = req.data._rawValue
    return req

  }

  async function logout() {

    user.value = null
    await doRequest("api/logout", {method: 'POST'})
    await refreshNuxtData()
    navigateTo('/login')

  }

  async function wRegister() {

    await new WebAuthn().register()
      .then(response => {
        alert('Registration successful!'); // replace with modal
        return response
      })
      .catch(error => {
        alert('Something went wrong, try again!');
        return error
      });

  }

  async function wLogin(email: string) { 

    await new WebAuthn().login({
      email: null,
    }, {
      remember: null,
    }).then(req => {
      if (req.error.value) {
        throw new Error(req.error.value.data.message)
      } else {
        user.value = req.data._rawValue
      }
      return
    }).catch(e => {
      throw new Error(e)
    })

  }

  async function wUnRegister() {
/*
    console.log(user)

    const req = await doRequest("webauth/keys/" + user?.value.id,
      { method: "DELETE" }
    )

    return req
*/
  }

  return { 
    user, isLoggedIn, 
    fetchUser,
    register, login, logout,
    wRegister, wLogin, wUnRegister
  }

})