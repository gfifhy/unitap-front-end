<script setup lang="ts">

import type {
  FormError
} from '@nuxt/ui/dist/runtime/types'

const props = defineProps<{ targetUser: any }>()
const prop_target = computed(() => props.targetUser); 
const target = ref()

const f = ref({
  role: '',
  first_name: '',
  last_name: '',
  email: '',
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.name)
    errors.push({ path: 'name', message: 'Required' })
  if (!state.email)
    errors.push({ path: 'email', message: 'Required' })
  return errors
}
async function test() {
  console.log(target.value.id);
}

async function submit(e: FormSubmitEvent<any>) {

  console.log(e.data)

}

onMounted(() => {
  target.value = JSON.parse(JSON.stringify(prop_target.value))
  f.value = {
    role: target?.value.role,
    first_name: target?.value.first_name,
    last_name: target?.value.last_name,
    email: target?.value.email,
  }
})

</script>

<template>

  <UForm class="user" :validate="validate" :state="f" @submit="submit">
    
    <FormInput :placeholder="target?.id"
      label="ID" type="text" name="id"
      icon="i-heroicons-tag-20-solid"
      disabled
    />
    <FormInput placeholder="Samuelo"
      label="First name" type="text" name="name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.first_name"
    />
    <FormInput placeholder="Buelo"
      label="Last name" type="text" name="name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.last_name"
    />
    <FormInput placeholder="samuelo@example.com"
      label="E-mail address" type="text" name="email"
      icon="i-heroicons-at-symbol-20-solid"
      v-model="f.email"
    />

    <footer>
      <UButton 
        label="test"
        variant="ghost"
        icon="i-heroicons-finger-print" 
        @click="test" 
      />
      <ColoredButton type="submit" label="apply"/>
    </footer>

  </UForm>

</template>