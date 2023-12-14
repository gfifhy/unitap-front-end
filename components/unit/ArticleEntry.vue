<script>
export default {
  props: {
    label: String,
    date: String,
  }
}
</script>

<template>
  <NuxtLink to="/article" class="flex gap-3 items-start w-full relative overflow-hidden rounded-lg p-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
    <UAvatar src="https://avatars.githubusercontent.com/u/49358080?v=4" />
    <div class="w-0 flex-1">
      <p class="text-sm font-medium">{{ label }}</p>
      <p class="mt-1 text-sm leading-4 opacity-90">{{ date }}</p>
    </div>
  </NuxtLink>
</template>