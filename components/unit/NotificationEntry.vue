<script setup>

const props = defineProps({
  cover: String,
  avatar: String,
  type: String,
  agent: String,
  target: String,
  label: String,
  pushDate: Array,
})

const emit = defineEmits(['onNotifCancel', 'onNotifEdit'])

const onNotifCancel = () => {
  emit('onNotifCancel')
}
const onNotifEdit = () => {
  emit('onNotifEdit')
}

</script>

<template>
<div class="md:flex md:gap-x-3 md:justify-between p-4 overflow-hidden rounded-lg divide-y divide-gray-200 dark:divide-gray-800 ring-1 ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-gray-900 bg-center bg-cover"
  :style="{backgroundImage: cover ? `linear-gradient(0deg, var(--foreground), var(--foreground)), url(${useAppConfig().api.head + cover})` : false }">
  <section class="flex gap-x-3 items-center pb-4 md:pb-0">
    <div class="flex items-center gap-x-3">
      <UAvatar id="avatar" size="xl" :src="avatar" v-if="avatar" />
      <UAvatar id="avatar" size="xl" icon="i-tabler-user-pentagon" v-else />
      <UIcon id='icon' :name="type === 'push' ? 'i-tabler-arrow-big-left-lines-filled' : ''" />
    </div>
    <div>
      <section class="flex flex-col">
        <span>"{{ label }}"</span>
        <span>to <b>{{ target === 'null null' ? 'all users' : target }}</b></span>
      </section>
    </div>
  </section>
  <section class="pt-2 md:pb-0 text-right flex items-center justify-between">
    <div class="flex flex-col w-full">
      <span>{{ pushDate[1] ? 'Pushed' : 'Push by' }} {{ pushDate[0] }}</span>
      <span>from <b>{{ agent }}</b></span>
    </div>
    <div v-if="!pushDate[1]">
      <!--Button variant="ghost" icon="i-heroicons-pencil-square-20-solid"
        @click="onNotifEdit"
      /-->
      <UButton color="red" variant="ghost" icon="i-tabler-trash-x-filled" 
        @click.prevent="onNotifCancel" />
    </div>
  </section>
</div>
</template>
