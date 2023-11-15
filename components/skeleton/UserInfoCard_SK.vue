<template>
  <UCard id='u-entry'>
    <USkeleton id='edit'/>
    <USkeleton id='avatar' class="h-20 w-20" :ui="{ rounded: 'rounded-full' }" />
    <template #footer>
      <USkeleton class="mb-1 w-[90%]" />
      <USkeleton class="w-[60%]" />
    </template>
  </UCard>
</template>