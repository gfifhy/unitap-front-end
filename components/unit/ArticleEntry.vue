<script>
export default {
  props: {
    avatar: String,
    label: String,
    date: String,
    link: String,
    del: Boolean,
  },
  emits: ['onDelete'],
  methods: {
    onDelete() {
      this.$emit('onDelete')
    },
  }
}
</script>

<template>
  <NuxtLink :to="link ?? '/'" class="flex gap-3 items-center items-start w-full relative overflow-hidden rounded-lg p-4 text-gray-900 dark:text-white bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
    <UAvatar :src="avatar ?? 'https://avatars.githubusercontent.com/u/49358080?v=4'" />
    <div class="w-0 flex-1">
      <p class="text-sm font-medium truncate">{{ label }}</p>
      <p class="mt-1 text-sm leading-4 opacity-90 truncate">{{ date }} </p>
    </div>
    <div v-if="del">
      <UButton color="red" variant="ghost" icon="i-tabler-trash-x-filled" @click.prevent="onDelete" />
    </div>
  </NuxtLink>
</template>