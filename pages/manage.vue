<script setup>

useHead({ titleTemplate: 'Management - UniTap' })

definePageMeta({ 
  middleware: 'admin',
})

const userdata = useUsersStore()

const users = ref({})
const loading = ref(true)

onMounted(async () => {
  users.value = await userdata.fetchUsers()
  loading.value = false
})

const isOpen = ref(false)
const targetUser = ref({})
const editMode = ref(true)

const initEdit = (val) => {
  editMode.value = true
  targetUser.value = val
  isOpen.value = true
}

const initAdd = (val) => {
  editMode.value = false
  isOpen.value = true
}

const updateUser = (val) => {
  const egg = [ ...Object.values(users.value) ]
  const index = egg.findIndex(p => p.id == targetUser.value.id)
  users.value = { 
    ...users.value,
    [index]: { ...users.value[index], ...val } 
  }
  console.log(users.value)
  isOpen.value = false
}

</script>


<template><div id='user-management'>

  <section id='actions'>

    <div>
      <h3>Users</h3>
    </div>

    <div class="buttons">
      <ButtonTooltip text="Export to PDF" hotkey="E"
        variant="soft" icon="i-heroicons-arrow-down-on-square-stack-20-solid" 
        @click=""/>
      <UButton label="Add user"
        variant="solid" icon="i-heroicons-user-plus-20-solid"
        @click="initAdd"/>
    </div>

  </section>

  <section id='tiles'>
    <UserInfoCard_SK v-if="loading" 
      v-for="i in 12" :key="i"
    />
    <template v-else v-for="i in users">
      <UserInfoCard v-if="!i?.deleted_at" editButton :user="i" 
        @editClicked="initEdit(i)" />
    </template>
  </section>

  <UModal v-model="isOpen" :transition="false">
    <div class="p-4">
      <UserEditForm v-if="editMode" 
        :targetUser="targetUser" @update-user="updateUser"/>
      <UserAddForm v-else 
        :targetUser="targetUser" @update-user="updateUser"/>
    </div>
  </UModal>

</div></template>


<style scoped>

#actions,
#tiles {
  @apply flex flex-wrap;
}

#actions {
  
  @apply items-center justify-between;
  
  div {

    @apply m-1 pl-2 pr-2;

    button {
      @apply m-2;
    }
  }

}

#tiles {
  @apply 
    mx-auto px-3 max-w-[1366px] grid gap-x-4 gap-y-4
    grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] 
}

</style>