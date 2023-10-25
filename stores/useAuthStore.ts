import { defineStore } from "pinia"

import { 
  startRegistration,
  startAuthentication
} from '@simplewebauthn/browser'

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

    const ass = await doRequest("api/roles")
    console.log(ass.data._rawValue)

    const req = await doRequest("api/admin/login",
      {
        method: "POST",
        body: {
          email: cred.email as string,
          password: cred.password as string,
          role_id: "5762ddd2-dad9-4729-b77a-7b06ea14eb3e",
        }
      })

    await fetchUser();

    return req

  }

  async function logout() {
    await doRequest("api/logout", {method: 'POST'})
    user.value = null
    navigateTo('/login')
    this.$nuxt.refresh()
  }

/*

WebAuthn functiosanoangaignaognaghaj;lgagjalkjgajgjajg'jga'gksakgsalg
WebAuthn functiosanoangaignaognaghaj;lgagjalkjgajgjajg'jga'gksakgsalg
WebAuthn functiosanoangaignaognaghaj;lgagjalkjgajgjajg'jga'gksakgsalg
WebAuthn functiosanoangaignaognaghaj;lgagjalkjgajgjajg'jga'gksakgsalg

*/

  async function wLogin() { // not tested 

    const {data} = await doRequest("api/webauth/login/options")

    let assResp;

    try {
      assResp = await startAuthentication(JSON.parse(JSON.stringify(data.value)));
    } catch (error) {
      console.error(error)
    }

    const req = await doRequest("api/webauth/login",
      {
        method: "POST",
        body: assResp,
      })

    await fetchUser();

    return req

  }

  async function wRegister() {

    const {data} = await doRequest("api/webauth/register/options")

    let attResp;

    try {
      attResp = await startRegistration(JSON.parse(JSON.stringify(data.value)));
    } catch (error) {
      if (error.name === 'InvalidStateError') {
        console.log('Error: Authenticator was probably already registered by user')
      } else {
        console.log(error)
      }
    }

    const req = await doRequest("api/webauth/register",
      {
        method: "POST",
        body: attResp,
      })

    return req

  }

  return { 
    user, isLoggedIn, 
    fetchUser,
    register, login, logout,
    wRegister, wLogin
  }

})