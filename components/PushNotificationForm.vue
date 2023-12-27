<script setup>

const toast = useToast()
const isOpen = ref(false)
const loading = useState('loading', () => false)

const f = ref([])
const delTarget = ref('')

const onNotifCancel = v => {
  delTarget.value = f.value.find(x => x.id === v)?.title
  isOpen.value = true
}


async function notificationEdit(v) {
  console.log(v)
}
async function notificationCancel() {
/*
  loading.value = true

  const { res, err } = await cms.deleteArticle(target.value.id, 'DELETE')
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
      title: 'Successfully deleted!',
      description: `Deleted ${f.value.title}`
    })
  }

  loading.value = false
*/
  isOpen.value = false
}


onMounted(() => {
  f.value = [
    {
      id: 69420,
      avatar: false,
      type: 'push',
      agent: 'agent',
      target: 'target',
      title: 'techno deadline',
      dateCreated: '69/420/360',
      pushDate: '12/31/23',
    },
    {
      id: 83259,
      avatar: false,
      type: 'push',
      agent: 'agent',
      target: 'target',
      title: 'ias2 deadline',
      dateCreated: '12/32/23',
      pushDate: '12/31/23',
    },
  ]
})

</script>

<template>

<div id='actions'>
  <div>
    <h3>Push Notifications</h3>
  </div>
  <div class="buttons">

    <UButton label="New" icon="i-tabler-file-plus"
      @click="navigateTo('/myshop')"/>

    <UPopover mode="hover">

      <UButton variant="soft" icon="i-heroicons-ellipsis-vertical-20-solid" 
        @click="" />

      <template #panel>
        <div class="ctxmenu">
          
          <UButton variant="ghost" icon="i-heroicons-beaker-solid"
            label="Test" 
            @click="" />

        </div>
      </template>

    </UPopover>
  </div>
</div>

<div id="interface">
  <template v-for="i in f">
    <NotificationEntry :label="i.title" :pushDate="i.pushDate" :type="i.type"
      :dateCreated="i.dateCreated" :agent="i.agent" :target="i.target"
      @onNotifCancel="onNotifCancel(i.id)" @onNotifEdit="notificationEdit(i.id)"/>
  </template>

</div>

<UModal v-model="isOpen" :transition="false">
  <UCard>
    <template #header>
      <span class="text-xl">Confirmation</span>
    </template>

    <p>Are you sure you want to cancel this notification? <br><br> <i>{{ delTarget }}</i></p>

    <template #footer>
      <div class="flex justify-center gap-x-3">
        <UButton name="delete" color="red" label="Yes" variant="ghost" @click="notificationCancel" />
        <UButton label="No" @click="isOpen = false"/>
      </div>
    </template>
    
  </UCard>
</UModal>

</template>