<script setup lang="ts">

import type {
  FormError
} from '@nuxt/ui/dist/runtime/types'

const f = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name)
    errors.push({ path: 'name', message: 'Required' })
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  if (!state.password)
    errors.push({ path: 'password', message: 'Required' })
  if (!state.password_confirmation)
    errors.push({ path: 'password_confirmation', message: 'Required' })
  return errors
}

async function webauth() {
  console.log('ass');
}

async function submit() {

  const { error } = await useAuthStore().register(f.value)

  if(!error.value) { navigateTo("/") } else { console.log(error) }

}
</script>

<template>
  <header>
    <p>Login</p>
  </header>

  <UForm :validate="validate" :state="f" @submit.prevent="submit">

    <UInput type="text" v-model="f.name"
      name="name" placeholder="Name"
      icon="i-heroicons-identification-20-solid" size="lg" color="white" :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton v-show="f.name !== ''" @click="f.name = ''"
          icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" :padded="false" tabindex="-1" />
      </template>
    </UInput>

    <UInput type="text" v-model="f.email"
      name="email" placeholder="E-mail address"
      icon="i-heroicons-at-symbol-20-solid" size="lg" color="white" :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton v-show="f.email !== ''" @click="f.email = ''"
          icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" :padded="false" tabindex="-1" />
      </template>
    </UInput>

    <UInput type="password" v-model="f.password"
      name="password" placeholder="Password"
      icon="i-heroicons-key-20-solid" size="lg" color="white" :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton v-show="f.password !== ''" @click="f.password = ''"
          icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" :padded="false" tabindex="-1" />
      </template>
    </UInput>

    <UInput type="password" v-model="f.password_confirmation"
      name="password_confirmation" placeholder="Retype password"
      icon="i-heroicons-hashtag-20-solid" size="lg" color="white" :ui="{ icon: { trailing: { pointer: '' } } }">
      <template #trailing>
        <UButton v-show="f.password_confirmation !== ''" @click="f.password_confirmation = ''"
          icon="i-heroicons-x-mark-20-solid" color="gray" variant="link" :padded="false" tabindex="-1" />
      </template>
    </UInput>
    
    <UButton icon="i-heroicons-finger-print" @click="webauth">Set Passkey</UButton>

    <UFormGroup>
      <UButton type="submit">Register</UButton>
    </UFormGroup>

  </UForm>
</template>
