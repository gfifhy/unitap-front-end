export default defineNuxtRouteMiddleware((to, from) => {

  if (process.server) return

  const user = useAuthStore();

  if (user.isLoggedIn) {
    return navigateTo('/', { replace: true })
  }

})
