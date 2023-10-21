export default defineNuxtRouteMiddleware((to, from) => {

  const user = useAuthStore();

  if (!user.isLoggedIn) {
    if (process.server) {
      navigateTo('/about', { replace: true })
    } else {
      return navigateTo('/about', { replace: true })
    }
  }

})
