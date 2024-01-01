<template>
  <ButtonTooltip text="Dashboard" hotkey="D" id="dashboard"
  variant="ghost" icon="i-heroicons-rectangle-group-20-solid" 
  @click="navigateTo('/login')" v-if="useAuthStore().isLoggedIn && useRoute().path !== '/'" />
  <NuxtLink to="/"><img src="/unitap_f.svg" alt="Unitap logo"></NuxtLink>

</template>

<style scoped>

#dashboard {
  @apply absolute opacity-0 h-[69px] w-[56px] z-[2];

  transition: .5s;

  &:hover {
    @apply opacity-100;

    + a {
      @apply opacity-0;      
    }
  }
}

#dashboard > :deep(button) {
  @apply m-0 w-full h-full justify-center;
  > span {
    @apply w-6 h-6
  }
  &:hover {
    @apply bg-transparent
  }
}

a {
  
  @apply flex max-w-[56px] select-none opacity-100;
  transition: .5s;

  img {
    @apply flex p-3 h-[56px] mt-[.4em] mb-[.4em] w-full;
  }

}
</style>