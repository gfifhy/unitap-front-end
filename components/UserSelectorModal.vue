<script setup lang="ts">

const columns = [{
  key: 'last_name',
  label: 'Last Name'
}, {
  key: 'first_name',
  label: 'First Name'
}, {
  key: 'role_name',
  label: 'Role'
}, {
  key: 'email',
  label: 'Email'
}]

const allUsers = ref([{
  id: 0,
  name: '',
  title: '',
  email: '',
  role: 'r'
}, {
  id: 2,
  name: '',
  title: '',
  email: '',
  role: 'n'
}])

const emit = defineEmits(['onClose'])
const props = defineProps<{ isOpen: any, selection: String }>()
const prop_target = computed(() => props.isOpen); 

const loading = ref(true)

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return allUsers.value
  }

  return allUsers.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const selected = ref([allUsers.value[1]])

const select = row => {
  const index = selected.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    if (props.selection == 'onlyOne') {
      emit('onClose', row)
    } else {
      selected.value.push(row)
    }
  } else {
    selected.value.splice(index, 1)
  }
}


onMounted(async () => {

  const role = useAuthStore().user?.role.slug

	allUsers.value = (await useUsersStore().getAllUsers(false, role)).map(i => ({
	  ...i,
	  role_name: i.role.name,
	  role_slug: i.role.slug,
	  user_image: null,
	  user_signature: null,
	}));

	loading.value = false

})

</script>

<template>

<UModal :modelValue="prop_target" :transition="false" prevent-close>
  <div class="flex justify-between px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <div class="flex gap-x-3">
      <ButtonTooltip text="Clear Text" 
        variant="ghost" color="gray" icon="i-heroicons-x-mark"
        @click="q = ''" v-show="q !== ''" />
      <UInput v-model="q" placeholder="Search..." />
      <ButtonTooltip text="Select All" 
        color="gray" variant="ghost" icon="i-tabler-select-all"
        @click="emit('onClose', ['all'])"
        v-if="!(selection == 'notAll' || selection == 'onlyOne')" />
    </div>
    <div>
      <ButtonTooltip text="Confirm Selection" 
        color="gray" variant="ghost" icon="i-heroicons-check-20-solid"
        @click="emit('onClose', selected)"
        v-if="!(selection == 'onlyOne')" />
      
    </div>
  </div>
  <div class="max-h-[70vh] overflow-y-auto">
    <UTable id="user-list"
      v-model="selected"
      :rows="filteredRows" :columns="columns" 
      @select="select"
      :loading="loading"
      :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
    />
  </div>
</UModal>

</template>


<style scoped>

#user-list :deep(td input) {
	pointer-events: none;
}

</style>