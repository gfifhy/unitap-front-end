export default defineNuxtRouteMiddleware((to, from) => {

  const account = useAuthStore();

  if (account.isLoggedIn) {
    const role = account.user.role.slug

    if (role === 'store') {
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
