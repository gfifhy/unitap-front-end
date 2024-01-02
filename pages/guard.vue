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

const scannedToast = (person = "Manny Pacquiao") => {

  toast.add({
    icon: 'i-tabler-user-scan',
    title: `Recognized ${person}`
  })

}

async function scan(val) { // POST 'api/security-guard/student-entry'
  //await guard.studentEntry(val)
  scannedToast();
}

onMounted(async () => {

  userViolations.value = await guard.getUserViolations()

  locations.value = await guard.getLocations()
  
  location_sel.value = locations.value
    .find(e => e.id === useAuthStore().identity.location_id)

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
                label="Test" 
                @click="" />

              <UButton variant="ghost" icon="i-heroicons-beaker-solid"
                label="invoke scan" 
                @click="scan" />

            </div>
          </template>

        </UPopover>
      </div>
    </div>

    <section id='student-entry'>
      <div class="flex flex-col items-center gap-y-3">
        <i class="i-tabler-grid-scan w-14 h-14 text-gray-500" />

        <span class="text-gray-500">Currently scanning...</span>
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