<script setup lang="ts">

const $cfg = useAppConfig()

const radio = $cfg.radioYesNo
const notifTypes = $cfg.notif_types
const isOpen = ref(false)
const modalOption = ref(0)
const recipientSelectorModal = ref(false)
const cms = useCMSStore()
const loading = useState('loading', () => false)

const f = ref({
  id: 69420,
  avatar: false,
  type: 'notify',
  target: ['id'],
  event: 'techno deadline',
  description: 'tasgasgasgsagh',
  recipients_sel: '',
  pushDate: '',
  cover: false,
})


const itemTarget = ref({})

const notifList = ref([])
const notifType_sel = ref(notifTypes[0])
const date = ref(new Date)

const setNotifType = v => {
  f.value.type = notifType_sel.value.id
}

const setPushDate = v => {
  f.value.pushDate = date.value.toISOString()
}

const disableCover = () => {
  f.value.cover = false
}

const label = computed(() => 
  date.value.toLocaleDateString('en-us', 
    { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }
  )
)

const openModal = (v, k) => {
  modalOption.value = v

  if (v !== 0) {
    itemTarget.value = notifList.value.find(x => x.id === k)
  }

  isOpen.value = true
}

const setRecipients = v => {

  if (v[0] === 'all') {

    f.value.target = ['all']
    f.value.recipients_sel = 'all users'

  } else {

    const selection_arr = []
    
    if (v[0].id === 2) {
      v = v.slice(1)
    }

    f.value.target = v.map(i => {
      selection_arr.push(`${i.first_name} ${i.last_name}`)
      return i.id
    })

    f.value.recipients_sel = selection_arr.join('; ')

  }

  recipientSelectorModal.value = false

}


const validate = state => {
  return validateForm(state, [
    //'id','role','first_name','last_name','email'
  ])
}

async function submit() {

  loading.value = true

  const report = (err, succmessage) => {

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
        description: succmessage
      })
      isOpen.value = false
    }

  }

  let err = null;

  switch (modalOption.value) {

    case 0:

      ({ err } = await cms.addNotification(f.value));
      report(err, `New notification ${f.value.event} for ${f.value.recipients_sel}.`);
      break;

    case 1:
      ({ err } = await cms.deleteNotification(itemTarget.value.id));
      delete notifList.value.find(x => x.id === itemTarget.value.id)
      report(err, `Deleted ${itemTarget.value.event}.`);
      break;

  }

  loading.value = false
}


onMounted(async () => {

  notifList.value = await cms.getNotifications()

  setPushDate()

})

</script>

<template>

<div id='actions'>
  <div>
    <h3>Push Notifications</h3>
  </div>
  <div class="buttons">

    <UButton label="New" icon="i-tabler-file-plus"
      @click="openModal(0)"/>

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
  <template v-for="i in notifList" v-if="notifList">

    <NotificationEntry
      :cover="i.img"
      :avatar="i.avatar"
      :label="i.event" 
      :type="i.type"
      :dateCreated="i.dateCreated" 
      :target="i.target.first_name +' '+ i.target.last_name"
      :pushDate="relativeTime(i.pushDate)" 
      :agent="i.agent.first_name +' '+ i.agent.last_name" 
      @onNotifCancel="openModal(1, i.id)"
      @onNotifEdit="openModal(2, i.id)"
    />

  </template>

  
</div>

<template v-if="recipientSelectorModal">
  <UserSelectorModal :isOpen="recipientSelectorModal"
    @onClose="setRecipients($event)" />
</template>

<UModal v-model="isOpen" :transition="false" prevent-close>
  <UForm class="user" :validate="validate" :validateOn="['submit']" :state="f" @submit="submit">

  <UCard v-if="modalOption === 0 || modalOption === 2">
    <template #header>
      <div class="flex justify-between">
        <span class="text-xl">{{ modalOption === 0 ? 'Create' : 'Edit' }} Notification</span>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isOpen = false" />
      </div>
    </template>

    <div class="sbs">
      <div>
        <FormLabel label="Type"/>
        <USelectMenu v-model="notifType_sel" :options="notifTypes" @change="setNotifType" id="role">
          <template #label>
            <UIcon v-if="notifType_sel.icon" :name="notifType_sel.icon" class="w-5 h-5" />
            {{ notifType_sel.label }}
          </template>
        </USelectMenu>
      </div>
      <div v-if="f.pushDate">
        <FormLabel label="Push on"/>
        <UPopover :popper="{ placement: 'bottom-start' }">
          <UButton icon="i-heroicons-calendar-days-20-solid" :label="label" />
          <template #panel>
            <LazyDatePicker v-model="date" 
              @onClose="setPushDate" :input-debounce="500" />
          </template>
        </UPopover>
      </div>
    </div>
    <FormInput placeholder="Recipient" icon="i-tabler-users-plus"
      label="Send to" type="text" name="title" v-model="f.recipients_sel"
      @click="recipientSelectorModal = true"
    />
    <FormInput placeholder="Title" icon="i-tabler-cursor-text"
      label="Notification" type="text" name="subtitle"
      v-model="f.event"
    />
    <UTextarea placeholder="Description" icon="i-tabler-cursor-text"
      label="Description" type="text" name="description"
      v-model="f.description"
    />
    <URadioGroup legend="Cover image" :options="radio"
        v-model="f.cover" v-if="!f.cover"
    />
    <div class="flex gap-x-3 items-center py-2" v-else>

      <UButton icon="i-heroicons-x-mark-20-solid" variant="ghost"
        @click="disableCover" />

      <FilePicker label="Cover" v-model="f.img"
        @onFileSelect="f.imgurl = $event" v-if="f.cover" />

    </div>

    <UNotification
      class="bg-cover bg-center"
      :style="{backgroundImage: `linear-gradient(0deg, #000a, #000a), url(${f.imgurl})`}"
      :actions="[]/*[{ variant: 'solid', color: 'primary', label: 'Action', click: () => alert('ssvkjsv') }]*/"
      :avatar="{ src: useAuthStore().user.user_image }"
      :title="f.event"
      :description="f.description"
      :timeout="0"
    />

    <template #footer>
      <div class="flex justify-end gap-x-3">
        <ColoredButton type="submit" label="apply" :disabled="loading"/>
      </div>
    </template>
    
  </UCard>

  <UCard v-if="modalOption === 1">
    <template #header>
      <span class="text-xl">Confirmation</span>
    </template>

    <p>Are you sure you want to cancel this notification? <br><br> <i>{{ itemTarget.event }}</i></p>

    <template #footer>
      <div class="flex justify-center gap-x-3">
        <UButton name="delete" color="red" label="Yes" variant="ghost" @click="submit()" />
        <UButton label="No" @click="isOpen = false"/>
      </div>
    </template>
    
  </UCard>

  </UForm>
</UModal>

</template>