<script>
export default {
  props: {
    avatar: String,
    type: String,
    agent: String,
    target: String,
    label: String,
    pushDate: String,
  },
  emits: ['onNotifCancel'],
  methods: {
    onNotifCancel() {
      this.$emit('onNotifCancel')
    },
    onNotifEdit() {
      this.$emit('onNotifEdit')
    },
  }
}
</script>

<template>
<div class="p-4 overflow-hidden rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900">
  <section class="flex gap-x-3 items-center pb-4">
    <div class="flex items-center gap-x-3">
      <UAvatar :src="avatar ?? 'https://avatars.githubusercontent.com/u/49358080?v=4'" />
      <UIcon id='icon' :name="type === 'push' ? 'i-tabler-arrow-big-left-lines-filled' : ''" />
    </div>
    <div>
      <section class="flex flex-col">
        <span>"{{ label }}"</span>
        <span>to <b>{{ target }}</b></span>
      </section>
    </div>
  </section>
  <section class="pt-2 flex items-center justify-between">
    <div class="flex flex-col">
      <span>{{ type === 'push' ? 'Push' : 'Pushed' }} by {{ pushDate }}</span>
      <span>from <b>{{ agent }}</b></span>
    </div>
    <div>
      <UButton variant="ghost" icon="i-heroicons-pencil-square-20-solid"
        @click="onNotifEdit"
      />
      <UButton color="red" variant="ghost" icon="i-tabler-trash-x-filled" 
        @click.prevent="onNotifCancel" />
    </div>
  </section>
</div>
</template>

<style scoped>

</style>