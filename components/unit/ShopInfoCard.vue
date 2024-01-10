<script>
export default {
  props: ['img', 'name', 'desc']
}
</script>

<template>

<div class="w-full pointer-events-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg" role="status">
  <div class="relative overflow-hidden rounded-lg ring-1 ring-gray-200 dark:ring-gray-800">
    <div class="p-4">
      <div class="flex gap-3 items-start">
        <UAvatar size="3xl" :src="img" id='avatar'/>
        <div class="w-0 flex-1">
          <p class="text-lg font-medium text-gray-900 dark:text-white overflow-hidden overflow-ellipsis">{{ name }}</p>
          <p class="mt-1 text-sm leading-4 text-gray-500 dark:text-gray-400">{{ desc }}</p>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>

:deep(#avatar) {
  @apply object-cover
}

</style>