<script setup lang="ts">

const f = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const validate = (state) => {
  return validateForm(state, [
    'name','email','password','password_confirmation'
  ])
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

  <UForm class="user" :validate="validate" :validateOn="['submit']" :state="f" @submit="submit">
    
    <FormInput placeholder="Samuelo Buelo"
      label="Name" type="text" name="name"
      icon="i-heroicons-identification-20-solid"
      v-model="f.name"
    />
    <FormInput placeholder="samuelo@example.com"
      label="E-mail address" type="text" name="email"
      icon="i-heroicons-at-symbol-20-solid"
      v-model="f.email"
    />
    <FormInput placeholder="a-z, A-Z, 0-9, !@#$~" hint="at least 8 characters"
      label="Password" type="password" name="password"
      icon="i-heroicons-key-20-solid"
      v-model="f.password"
    />
    <FormInput type="password" name="password_confirmation" placeholder="Retype password"
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.password_confirmation"
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