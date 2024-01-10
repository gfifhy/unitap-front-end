export default defineNuxtRouteMiddleware((to, from) => {

  const account = useAuthStore();

  if (account.isLoggedIn) {

    if (account.user.role.slug === 'admin') {
      if (!process.server) {
        return navigateTo('/admin', { replace: true })
      }
    }

  } 


})
