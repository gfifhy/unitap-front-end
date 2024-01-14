<script setup lang="ts">

const toast = useToast()
const loading = ref(false)

const items = ref([{
  key: 'amount',
  label: 'Amount',
  icon: 'i-heroicons-adjustments-horizontal',
  description: 'Input the amount of credit to send.'
}, {
  key: 'tap',
  label: 'Tap',
  disabled: true,
  icon: 'i-heroicons-signal',
  description: 'Hold the device near the recipient\'s card'
}, {
  key: 'confirm',
  label: 'Confirm',
  disabled: true,
  icon: 'i-heroicons-information-circle',
  description: 'Double check if this is the change you intend.'
}])

const tabIdx = ref(0)


const f = ref({ amount: "", user_id: "" })
const tap = ref({ data: '', test: '' })

const onTab = async (v = tabIdx.value) => {
  if (v === 1) {
    await startNFCScan()
  }
}

const checkAmountInput = () => {
  if (f.value.amount > 4) {
    items.value[1].disabled = false
  } else {
    items.value[1].disabled = true
  }
}

const userSelectModal = ref(false)

const setTargets = v => {

  f.value = { ...f.value, ...v, user_id: v.id }

  items.value[2].disabled = false
  
  userSelectModal.value = false

  setTimeout(() => {
    tabIdx.value++
  }, 100)

}

let ndef = null
const isScanning = ref(false)

async function startNFCScan() {

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

      const [user_id, nfc_id] = message.records.map((record) => [
        (new TextDecoder()).decode(record.data),
        serialNumber,
      ]).flat()

      const user = await useUsersStore().fetchUser(user_id || nfc_id)
      setTargets({...user})

      await ndef.stop()

    });

  } catch (e) { console.error(e); toastErrorNDEF(e) } finally {

    await ndef.stop()
    isScanning.value = false

  }

}

async function submit() {

  loading.value = true

  const form = f.value
  
  const { res, err } = await useWalletStore().topUp(f.value)

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
      title: 'Successful!',
      description: `Sent ${form.amount} to ${form.first_name+' '+ form.last_name ?? res.id}.`
    })
    f.value = { amount: "", user_id: "" }
    items.value[2].disabled = true
    tabIdx.value = 0
  }

  loading.value = false

}

</script>


<template> 

<EosIconsThreeDotsLoading class="h-20 w-20 m-auto" v-if="loading" />

<UTabs :items="items" class="w-full navigation" v-model="tabIdx" @change="onTab" v-else>

<template #default="{ item, index, selected }">
  <div id="tab" :class="{ inactive: !selected }">
    <UIcon :name="item.icon" id="icon" />

    <span class="truncate"> {{ item.label }}</span>

    <span v-if="selected"/>
  </div>
</template>

<template #item="{ item }">

  <UForm class="user">

  <UCard>
    
    <template #header>
      <p id="desc">
        {{ item.description }}
      </p>
    </template>

    <div v-if="item.key === 'amount'" class="space-y-3">

      <FormInput placeholder="0.00" type="text" name="amount"
        icon="i-heroicons-currency-pound-20-solid"
        v-model="f.amount" @input="checkAmountInput"
      />

    </div>

    <div v-else-if="item.key === 'tap'" class="space-y-3 text-gray-300 text-center">

      <SmartphoneSignal />
      <UButton variant="ghost" color="gray" @click="userSelectModal = true">
        no NFC supported?
      </UButton>

    </div>

    <div v-else-if="item.key === 'confirm'" class="text-center">

      <div class="relative space-y-3 h-96 text-gray-300">
        <NuxtImg class="mx-auto h-full" src="/confirm.jpg" />
        <span id="send">₱ {{ f.amount }}</span>
        <span id="recept">₱ {{ f.amount }}</span>
      </div>
      <p class="pt-5">
        Recipient: <UBadge color="gray" size="lg">{{ f.first_name+ ' '+ f.last_name }}</UBadge>
      </p>
      <p class="pt-4">
        Amount to be sent: <UBadge color="orange" size="lg">₱{{ f.amount }}</UBadge>
      </p>

    </div>

  </UCard>

  <footer>
    <UButton label="Previous" color="gray"
      leadingIcon="i-heroicons-arrow-left-20-solid"
      @click="() => { tabIdx--; onTab() }" :disabled="tabIdx < 1" />
    <UButton label="Next" color="gray"
      trailingIcon="i-heroicons-arrow-right-20-solid" :disabled="items[tabIdx + 1].disabled"
      @click="() => { tabIdx++; onTab() }" v-if="tabIdx < 2" />
    <ColoredButton type="submit" label="confirm"
      @click="submit()" v-else />
  </footer>

  </UForm>

</template>

</UTabs>


<template v-if="userSelectModal">
  <UserSelectorModal :isOpen="userSelectModal" selection="onlyOne"
    @onClose="setTargets($event)" />
</template>


</template>


<style>

#transact .navigation {
  --txt-sz: 1.125rem;

  > div:first-child {
    @apply h-16 bg-[unset];
    > div {
      @apply h-12 top-2 !important;
      > div {
        @apply bg-gray-200 dark:bg-gray-800
      }
    }
    > button {
      @apply h-12 top-0 text-[length:var(--txt-sz)]
    }
  }

  #tab {
    @apply flex items-center gap-2 relative truncate;
    > #icon {
      @apply w-5 h-5 flex-shrink-0;
      + span + span {
        @apply absolute -right-4 w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400
      }
    }

    &.inactive {
      @apply opacity-30
    }
  }

  #label {
    @apply text-base font-semibold leading-6 text-gray-900 dark:text-white
  }

  #desc {
    @apply mt-1 text-sm text-gray-500 dark:text-gray-400
  }
}

@media only screen and (max-width: 660px) {
  #transact .navigation {
    --txt-sz: .9rem;
  }
}
</style>


<style scoped>

footer {
  height: 4.5rem;
}

#recept {
  @apply absolute;
  top: 80px;
  right: 125px;
}
#send {
  @apply absolute;
  top: 80px;
  left: 105px;
}

</style>