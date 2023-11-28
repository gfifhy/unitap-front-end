<script setup lang="ts">

const f = ref({
  email: 'umakadmin.1972@umak.edu.ph',
  password: 'UmakAdmin@#1972!',
})

const validate = state => {
  return validateForm(state, [
    'email','password'
  ])
}

const toast = useToast()
const account = useAuthStore()

const waLoading = useState('waLoading', () => false)
const loading = useState('loading', () => false)

async function submit() {

  loading.value = true

  const res = await account.login(f.value)

  if (res) {  
    toast.add({
      icon: 'i-heroicons-shield-exclamation-solid',
      title: res,
      description: 'Please try again.',
      color: red
    })
  } else {
    toast.add({ 
      icon: 'i-heroicons-check-circle-20-solid',
      title: 'Successfully logged in.', 
      timeout: 3000,
    })
  }
  loading.value = false
  
}

async function webauth() {

  waLoading.value = true

  const res = await account.wLogin(f.value.email)

  if (res) {
    toast.add({ 
      icon: 'i-heroicons-information-circle-20-solid',
      title: 'Operation (probably) cancelled.', 
      description: res,
    })
  } else {
    toast.add({ 
      icon: 'i-heroicons-check-circle-20-solid',
      title: 'Successfully logged in.', 
      timeout: 3000,
    })
  }
  waLoading.value = false

}

</script>

<template>

  <UForm class="user" :validate="validate" :validateOn="['submit']" :state="f" @submit="submit">

    <FormInput type="text" name="username" placeholder="Username"
      icon="i-heroicons-user-20-solid"
      v-model="f.email"
    />
    <FormInput type="password" name="password" placeholder="Password"
      icon="i-heroicons-key-20-solid"
      v-model="f.password"
    />
    <section class='misc text-right'>
      <NuxtLink to="/">recover account</NuxtLink>
    </section>

    <footer>
      <UButton 
        label="use passkey"
        variant="ghost" icon="i-heroicons-finger-print"
        @click="webauth" :loading="waLoading" :disabled="loading"
      />
      <ColoredButton label="login" type="submit" :disabled="loading || waLoading"/>
    </footer>

  </UForm>
  
</template>