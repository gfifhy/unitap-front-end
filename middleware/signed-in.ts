export default defineNuxtRouteMiddleware((to, from) => {

  const user = useAuthStore();

  const egg = async () => {
    user.fetchState()
      .then(d => { if(d.value) navigateTo('/', { replace: true }) })
      .catch(e => {
        console.error("An error occurred:", e);
      });
  }

  egg();

})
