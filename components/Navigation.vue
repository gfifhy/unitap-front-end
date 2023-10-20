<script setup>

const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const account = useAuthStore()
const online = computed(() => account.isLoggedIn)

async function logout() {
  await account.logout()
}

</script>

<template>

  <header>
    <div class=""><NuxtLink to="/">logo</NuxtLink></div>
  </header>
  
  <section v-if="online">
    <UButton>1</UButton>
    <UButton>2</UButton>
    <UButton>3</UButton>
    <UButton>4</UButton>
  </section>
  
  <footer>
    
    <UButton color="gray" variant="ghost"
      :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
      @click="isDark = !isDark"/>

    <UButton color="gray" variant="ghost" 
      icon="i-heroicons-user-circle-20-solid"
      @click="online ? false : navigateTo('/login')"
      v-if="$route.path !== '/login'"/>
<!--
    <UButton color="gray" variant="ghost" 
      icon="i-heroicons-cog-6-tooth-20-solid"
      @click=""/>
-->
    <UButton color="gray" variant="ghost" 
      icon="i-heroicons-arrow-left-on-rectangle-20-solid"
      @click="logout" v-if="online"/>

  </footer>

</template>

<style scoped>
button {

  @apply w-10 m-2 justify-center;

  aspect-ratio: 1/1;

}
</style>