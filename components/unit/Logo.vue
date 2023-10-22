<template>
  <NuxtLink to="/"><img src="/favicon.ico" alt="Unitap logo"></NuxtLink>
</template>

<style scoped>
a {
  
  @apply flex max-w-[56px] select-none;

  img {
    @apply flex p-3 mt-[.4em] mb-[.4em];
    filter: var(--logo-f);
  }

}
</style>