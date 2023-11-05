export default defineNuxtRouteMiddleware((to, from) => {

  const account = useAuthStore();

  if (account.isLoggedIn) {

    if (account.user.role.name === 'Admin') {
      return
    }

  } 

  if (process.server) {
    navigateTo('/', { replace: true })
    return
  } else {
    return navigateTo('/', { replace: true })
  }

})
