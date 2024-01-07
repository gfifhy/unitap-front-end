<script setup>
  
const guard = useSecurityGuardStore()
const toast = useToast()
const loading = ref(true)
const isOpen = ref(false)

const locations = ref([
  {
    id: '231eeaaa-28a5-409e-b1f4-e5c2f27b93fc',
    label: 'Admin Building',
    icon: ''
  },
])

const location_sel = ref(locations.value[0])

async function setLocation() {

  loading.value = true

  const { res, err } = await guard.updateLocation(location_sel.value.id)

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
      title: 'Location changed!',
      description: `Changed location to ${location_sel.value.label}`
    })
    loading.value = false
  }

}

const columns = [{
  key: 'violation',
  label: 'Violation'
}, {
  key: 'violator',
  label: 'Violator'
}, {
  key: 'note',
  label: 'Note'
}, {
  key: 'status',
  label: 'Status'
}, {
  key: 'date',
  label: 'Date'
}]

const userViolations = ref([])

const q = ref('')

const filteredRows = computed(() => {

  function timeConvert(arr) {
    return arr.map((el) => ({
      violation: el.violation,
      violator: el.violator,
      date: relativeTime(el.date)[0],
      status: el.status,
      note: el.note
    }));
  }

  if (!q.value) {
    return timeConvert(userViolations.value)
  }

  return timeConvert(userViolations.value.filter((v) => {
    return Object.values(v).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  }))


})

let ndef = null
const busyNDEF = ref(true)
const isScanning = ref(false)

async function startNFCcardScan() {

  const toastErrorNDEF = desc => {
    toast.add({
      icon: 'i-tabler-exclamation-circle',
      title: 'NFC card reading error.',
      color: 'orange',
      timeout: 10000,
      description: desc
    })
  }

  if (!ndef) {
    try {
      ndef = new NDEFReader()
    } catch (e) { 
      console.warn(e)
      toastErrorNDEF('This device or browser has no NFC scanner support.\n' + e)
      busyNDEF.value = false 
      return
    }
  } else { await ndef.stop() }

  isScanning.value = true

  const toastUserScanned = (person = "Manny Pacquiao") => {
    toast.add({
      icon: 'i-tabler-user-scan',
      title: `Recognized ${person}`
    })
  }

  try {

    await ndef.scan();

    ndef.addEventListener("readingerror", () => {
      console.error('NDEFReader: readingerror')
      toastErrorNDEF()
    });

    ndef.addEventListener("reading", async ({ message, serialNumber }) => {

      busyNDEF.value = true

      const [user_id, nfc_id] = message.records.map((record) => [
        (new TextDecoder()).decode(record.data),
        serialNumber,
      ]).flat()

      const res = await guard.studentEntry([user_id, nfc_id])
      toastUserScanned(res.student_user.first_name +' '+ res.student_user.last_name)

      busyNDEF.value = false

    });

  } catch (e) { console.error(e); toastErrorNDEF(e) } finally {

    await ndef.stop()
    isScanning.value = false

  }

}

onMounted(async () => {

  userViolations.value = await guard.getUserViolations()

  locations.value = await guard.getLocations()
  
  location_sel.value = locations.value
    .find(e => e.id === useAuthStore().identity.location_id)

  startNFCcardScan()

  loading.value = false

})

</script>



<template><div id='guard'>

<div id="double">

  <div class="w-full">
    <div id='actions'>
      <div>
        <h3>Current Location</h3>
      </div>
    </div>

    <section id='student-entry'>
      <div class="flex flex-col items-center gap-y-3">
        <span class="text-gray-700 dark:text-gray-500">Currently located at</span>
        <i class="i-tabler-map-pin w-14 h-14 text-gray-500" />

        <span>
          <USelectMenu v-model="location_sel" :disabled="loading" class="min-w-[200px]"
            :options="locations" @change="setLocation" size="xl" />
        </span>
      </div>
    </section>
  </div>


  <div class="min-w-[340px]">
    <div id='actions'>
      <div>
        <h3>Student Entry</h3>
      </div>
      <div class="buttons">
        <UPopover mode="hover">

          <UButton variant="soft" icon="i-heroicons-ellipsis-vertical-20-solid" 
            @click="" />

          <template #panel>
            <div class="ctxmenu">

              <UButton variant="ghost" icon="i-heroicons-beaker-solid"
                label="Restart scanning" 
                @click="startNFCcardScan" />

            </div>
          </template>

        </UPopover>
      </div>
    </div>

    <section id='student-entry'>
      <div class="flex flex-col items-center gap-y-3">

        <EosIconsThreeDotsLoading class="w-14 h-14 text-gray-500" v-show="busyNDEF"/>
        <i class="w-14 h-14 text-gray-500" v-show="!busyNDEF && isScanning"
          :class="isScanning ? 'i-tabler-zoom-scan' : 'i-tabler-border-corners'" />

        <span class="text-gray-500" 
          v-show="!busyNDEF && isScanning">Currently scanning...</span>

        <template v-if="!busyNDEF && !isScanning">
          <i class="i-tabler-mood-sad w-14 h-14 text-gray-500"/>
          <span class="dark:text-red-800 text-red-400" >No NFC scanner supported.</span>        
        </template>

      </div>
    </section>
  </div>

</div>



<div id='actions'>
  <div>
    <h3>Violation list</h3>
  </div>
  <div class="buttons">
    <UButton label="New violation" icon="i-heroicons-plus-circle-20-solid"
      @click="isOpen = true" />
  </div>
</div>
<section id='violations-list'>

  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <ButtonTooltip text="Clear Text" 
      variant="ghost" color="gray" icon="i-heroicons-x-mark"
      @click="q = ''" v-show="q !== ''" />
    <UInput v-model="q" placeholder="Search..." />
  </div>

  <div class="max-h-[70vh] overflow-y-auto">
    <UTable id="user-list"
      :rows="filteredRows" :columns="columns" 
      :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    />
  </div>

</section>

<UModal v-model="isOpen" :transition="false" prevent-close>
  <StudentViolationForm @onClose="isOpen = false" />
</UModal>

</div></template>



<style scoped>

:deep(#actions) {
  
  @apply flex flex-wrap items-center justify-between;
  
  > div {

    @apply flex items-center m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}


</style>