<script setup lang="ts">

import type { 
  FormError
} from '@nuxt/ui/dist/runtime/types'

const f = ref({
  email: 'umakadmin.1972@umak.edu.ph',
  password: 'UmakAdmin@#1972!',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  return errors
}

const account = useAuthStore()

async function submit() {

  if (account.isLoggedIn) return

  const {error} = await account.login(f.value)

  if (error.value) { console.warn(error); }
  else { navigateTo('/') }
  
}

async function webauth() {
  const res = await account.wLogin(f.value.email)
  if (res) { console.error(res); }
  else { navigateTo('/') }
}

</script>

<template>

  <UForm class="user" :validate="validate" :state="f" @submit="submit">

    <FormInput type="text" name="username" placeholder="Email"
      icon="i-heroicons-user-20-solid"
      v-model="f.email"  label="Email"
    />
    <FormInput type="password" name="password" placeholder="Password"
      icon="i-heroicons-key-20-solid"
      v-model="f.password" label="Password"
    />
    <section class='misc'>
      <ColoredButton label="Login" type="submit" class="mt-4 mb-6 w-full"/>
      <!--UDivider /--> <hr>
    </section>

    <footer>
      <UButton
        label="use passkey"
        variant="ghost"
        icon="i-heroicons-finger-print"
        @click="webauth"
      />

    </footer>

  </UForm>
  
</template>