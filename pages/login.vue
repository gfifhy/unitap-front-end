<script setup lang="ts">

import type { 
  FormError
} from '@nuxt/ui/dist/runtime/types'

const f = ref({
  email: 'test@example.com',
  password: 'password',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  return errors
}

async function webauth() {
  console.log('ass');
  
}
async function submit() {

  const account = useAuthStore()

  if (account.isLoggedIn) return

  const {error} = await account.login(f.value)

  if (error.value) { console.warn(error); }
  else { navigateTo('/') }
  
}
</script>

<template>

  <header>
    <p>Login</p>
  </header>

  <UForm
    :validate="validate"
    :state="f"
    @submit.prevent="submit"
  >

    <UInput
      v-model="f.email" name="username"
      type="text" placeholder="Username"
      size="lg" color="white"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      icon="i-heroicons-user-20-solid">
      <template #trailing>
        <UButton
          v-show="f.email !== ''"
          color="gray" variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="f.email = ''"
        />
      </template>
    </UInput>
  
    <UInput
      v-model="f.password" name="password"
      type="password" placeholder="Password"
      size="lg" color="white"
      :ui="{ icon: { trailing: { pointer: '' } } }"
      icon="i-heroicons-key-20-solid">
      <template #trailing>
        <UButton
          v-show="f.password !== ''"
          color="gray"
          variant="link"
          icon="i-heroicons-x-mark-20-solid"
          :padded="false"
          @click="f.password = ''"
        />
      </template>
    </UInput>

    <UFormGroup>
      <UButton type="submit">Login</UButton>
      <UButton 
        size="lg"
        variant="ghost"
        icon="i-heroicons-ticket-20-solid"
        @click="webauth"
      />
    </UFormGroup>

  </UForm>
</template>

<style scoped>
div[id="__nuxt"] {
  @apply flex-col
}
</style>