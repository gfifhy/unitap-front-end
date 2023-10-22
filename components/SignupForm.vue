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

    <UFormGroup size="xl" label="Name">
      <FormInput type="text" name="name" placeholder="Samuelo Buelo"
        icon="i-heroicons-identification-20-solid"
        :modelValue="f.email"/>
    </UFormGroup>

    <UFormGroup size="xl" label="E-mail address">
      <FormInput type="text" name="email" placeholder="samuelo@example.com"
        icon="i-heroicons-at-symbol-20-solid"
        :modelValue="f.email"/>
    </UFormGroup>

    <UFormGroup size="xl" label="Password" hint="at least 8 characters">
      <FormInput type="password" name="password" placeholder="a-z, A-Z, 0-9, !@#$~"
        icon="i-heroicons-key-20-solid"
        :modelValue="f.email"/>
    </UFormGroup>

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