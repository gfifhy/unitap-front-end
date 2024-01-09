export default defineNuxtRouteMiddleware((to, from) => {

  const account = useAuthStore();

  if (account.isLoggedIn) {
    const role = account.user.role.slug

    if (role === 'store') {
      return
    }

  } 

  if (!process.server) {
    return navigateTo('/', { replace: true })
  }

})
