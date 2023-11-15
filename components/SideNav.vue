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

    <ButtonTooltip text="Dashboard" hotkey="D"
      variant="outline" icon="i-heroicons-rectangle-group-20-solid" 
      @click="navigateTo('/login')" />

    <ButtonTooltip text="Analytics" hotkey="B" 
      variant="outline" icon="i-heroicons-chart-pie-20-solid" />

    <ButtonTooltip text="Manage Accounts" hotkey="B" 
      variant="outline" icon="i-heroicons-user-group-20-solid"
      @click="navigateTo('/manage')" v-if="account.user?.role.name === 'Admin'"/>

    <ButtonTooltip text="Send" hotkey="C" 
      variant="solid" icon="i-heroicons-paper-airplane"
      @click="navigateTo('/transact')" />

  </section>


  <footer>

    <UPopover>

      <ButtonTooltip text="Notifications" icon="i-heroicons-inbox" 
        hotkey="A" variant="soft" 
        v-if="online"/>

      <template #panel>
        <div class="p-4">
          <NotificationPanel />
        </div>
      </template>

    </UPopover>

    <UPopover>

      <ButtonTooltip text="User" hotkey="C" 
        variant="soft" icon="i-heroicons-user-circle-20-solid"
        @click="online ? false : navigateTo('/login')" />

      <template #panel>
        <div class="ctxmenu">
          
          <UButton variant="ghost" label="Switch Theme"
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
            @click="isDark = !isDark"/>

          <template v-if="online">
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
          </template>

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
