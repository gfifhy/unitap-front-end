<script setup lang="ts">

import { validateForm } from '~/helpers/validateForm'

const tabs = [
  {
    key: 'account',
    label: 'Account'
  },
  {
    key: 'wallet',
    label: 'Wallet'
  }
]

const roles = useAppConfig().user_roles

const radio = [
  {
    value: 1,
    label: 'Yes'
  },
  {
    value: 0,
    label: 'No'
  }
]

const emit = defineEmits(["update-user"])
const props = defineProps<{ targetUser: any }>()
const prop_target = computed(() => props.targetUser); 
const target = ref()

const users = useUsersStore()
const wallet = ref()

const f = ref({})
const s = ref({})

const toast = useToast()
const loading = useState('loading', () => false)

const role_sel = ref(roles[0])
const setRole = () => {
  f.value = {
    ...f.value, 
    role: {
      name: role_sel.value.label,
      slug: role_sel.value.id
    }
  }
}

const validate = (state) => {
  return validateForm(state, [
    'id','role','first_name','last_name','email'
  ])
}

const onTab = async () => {
  if (!wallet.value) {
    wallet.value = await users.fetchUsers(target.value.id)
    s.value = { ...wallet.value }
  }
}

onMounted(() => {

  const user = JSON.parse(JSON.stringify(prop_target.value))

  target.value = user

  f.value = { ...user }

  role_sel.value = roles[roles.findIndex(arr => arr.id === user.role.slug)]

})

async function submit(e) {

  loading.value = true

  delete f.value.user_image
  delete f.value.user_signature
  delete f.value.middle_name

  if (e === 'account') {
    const { res, err } = await users.editUser(f.value, "PUT")
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
        title: "User updated!",
        description: `Updated info for ${res.email}`,
      })
      emit('update-user', { ...res })
    }
    loading.value = false
  }

}

async function accDelete() {

  loading.value = true

  const { res, err } = await users.editUser(target.value.id, 'DELETE')
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
      description: `Deleted ${target.value.first_name +' '+ target.value.last_name}`
    })
    emit('update-user', { ...res })
  }
  loading.value = false

}

async function test() {
  console.log(JSON.parse(JSON.stringify(wallet.value)));
}

</script>

<template>  <UTabs :items="tabs" class="w-full" @change="onTab">  <template #item="{ item }">

<UForm class="user" :validate="validate" :state="f" @submit="submit(item.key)">

  <template v-if="item.key === 'account'" class="space-y-3">

    <div class='sbs'>
      <FormInput
        type="text" name="id"
        icon="i-heroicons-tag-20-solid"
        v-model="f.id" disabled />
      <USelectMenu v-model="role_sel" :options="roles" @change="setRole">
        <template #label>
          <UIcon v-if="role_sel.icon" :name="role_sel.icon" class="w-4 h-4" />
          {{ role_sel.label }}
        </template>
      </USelectMenu>
    </div>

    <FormInput placeholder="Samuelo"
      label="First name" type="text" name="first_name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.first_name"
    />
    <FormInput placeholder="Buelo"
      label="Last name" type="text" name="last_name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.last_name"
    />
    <FormInput placeholder="samuelo@example.com"
      label="E-mail address" type="text" name="email"
      icon="i-heroicons-at-symbol-20-solid"
      v-model="f.email"
    />
    <FormInput placeholder="09xxx--x"
      label="Contact #" type="number" name="contact"
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.contact_number"
    />

  </template>

  <template v-else-if="item.key === 'wallet'" class="space-y-3">

    <FormInput placeholder="K6942069"
      label="Student ID" type="text" name="student_id"
      icon="i-heroicons-identification-20-solid"
      v-model="s.student_id"
    />
    <FormInput placeholder="Balance"
      label="Balance" type="number" name="balance"
      icon="i-heroicons-banknotes-20-solid"
      v-model="s.balance"
    />
    <URadioGroup v-model="s.disabled" legend="Disabled" :options="radio" />

  </template>

  <footer>
    <UButton 
      label="Delete User" name="delete"
      variant="ghost"
      icon="i-heroicons-user-minus" 
      @click="accDelete" :disabled="loading"
    />
    <UButton 
      label="test"
      variant="ghost"
      icon="i-heroicons-beaker" 
      @click="test" :disabled="loading"
    />
    <ColoredButton type="submit" label="apply" :disabled="loading"/>
  </footer>


</UForm>

</template></UTabs></template>


<style scoped>

button[name="delete"] {
  @apply text-rose-600;
  &:hover {
    @apply bg-rose-600/10
  }
}

</style>