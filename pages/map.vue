<template>
  <HeatMap class="w-screen"/>
</template>


<style scoped>

#double {

  @apply flex justify-center h-full;

  flex-direction: var(--article-split-dir);

  > aside {
    @apply flex flex-col h-full px-[var(--article-aside-p)];
  }
}

aside > div {
  @apply bg-[var(--l30)] rounded-xl p-4 min-w-[340px];

  ::before {
    @apply m-0
  }
}


</style>