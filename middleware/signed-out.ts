export default defineNuxtRouteMiddleware((to, from) => {

  const user = useAuthStore();

  if (!user.isLoggedIn) {
    if (process.server) {
      navigateTo('/landing', { replace: true })
    } else {
      return navigateTo('/landing', { replace: true })
    }
  }

})
