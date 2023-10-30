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

    let req;

    await new WebAuthn().login({
      email: null,
    }, {
      remember: null,
    }).then(response => 
      alert('Authentication successful!') // replace with modal
    ).catch(error => {
      alert('Something went wrong, try again!')
      return error
    })

    await fetchUser()

    return req

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