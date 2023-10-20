export default defineNuxtRouteMiddleware((to, from) => {

  if (process.server) return

  console.log('sagashgsajghjsg')
  const user = useAuthStore();

  if (!user.isLoggedIn) {
    return navigateTo('/about', { replace: true })
  }

})
