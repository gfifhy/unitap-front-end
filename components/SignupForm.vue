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

async function submit(e: FormSubmitEvent<any>) {

  console.log(e.data)

  //const { error } = await useAuthStore().register(f.value)

  //if(!error.value) { navigateTo("/") } else { console.log(error) }

}

</script>

<template>

  <UForm :validate="validate" :state="f" @submit="submit">
    <FormInput placeholder="Samuelo Buelo"
      label="Name" type="text" name="name"
      icon="i-heroicons-identification-20-solid"
      :modelValue="f.email"
    />
    <FormInput placeholder="samuelo@example.com"
      label="E-mail address" type="text" name="email"
      icon="i-heroicons-at-symbol-20-solid"
      :modelValue="f.email"
    />
    <FormInput placeholder="a-z, A-Z, 0-9, !@#$~" hint="at least 8 characters"
      label="Password" type="password" name="password"
      icon="i-heroicons-key-20-solid"
      :modelValue="f.email"
    />
    <FormInput type="password" name="password_confirmation" placeholder="Retype password"
      icon="i-heroicons-hashtag-20-solid"
      :modelValue="f.email"
    />

    <footer>
      <UButton 
        label="Set Passkey"
        variant="ghost"
        icon="i-heroicons-finger-print" 
        @click="webauth" 
      />
      <ColoredButton type="submit" label="register"/>
    </footer>

  </UForm>

</template>

<style scoped>

form {
  > footer {
    @apply flex justify-between;
    > button:last-child {
      width: 140px
    }
  }
  > div {
    @apply mt-2 mb-2;
  }
}

footer {
  @apply flex p-3
}

</style>