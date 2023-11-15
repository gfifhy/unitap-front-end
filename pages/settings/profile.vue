<script setup lang="ts">

definePageMeta({ 
  layout: 'settings',
  middleware: 'signed-out',
})

const user = ref({})
const loading = ref(true)

onMounted(() => {
  const account = useAuthStore()
  user.value = account.user
  loading.value = false
})

</script>


<template><section id='profile'>

  <h2>Profile</h2>

  <section id="user">
    <UserInfoCard_SK v-if="loading"/><UserInfoCard v-else :user="user"/>
    <ProfileEditForm />
  </section>


</section></template>


<style scoped>

#user {
  @apply flex gap-x-4;

  > div {
    @apply min-w-[260px]
  }
}

</style>