<script setup lang="ts">

useHead({ titleTemplate: 'Settings - UniTap' })

const role = ref('')
const scrw = ref(9999)

const handleWidth = () => {
  const timeoutId = window.setTimeout(() => {}, 0);
  for (let id = timeoutId; id >= 0; id -= 1) {
    window.clearTimeout(id);
  }

  setTimeout(() => {
    scrw.value = window.innerWidth
  }, 100);
};

const isOpen = ref(false)

onMounted(() => {

  const account = useAuthStore()
  role.value = account.user.role.name

  window.addEventListener("resize", handleWidth);
  handleWidth();

})

onUnmounted(() => {
  window.removeEventListener("resize", handleWidth);
});

</script>


<template><div id="app">

<USlideover v-if="scrw < 1028" v-model="isOpen" side="left">
  <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
    
    <template #header>
      <UButton variant="outline"
        icon="i-heroicons-arrow-long-left"
        @click="isOpen = false"/>
      <span class="text-2xl p-4">settings</span>
    </template>

    <SettingsNav @itemClicked="isOpen = false"/>

  </UCard>
</USlideover>

<aside>
  <section class="flex-row justify-between mx-0">
    <UButton variant="ghost" label="settings"
      size="xl" icon="i-heroicons-bars-3"
      @click="isOpen = true" v-if="scrw < 1028"/>
    <Logo class="mx-4"/>
    <UButton variant="ghost" label="back to home"
      trailingIcon="i-heroicons-arrow-long-left"
      @click="navigateTo('/')"/>
  </section>
  <section v-if="scrw > 1029" class="flex-col mx-6">
    <h1>settings</h1>
    
    <UDivider />

    <SettingsNav />
    
  </section>
</aside>

<main>

  <div class="w-full px-4">
    <hr class="m-9 invisible">
    <NuxtPage class="max-w-3xl mx-auto" />
  </div>

  <footer>
    
  </footer>

</main>

<UNotifications />

</div></template>


<style scoped>

aside > section {
  @apply flex
}
/*flex flex-col flex-1*/
aside {

  button {
    @apply m-3
  }

}



@media only screen and (max-width: 1028px) {
  :deep(a > span:first-of-type) { @apply py-6 }
  hr {
    @apply m-0
  }
}
</style>