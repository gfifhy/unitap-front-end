<script setup lang="ts">

definePageMeta({ 
  layout: 'settings',
  middleware: 'signed-out',
})

const account = useAuthStore()
const passwordEnabled = ref(true)
const passkeyEnabled = ref(false)

const initPasswordCh = () => {

}

async function webauth() {
  const res = await account.wRegister();

  if (res) {
    toast.add({ 
      icon: 'i-heroicons-information-circle-20-solid',
      title: 'Operation (probably) cancelled.', 
      description: res,
      color: red
    })
  } else {
    toast.add({ 
      icon: 'i-heroicons-check-circle-20-solid',
      title: 'Successfully registered.', 
      timeout: 3000,
    })
  }
}

</script>


<template><section id='security'>

  <ToggleCard 
    label="Password" desc="Enable logins via password" 
    footLabel="Change" footDesc="Password last changed in"
    icon="i-heroicons-lock-closed"
    v-model="passwordEnabled" @footTriggered="initPasswordCh"
  />
  <ToggleCard 
    label="Passkey" desc="Enable logins via passkeys" 
    footLabel="Register" footDesc="Passkey created in"
    icon="i-heroicons-finger-print"
    v-model="passkeyEnabled" @footTriggered="webauth"
  />

</section></template>


