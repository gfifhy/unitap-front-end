<template>

  <UCard id='i-entry'>

    <USkeleton id='img'/>

    <template #footer>
      <USkeleton id='name' class="h-4 w-[160px]" />
      <USkeleton id='price' class="h-8 w-[60px]" />
    </template>

  </UCard>

</template>

<style scoped>

#i-entry {

  @apply h-[320px];

  > :deep(div:first-of-type) {
    @apply p-0 h-[230px] overflow-hidden;
    > div {
      @apply object-cover h-full w-full
    }
  }

  > :deep(div:last-child) {
    @apply flex flex-col gap-y-2;
  }

}

</style>