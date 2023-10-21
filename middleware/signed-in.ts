export default defineNuxtRouteMiddleware((to, from) => {

  const user = useAuthStore();

  if (user.isLoggedIn) {
    if (process.server) {
      navigateTo('/', { replace: true })
    } else {
      return navigateTo('/', { replace: true })
    }
  }

})
