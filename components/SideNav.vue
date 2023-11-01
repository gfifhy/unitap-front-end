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
  this.$nuxt.refresh()
}

async function webauth() {
  console.log("asgsagsaklgjsakg")
}
async function webautha() {
  const res = await account.wRegister();
  console.log(res)
  if (res) { console.warn(res); }
  else { navigateTo('/') }
}

onMounted(() => {
  window.addEventListener("resize", handleWindowSizeChange);
  handleWindowSizeChange();
});
onUnmounted(() => {
  window.removeEventListener("resize", handleWindowSizeChange);
});

const handleWindowSizeChange = () => {
  const timeoutId = window.setTimeout(() => {}, 0);
  for (let id = timeoutId; id >= 0; id -= 1) {
    window.clearTimeout(id);
  }

  setTimeout(() => {
    console.log(window.outerWidth)
  }, 200);
};


</script>

<template>
<nav>


  <header>
    <Logo />
    <section class='proximal' v-if="!online"><Brand /></section>
  </header>


  <section v-if="online">

    <ButtonTooltip text="Dashboard" hotkey="D"
      variant="outline" icon="i-heroicons-rectangle-group-20-solid" 
      @click="navigateTo('/login')" />

    <ButtonTooltip text="Analytics" hotkey="B" 
      variant="outline" icon="i-heroicons-chart-pie-20-solid" />

    <ButtonTooltip text="Send" hotkey="C" 
      variant="solid" icon="i-heroicons-paper-airplane" />

  </section>


  <footer>

    <ButtonTooltip text="Notifications" icon="i-heroicons-inbox" 
      hotkey="A" variant="soft" 
      v-if="online"/>

    <ClientOnly><UPopover> <!-- debug required // remove ClienOnly tag -->

      <ButtonTooltip text="User" hotkey="C" 
        variant="soft" icon="i-heroicons-user-circle-20-solid"
        @click="online ? false : navigateTo('/login')" />

      <template #panel>
        <div class="ctxmenu">
          
          <UButton variant="ghost" label="Switch Theme"
            :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'"
            @click="isDark = !isDark"/>

          <UButton variant="ghost" label="Register Passkey"
            icon="i-heroicons-finger-print"
            @click="webauth" v-if="online"/>

          <UButton variant="ghost" label="Logout"
            icon="i-heroicons-arrow-left-on-rectangle-20-solid"
            @click="logout" v-if="online"/>

        </div>
      </template>

    </UPopover></ClientOnly>

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

.ctxmenu {
  @apply flex-col flex p-1;
  button {
    @apply w-[150px] h-11 justify-start;
  }
}

</style>
