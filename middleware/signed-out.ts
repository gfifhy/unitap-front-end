export default defineNuxtRouteMiddleware((to, from) => {

  const user = useAuthStore();

  if (!user.isLoggedIn) {
    if (!process.server) {
      return navigateTo('/landing', { replace: true })
    }
  }

})
