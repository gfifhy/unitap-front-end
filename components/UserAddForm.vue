<script setup lang="ts">

import type {
  FormError
} from '@nuxt/ui/dist/runtime/types'

const tabs = [
  {
    key: 'names',
    label: 'Names'
  },
  {
    key: 'contact',
    label: 'Contact'
  },
  {
    key: 'credential',
    label: 'Credential'
  }
]

const roles = useAppConfig().user_roles

const f = ref({
  first_name: 'Samuelo',
  last_name: 'Buelo',
  guardian_first_name: 'Samuelita',
  guardian_last_name: 'Buelo',
  student_id: 'A69420324',
  email: 'minon15384@octovie.com',
  contact: '69649464',
  guardian_contact: '544364535',
  password: 'minon15384',
  password_confirmation: 'minon15384',
  role: {
    name: 'Student',
    slug: 'student',
  }
})

const emit = defineEmits(["update-user"])
const props = defineProps<{ targetUser: any }>()
const prop_target = computed(() => props.targetUser); 
const target = ref()
const wallet = ref()

const toast = useToast()
const users = useUsersStore()

const tabIdx = ref(0)
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

const validate = (state: any): FormError[] => {
  const errors = []
  const fields = ['first_name', 'last_name', 'guardian_first_name', 
    'guardian_last_name', 'student_id', 'email', 'contact',
    'guardian_contact', 'password', 'password_confirmation'
  ]
  const msg = (v) => {
    if (!state[v]) errors.push({ path: v, message: 'Required' })
  }
  for (let i of fields) msg(i)
  return errors
}

async function submit(e) {
  const {res, err} = await users.addStudent(e.data)
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
      title: 'Successfully added!',
      description: `New ${f.value.role.name}, ${f.value.email} added.`
    })
    emit('update-user', { ...f.value })
    f.value = {
      first_name: '',
      last_name: '',
      guardian_first_name: '',
      guardian_last_name: '',
      student_id: '',
      email: '',
      contact: '',
      guardian_contact: '',
      password: '',
      password_confirmation: '',
      role: {
        name: '',
        slug: '',
      }
    }
  }
}

</script>

<template>  <UTabs :items="tabs" class="w-full" v-model="tabIdx">  <template #item="{ item }">

<UForm class="user" :validate="validate" :state="f" @submit="submit">

  <template v-if="item.key === 'names'" class="space-y-3">

    <FormInput placeholder="Samuelo"
      label="First name" name="first_name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.first_name"
    />
    <FormInput placeholder="Buelo"
      label="Last name" name="last_name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.last_name"
    />
    <FormInput placeholder="Samuelita"
      label="Guardian first name" name="guardian_first_name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.guardian_first_name"
    />
    <FormInput placeholder="Buelo"
      label="Guardian last name" name="guardian_last_name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.guardian_last_name"
    />
  </template>

  <template v-else-if="item.key === 'contact'" class="space-y-3">

    <FormInput placeholder="samuelo@example.com"
      label="E-mail address" name="email"
      icon="i-heroicons-at-symbol-20-solid"
      v-model="f.email"
    />
    <FormInput placeholder="09xxx--x"
      label="Contact #" type="number" name="contact"
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.contact"
    />
    <FormInput placeholder="09xxx--x"
      label="Guardian Contact #" type="number" name="guardian_contact"
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.guardian_contact"
    />

  </template>

  <template v-else-if="item.key === 'credential'" class="space-y-3">
    <FormInput placeholder="K6942069"
      label="Student ID" name="student_id"
      icon="i-heroicons-identification-20-solid"
      v-model="f.student_id" :disabled="f.role.slug !== 'student'"
    />
    <USelectMenu v-model="role_sel" :options="roles" @change="setRole">
      <template #label>
        <UIcon v-if="role_sel.icon" :name="role_sel.icon" class="w-4 h-4" />
        {{ role_sel.label }} Role
      </template>
    </USelectMenu>

    <FormInput placeholder="a-z, A-Z, 0-9, !@#$~" hint="at least 8 characters"
      label="Password" type="password" name="password"
      icon="i-heroicons-key-20-solid"
      v-model="f.password"
    />
    <FormInput placeholder="Retype password"
      type="password" name="password_confirmation" 
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.password_confirmation"
    />

  </template>

  <footer>
    <UButton label="Previous" color="gray" leadingIcon="i-heroicons-arrow-left-20-solid"
      @click="tabIdx--" :disabled="tabIdx < 1" />
    <UButton label="Next" color="gray" trailingIcon="i-heroicons-arrow-right-20-solid"
      @click="tabIdx++" v-if="tabIdx < 2" />
    <ColoredButton type="submit" label="add"
      v-else />
  </footer>

</UForm>

</template>  </UTabs>  </template>


<style scoped>

footer {
  height: 4.5rem;
}

</style>