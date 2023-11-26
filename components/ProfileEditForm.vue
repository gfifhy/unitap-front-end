<script setup lang="ts">

import { validateForm } from '~/helpers/validateForm'

const f = ref({
  first_name: '',
  last_name: '',
  email: '',
  contact: '',
  password: '',
})


//const users = useUsersStore()
//const toast = useToast()
const loading = useState('loading', () => false)
const waLoading = useState('waLoading', () => false)
const verifyModal = ref(false)

const validate = (state) => {
  return validateForm(state, [
    'first_name','last_name','email','contact'
  ])
}

onMounted(() => {

})

async function webauth() {
  waLoading.value = true
  waLoading.value = false
}
async function submit() {

  loading.value = true
/*
  const { res, err } = await users.editProfile(f.value, "PUT")
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
      title: "Profile updated!",
      description: `Updated info for ${res.email}`,
    })
  }
*/
  loading.value = false
  verifyModal.value = false

}

async function test() {
  console.log('ass');
}

</script>

<template>

<UForm class="user" :validate="validate" :state="f" @submit="submit">
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
  <footer>
    <ColoredButton label="save" @click="verifyModal = true" />
  </footer>

  <UModal v-model="verifyModal">
    <UCard>

      <template #header>
        Verify
      </template>

      <FormInput type="password" name="password" placeholder="Password"
        icon="i-heroicons-key-20-solid"
        v-model="f.password"
      />

      <template #footer><footer>
        <UButton 
          label="use passkey instead"
          variant="ghost" icon="i-heroicons-finger-print"
          @click="webauth" :loading="waLoading" :disabled="loading"
        />
        <ColoredButton label="ok" type="submit" :disabled="loading || waLoading"/>
      </footer></template>

    </UCard>
  </UModal>

</UForm>

</template>


<style scoped>

form {
  @apply w-full
}

form.user > footer { @apply justify-end }

footer { @apply flex justify-between }

</style>