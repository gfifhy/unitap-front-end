<script setup>

const loading = ref(true)
const guard = useSecurityGuardStore()
const emit = defineEmits(['onClose'])

const f = ref({
	violation_id: '',
	violator_id: '',
	note: '',
	violator_sel: '',
})

const violatorSelectorModal = ref(false)
const violationTypes = ref([
  {
    id: '05fa631d-f00f-4f76-9dd4-66182ef26051',
    label: 'Fighting',
    icon: ''
  },
])
const violation_sel = ref(violationTypes.value[0])

const setViolationType = v => {
  f.value.violation_id = violation_sel.value.id
}

const setViolators = v => {

  if (v[0] === 'all') {

    f.value.violator_id = ['all']
    f.value.violator_sel = 'all users'

  } else {

    const selection_arr = []
    
    if (v[0].id === 2) {
      v = v.slice(1)
    }

    f.value.violator_id = v.map(i => {
      selection_arr.push(`${i.first_name} ${i.last_name}`)
      return i.id
    })

    f.value.violator_sel = selection_arr.join('; ')

  }

  violatorSelectorModal.value = false

}

const validate = state => {
  return validateForm(state, [
    //'id','role','first_name','last_name','email'
  ])
}

async function submit() {

  loading.value = true

  const { err } = await guard.addUserViolation(f.value)

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
      description: `Added new violation for ${f.value.violator_sel}.`
    })
    emit('onClose')
  }

  loading.value = false

}


onMounted(async () => {

	violationTypes.value = await guard.getViolations()
	setViolationType()

  loading.value = false

})

</script>

<template>

<UForm class="user" :validate="validate" :validateOn="['submit']" :state="f" @submit="submit">

<UCard>

  <template #header>
    <div class="flex justify-between">
      <span class="text-xl">Attach Violation</span>
      <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="emit('onClose')" />
    </div>
  </template>

  <div class="sbs">
    <div>
      <FormLabel label="Type"/>
      <USelectMenu v-model="violation_sel" :options="violationTypes" @change="setViolationType" size="xl" />
    </div>
    <FormInput placeholder="Student" icon="i-tabler-users-plus"
      label="Violators" type="text" name="title" v-model="f.violator_sel"
      @click="violatorSelectorModal = true"
    />
  </div>

  <FormLabel label="Note"/>
  <UTextarea placeholder="Type here other information..." 
    label="Note" type="text" name="note" icon="i-tabler-cursor-text"
    v-model="f.note"
  />

  <template #footer>
    <div class="flex justify-end gap-x-3">
      <ColoredButton type="submit" label="apply" :disabled="loading"/>
    </div>
  </template>
  
</UCard>

</UForm>

<template v-if="violatorSelectorModal">
  <UserSelectorModal :isOpen="violatorSelectorModal" selection="notAll"
    @onClose="setViolators($event)" />
</template>

</template>