<script setup>

const $cfg = useAppConfig()
const cms = useCMSStore()
const loading = ref(true)
/*
const actions = i => {
  return [
    { variant: 'solid', color: 'primary', label: 'Action', click: () => alert(i) },
    { variant: 'soft', color: 'primary', label: 'Action', click: () => alert('bsabsabs') }
  ]
}
*/
const notifList = ref([])
const containsUnread = ref(false)


const closeButton = ref({})
const newMode = ref(true)

const switchNotifMode = () => {
  newMode.value = !newMode.value
  toggleCloseButtonVisibility()
}


const checkUnreads = () => {
  console.warn(notifList.value.some((item) => !item.isRead && !item.all))
  return notifList.value.some((item) => !item.isRead && !item.all);
}

const toggleCloseButtonVisibility = () => {
  if (newMode.value) {
    closeButton.value = { icon: 'i-tabler-input-check', color: 'gray', variant: 'outline', padded: true, size: '2xs', ui: { rounded: 'rounded-full' } }  
  } else {
    closeButton.value = null
  }
}

async function refresh(b = false) {
  loading.value = true
  notifList.value = await cms.getMyNotifications(b, 'my')
  containsUnread.value = checkUnreads()
  loading.value = false
}

async function markRead(v) {
  
  loading.value = true

  const { err } = await cms.markNotification(v)

  const toast = useToast()

  if (err) {
    toast.add({
      icon: "i-heroicons-exclamation-circle-20-solid",
      title: 'Operation failed!',
      description: err.message.join('; '),
      color: 'red'
    })
  } else {
    toast.add({
      icon: "i-heroicons-check-circle-20-solid",
      title: 'Operation successful!',
      description: 'Notification has been marked as read.'
    })
    refresh(true)
  }

  loading.value = false

}

onMounted(async () => {

  toggleCloseButtonVisibility()

  await refresh()

  loading.value = false
})

</script>

<template><div id="notifications" class="p-2 m-2">

<div id='actions' class="px-2">
  <div>
    <h4>Notifications</h4>
  </div>
  <div class="buttons">

    <ButtonTooltip variant="soft"
      :text="newMode ? 'View read notifications' : 'View new notifications'"
      :icon="newMode ? 'i-tabler-archive-filled' : 'i-tabler-notification'"
      @click="switchNotifMode"/>

    <ButtonTooltip text="Mark all as read" variant="soft" icon="i-tabler-list-check"
      @click="markRead()"/>

    <ButtonTooltip text="Refresh" icon="i-tabler-reload"
      @click="refresh(true)"/>

  </div>
</div>

<div class="max-h-[49vh] overflow-y-auto space-y-3 overflow-x-hidden p-3" :class="newMode ? 'new' : ''">

<span v-if="newMode && !containsUnread">No new notifications.</span>

<template v-for="i in notifList">
  
  <UNotification
    v-if="!newMode === Boolean(i.isRead) || (i.all && !!i.isReceived)"
    class="notifEntry bg-cover bg-center"
    :class="i.type"
    :data-system-notif-read="i.all && !!i.isReceived"
    :closeButton="closeButton"
    :style="i.img ? {backgroundImage: `linear-gradient(0deg, var(--foreground), var(--foreground)), url(${$cfg.api.head + i.img})`} : false"
    :actions="[]/*actions(i)*/"
    :avatar="{ src: i.avatar }"
    :title="i.event"
    :description="i.description"
    :timeout="0"
    :id="i.id"
    @close="markRead(i.id)"
 >
  <template #title="{ title }">
    <div class="flex flex-col">

      <div class="flex">

        <span class="text-gray-400 w-full truncate">
          {{ i.agent ? i.agent.first_name +' '+ i.agent.last_name : 'System' }}
        </span>

        <span class="dark:text-gray-500 text-gray-300 w-full text-right whitespace-nowrap">
          {{ relativeTime(i.pushDate)[0] }}
        </span>

      </div>

      <span v-html="title" />

    </div>
  </template>

  <template #description="{ description }">
    <span v-html="description" />
  </template>
  
 </UNotification>

</template>


</div>

</div></template>


<style scoped>


#notifications {
  @apply w-[400px] space-y-3;

  :deep(div > span > img) {
    background-color: #0005;
  }
}

.new [data-system-notif-read] {
  display: none;
}

@media only screen and (max-width: 500px) {
  #notifications {
    @apply w-[300px]
  }
}

</style>