<script setup>

const $cfg = useAppConfig()
const loading = ref(false)

const f = ref({
  login: '',
  loginurl: '',
  logo: '',
  logourl: '',
  text: {
    head: "",
    tail: ""
  },
})

async function submit() {

  loading.value = true

  const toast = useToast()
  
  const { res, err } = await useCMSStore().setSitePicture(f.value)

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
      title: "Succefully set pictures and logos!",
    })
  }


  loading.value = false

}


</script>

<template>

<div id='actions'>
  <div>
    <h3>Pictures</h3>
  </div>

</div>

<div id="interface">

  <div id="double" class="gap-x-3">
    <div class="space-y-3">
      <FilePicker label="Logo" v-model="f.logo"
        @onFileSelect="f.logourl = $event">
  
        <NuxtImg class="max-h-[300px] overflow-y-auto"
        :src="f.logourl?.lastIndexOf('blob:', 0) === 0 ?
              f.logourl : 
              $cfg.api.base + '/storage/logo'" />  
  
      </FilePicker>
    </div>
    <div class="space-y-3">
      <FormLabel label="Logo Text" />
      <FormInput placeholder="Head" name="head" icon="i-tabler-cursor-text"
        v-model="f.text.head"
      />
      <FormInput placeholder="Tail" name="tail" icon="i-tabler-cursor-text"
        v-model="f.text.tail"
      />
    </div>
  </div>

  <FilePicker label="Login Photo" v-model="f.login"
    @onFileSelect="f.loginurl = $event">

    <NuxtImg class="max-h-[300px] overflow-y-auto"
    :src="f.loginurl?.lastIndexOf('blob:', 0) === 0 ?
          f.loginurl : 
          $cfg.api.base + '/storage/login'" />      

  </FilePicker>

  <footer>
    <span></span>
    <ColoredButton label="apply" @click="submit" :disabled="loading"/>
  </footer>

</div>



</template>


<style scoped>

form {
  @apply w-full
}

form.user > footer { @apply justify-end }

footer { @apply flex justify-between }

</style>