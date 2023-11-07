<script setup>

definePageMeta({ 
  middleware: 'admin',
})

const userdata = useUsersStore()

const users = ref([])

onMounted(async () => {
  users.value = await userdata.fetchUsers()
})

const isOpen = ref(false)
const targetUser = ref({})
const editMode = ref(true)

function initEdit(val) {
  editMode.value = true
  targetUser.value = val
  isOpen.value = true
}

function initAdd(val) {
  editMode.value = false
  isOpen.value = true
}

function updateUser(val) {
  const egg = [ ...Object.values(users.value) ]
  const index = egg.findIndex(p => p.id == targetUser.value.id)
  users.value = { 
    ...users.value,
    [index]: { ...users.value[index], ...val } 
  }
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

  <section>
    <div id='tiles'><template v-for="i in users">
      <UCard id='entry' v-if="!i.deleted_at">

        <UButton id='edit'
          variant="ghost" icon="i-heroicons-pencil-square-20-solid"
          @click="initEdit(i)"
        />
        <UAvatar id='avatar' :src="i.user_image" size="md" />

        <template #footer>
          <span id='name'>{{i.first_name +' '+i.last_name}}</span>
          <span id='role'>{{i.role?.name}}</span>
        </template>

      </UCard>
    </template></div>
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
  @apply mx-auto px-3 max-w-[1366px] grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-x-4 gap-y-4
}

:deep(#entry) {
  @apply h-[210px];
  --avatar-sz: 6em;
  --edit-pos: absolute;

  div {
    padding: var(--card-p, 1rem);
  }

  > div:first-of-type {
    @apply flex justify-center items-center relative;

    > #edit {
      @apply z-[2] justify-center top-0 right-0 m-2;
      position: var(--edit-pos);
      > span {
        @apply w-6 h-6
      }
    }

    > span {
      @apply h-[var(--avatar-sz)] w-[var(--avatar-sz)];
      img {
        @apply w-full h-full
      }
    }

    + div {
      @apply flex flex-col justify-center;

      #name {
        @apply text-primary-400 truncate
      }

      #role {
        @apply text-gray-400
      }

    }

  }

}

@media (max-width: 521px) {
  #entry {
    --card-p: .4em;
    --avatar-sz: 3em;
    --edit-pos: relative;
    @apply flex flex-row h-[70px]
  }
}
</style>