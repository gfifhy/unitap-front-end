export default defineNuxtRouteMiddleware((to, from) => {

  const account = useAuthStore();

  if (account.isLoggedIn) {

    if (account.user.role.slug === 'security-guard') {
      if (!process.server) {
        return navigateTo('/guard', { replace: true })
      }
    }

  } 


})
