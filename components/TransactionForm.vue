<script setup lang="ts">

const toast = useToast()

const items = [{
  key: 'amount',
  label: 'Amount',
  icon: 'i-heroicons-adjustments-horizontal',
  description: 'Input the amount of credit to send.'
}, {
  key: 'tap',
  label: 'Tap',
  icon: 'i-heroicons-signal',
  description: 'Hold your device near the recipient\'s device'
}, {
  key: 'confirm',
  label: 'Confirm',
  icon: 'i-heroicons-information-circle',
  description: 'Double check if this is the change you intend.'
}]

const tabIdx = ref(0)

const f = ref({ amount: "69" })
const tap = ref({ data: '', test: '' })

const validate = (state: any): FormError[] => {
  const errors = []
  const fields = ['amount']
  const msg = (v) => {
    if (!state[v]) errors.push({ path: v, message: 'Required' })
  }
  for (let i of fields) msg(i)
  return errors
}

function submit (form) {
  console.log('Submitted form:', form)
  toast.add({
    icon: 'i-heroicons-check-badge-solid',
    title: 'Submitted form',
    description: form
  })
}
</script>


<template> <UTabs :items="items" class="w-full navigation" v-model="tabIdx">

<template #default="{ item, index, selected }">
  <div id="tab" :class="{ inactive: !selected }">
    <UIcon :name="item.icon" id="icon" />

    <span class="truncate"> {{ item.label }}</span>

    <span v-if="selected"/>
  </div>
</template>

<template #item="{ item }">

  <UForm class="user" :validate="validate" :state="f" @submit="submit(f)">

  <UCard>
    
    <template #header>
      <p id="desc">
        {{ item.description }}
      </p>
    </template>

    <div v-if="item.key === 'amount'" class="space-y-3">
      <FormInput placeholder="0.00" type="text" name="first_name"
        icon="i-heroicons-currency-pound-20-solid"
        v-model="f.amount"
      />
    </div>

    <div v-else-if="item.key === 'tap'" class="space-y-3 text-gray-300 text-center">
      <svg class="text-gray-500 opacity-50" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 7.07L8.43 8.5c.91-.91 2.18-1.48 3.57-1.48s2.66.57 3.57 1.48L17 7.07C15.72 5.79 13.95 5 12 5s-3.72.79-5 2.07zM12 1C8.98 1 6.24 2.23 4.25 4.21l1.41 1.41C7.28 4 9.53 3 12 3s4.72 1 6.34 2.62l1.41-1.41A10.963 10.963 0 0012 1zm2.86 9.01L9.14 10C8.51 10 8 10.51 8 11.14v9.71c0 .63.51 1.14 1.14 1.14h5.71c.63 0 1.14-.51 1.14-1.14v-9.71c.01-.63-.5-1.13-1.13-1.13zM15 20H9v-8h6v8z"></path></svg>

      <NuxtLink to="#" @click="">no NFC supported?</NuxtLink>
    </div>

    <div v-else-if="item.key === 'confirm'" class="space-y-3 h-96 text-gray-300 relative">
      <NuxtImg class="mx-auto h-full" src="/confirm.jpg" />
      <span id="accept">php 0</span>
      <span id="recept">php {{ f.amount }}</span>
    </div>

  </UCard>

  <footer>
    <UButton label="Previous" color="gray"
      leadingIcon="i-heroicons-arrow-left-20-solid"
      @click="tabIdx--" :disabled="tabIdx < 1" />
    <UButton label="Next" color="gray"
      trailingIcon="i-heroicons-arrow-right-20-solid"
      @click="tabIdx++" v-if="tabIdx < 2" />
    <ColoredButton type="submit" label="confirm"
      v-else />
  </footer>

  </UForm>

</template>

</UTabs></template>


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
#accept {
  @apply absolute;
  top: 80px;
  left: 105px;
}

</style>