<script setup>

const tabs = [
  {
    key: 'credential',
    label: 'Credential'
  },
  {
    key: 'background',
    label: 'Background'
  },
  {
    key: 'identity',
    label: 'Identity'
  }
]

const roles = useAppConfig().user_roles

const f = ref({
  first_name: 'Samuelo',
  last_name: 'Buelo',
  guardian_first_name: 'Samuelita',
  guardian_last_name: 'Buelo',
  student_id: 'A69420324',
  email: 'minon15384@octovie.com',
  contact: '69649464',
  guardian_contact: '544364535',
  password: 'minon15384',
  password_confirmation: 'minon15384',
  role: {
    name: 'Student',
    slug: 'student',
  },
  nfc_id: '',
  store_name: 'CoolStore',
  user_image: null,
  imgurl: null,
  user_signature: null,
  sigurl: null,
  store_logo: null,
  logourl: null
})

const emit = defineEmits(["update-user"])
const toast = useToast()

const tabIdx = ref(0)
const role_sel = ref(roles[0])
const setRole = () => {
  f.value = {
    ...f.value, 
    role: {
      name: role_sel.value.label,
      slug: role_sel.value.id
    }
  }
}

const validate = state => {
  return validateForm(state, [
    'first_name', 'last_name', 'guardian_first_name', 
    'guardian_last_name', 'student_id', 'email', 'contact',
    'guardian_contact', 'password', 'password_confirmation',
    'store_name'
  ])
}

let ndef = null
const isScanning = ref(false)

async function setupNFCcard() {

  const toastErrorNDEF = desc => {
    toast.add({
      icon: 'i-tabler-exclamation-circle',
      title: 'NFC card reading error.',
      color: 'orange',
      description: desc
    })
  }

  if (!ndef) {
    try {
      ndef = new NDEFReader()
    } catch (e) { 
      console.error(e)
      toastErrorNDEF('No NDEFReader support.')
      return
    }
  } else { await ndef.stop() }

  isScanning.value = true

  try {

    await ndef.scan();

    ndef.addEventListener("readingerror", () => {
      console.error('NDEFReader: readingerror')
      toastErrorNDEF()
    });

    ndef.addEventListener("reading", async ({ message, serialNumber }) => {

      f.value.nfc_id = serialNumber
      await ndef.stop()

    });

  } catch (e) { console.error(e); toastErrorNDEF(e) } finally {

    await ndef.stop()
    isScanning.value = false

  }

}

async function submit(e) {

  const req = e.data
  const {res, err} = await useUsersStore()
    .addUser(req, req.role.slug !== 'student' ?? true)

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
      title: 'Successfully added!',
      description: `New ${f.value.role.name}, ${f.value.email} added.`
    })

    //took the user id from response and write it directly to NFC

    emit('update-user', { ...f.value, ...res.user })

    await ndef.write(res.user.id);
  }

}

</script>

<template>  <UTabs :items="tabs" class="w-full" v-model="tabIdx">  <template #item="{ item }">

<UForm class="user" :validate="validate" :validateOn="['submit']" :state="f" @submit="submit">

  <template v-if="item.key === 'credential'" class="space-y-3">

    <FormInput :placeholder="isScanning ? 'Scanning' : 'Click here to activate scanning'"
      label="NFC ID" name="nfcid"
      icon="i-tabler-nfc"
      v-model="f.nfc_id" @focusin.once="setupNFCcard" :disabled="isScanning /* move this el to another tab */"
    />
    <FormInput placeholder="09xxx--x"
      label="Contact #" type="number" name="contact"
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.contact"
    />
    <FormInput placeholder="samuelo@example.com"
      label="E-mail address" name="email"
      icon="i-heroicons-at-symbol-20-solid"
      v-model="f.email"
    />
    <FormInput placeholder="a-z, A-Z, 0-9, !@#$~" hint="at least 8 characters"
      label="Password" type="password" name="password"
      icon="i-heroicons-key-20-solid"
      v-model="f.password"
    />
    <FormInput placeholder="Retype password"
      type="password" name="password_confirmation" 
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.password_confirmation"
    />

  </template>

  <template v-else-if="item.key === 'background'" class="space-y-3">

    <div class="sbs">
      <FormInput placeholder="Samuelita"
        label="Guardian first name" name="guardian_first_name"
        icon="i-heroicons-identification-20-solid"
        v-model="f.guardian_first_name"
      />
      <FormInput placeholder="Buelo"
        label="Guardian last name" name="guardian_last_name"
        icon="i-heroicons-identification-20-solid"
        v-model="f.guardian_last_name" />
    </div>

    <FormInput placeholder="09xxx--x"
      label="Guardian Contact #" type="number" name="guardian_contact"
      icon="i-heroicons-hashtag-20-solid"
      v-model="f.guardian_contact"
    />

  </template>

  <template v-else-if="item.key === 'identity'" class="space-y-3">

    <div class="sbs">
      <div>
        <FormLabel label="Role"/>
        <USelectMenu v-model="role_sel" :options="roles" @change="setRole" id="role">
          <template #label>
            <UIcon v-if="role_sel.icon" :name="role_sel.icon" class="w-5 h-5" />
            {{ role_sel.label }}
          </template>
        </USelectMenu>
      </div>
      <FormInput placeholder="K6942069"
        label="Student ID" name="student_id"
        icon="i-heroicons-identification-20-solid"
        v-model="f.student_id" v-if="f?.role.slug == 'student'"
      />
      <FormInput placeholder="CoolStore"
        label="Store Name" name="student_id"
        icon="i-heroicons-identification-20-solid"
        v-model="f.store_name" v-else-if="f?.role.slug == 'store'"
      />
    </div>

    <div class="sbs">
      <FormInput placeholder="Samuelo"
        label="First name" name="first_name"
        icon="i-heroicons-identification-20-solid"
        v-model="f.first_name"
      />
      <FormInput placeholder="Buelo"
        label="Last name" name="last_name"
        icon="i-heroicons-identification-20-solid"
        v-model="f.last_name" />
    </div>

    <FilePicker label="Profile Picture" v-model="f.user_image"
      @onFileSelect="f.imgurl = $event">

      <UserInfoCard v-if="f.imgurl" :user="f" />

    </FilePicker>

    <FilePicker label="Signature Picture" v-model="f.user_signature"
      @onFileSelect="f.sigurl = $event">

      <UCard v-if="f.sigurl" class="max-w-[240px] mx-auto">
        <NuxtImg :src="f.sigurl"></NuxtImg>
      </UCard>

    </FilePicker>

    <FilePicker label="Store Logo" v-model="f.store_logo"
      @onFileSelect="f.logourl = $event" v-if="f.role.slug == 'store'">

      <ShopInfoCard :name="f.store_name" desc="This is a store."
        :img="f.logourl" v-if="f.logourl"  />

    </FilePicker>

  </template>

  <footer>
    <UButton label="Previous" color="gray" 
      leadingIcon="i-heroicons-arrow-left-20-solid"
      @click="tabIdx--" :disabled="tabIdx < 1" v-if="tabIdx > 0" />
    <UButton label="Close" color="gray" @click="emit('onClose')" v-else />
    <UButton label="Next" color="gray" 
      trailingIcon="i-heroicons-arrow-right-20-solid"
      @click="tabIdx++" v-if="tabIdx < 2" />
    <ColoredButton type="submit" label="add" v-else />
  </footer>

</UForm>

</template>  </UTabs>  </template>


<style scoped>

:deep(#role) {
  @apply h-11
}

footer {
  height: 4.5rem;
}

</style>