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
  const identity = ref(null)
  const isLoggedIn = computed(() => !!user.value)

  async function fetchUser() {
    
    const { res } = await doRequest("api/profile")
    user.value = res?.user
    identity.value = res?.user_data

  }

  async function register(id: Identity) {

    await doRequest("sanctum/csrf-cookie")
    const { req } = await doRequest("api/register",
      {
        method: "POST",
        body: id,
      })
    await fetchUser();
    return res

  }

  async function login(cred: Credentials) {

    await doRequest("sanctum/csrf-cookie")
    const { res, err } = await doRequest("api/login",
      {
        method: "POST",
        body: cred
      })
    if (err) {
      return Error("Incorrect username or password.")
    }
    user.value = res
    navigateTo('/')
    return false

  }

  async function logout() {

    user.value = null
    await doRequest("api/logout", {method: 'POST'})
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
      email: email,
    }, {
      remember: null,
    })
    .then(res => user.value = res)
    .catch(e => console.error(e))

    navigateTo('/')

  }

  async function wUnRegister() {
/*
    console.log(user)

    const { req } = await doRequest("webauth/keys/" + user?.value.id,
      { method: "DELETE" }
    )

    return res
*/
  }

  return { 
    user, identity, isLoggedIn, 
    fetchUser,
    register, login, logout,
    wRegister, wLogin, wUnRegister
  }

})