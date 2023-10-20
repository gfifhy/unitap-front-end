export default defineNuxtPlugin(async () => {
  const user = useAuthStore()
  if (!user.isLoggedIn) {
    await user.fetchUser()
  }
})
