<script setup>

const $route = useRoute()
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
const toast = useToast()
const online = useState('online', () => false)

async function logout() {
  await account.logout()
  toast.add({
    icon: 'i-heroicons-shield-check-solid',
    title: 'Successfully logged out!'
  })
}

onMounted(() => {
  online.value = computed(() => account.isLoggedIn)
})


</script>

<template><nav>

  <header>
    <Logo />
    <section class='proximal' v-if="!online">
      <Brand />
    </section>
  </header>

  <section v-if="online">

    <ButtonTooltip text="Shop" hotkey="S" 
      variant="outline" icon="i-heroicons-building-storefront-20-solid"
      @click="navigateTo('/shop')" />

    <ButtonTooltip text="Admin Panel" hotkey="B" 
      variant="outline" icon="i-tabler-shield-checkered-filled"
      @click="navigateTo('/admin')" v-if="account.user?.role.name === 'Admin'"/>

    <ButtonTooltip text="Send" hotkey="C" 
      variant="solid" icon="i-heroicons-paper-airplane"
      @click="navigateTo('/transact')" />

  </section>


  <footer>

    <ButtonTooltip text="Switch Theme" hotkey="T" 
      variant="soft" :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
      @click="isDark = !isDark" v-if="!online"/>

    <UPopover v-if="online">

      <UChip class="notif-blob" color="red" :show="true">
        <ButtonTooltip text="Notifications" icon="i-heroicons-inbox" 
          hotkey="A" variant="soft" />
      </UChip>

      <template #panel>
          <NotificationPanel />
      </template>

    </UPopover>

    <UPopover v-if="$route.path !== '/login'">

      <ButtonTooltip text="User" hotkey="C" 
        variant="soft" icon="i-heroicons-user-circle-20-solid"
        @click="online ? false : navigateTo('/login')" />

      <template #panel v-if="online">
        <div class="ctxmenu">
          
          <UButton variant="ghost" label="Switch Theme"
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
            @click="isDark = !isDark"/>

          <UButton variant="ghost" label="History"
            icon="i-heroicons-clock"
            @click="navigateTo('/history')"/>

          <UButton variant="ghost" label="Settings"
            icon="i-heroicons-wrench"
            @click="navigateTo('/settings/profile')"/>

          <UDivider />

          <UButton variant="ghost" label="Logout"
            icon="i-heroicons-arrow-left-on-rectangle-20-solid"
            @click="logout"/>

        </div>
      </template>

    </UPopover>

  </footer>

</nav></template>

<style scoped>

:deep(button) {

  @apply w-10 m-2 justify-center;

  aspect-ratio: 1/1;

}

:deep(.notif-blob) > span {
  @apply top-[15px] right-[15px]
}

nav {

  @apply flex justify-between;

  align-items: center;
  flex-direction: var(--sidenav-dir);
  height: var(--sidenav-h);
  width: var(--sidenav-w);

  &.guest {

    @apply flex-row h-16 w-full;

  }

}

header {

  @apply flex flex-row;

  > section {
    display: var(--brand-side);
  }
}

footer {
  @apply flex;
  flex-direction: var(--sidenav-dir);
}

</style>
