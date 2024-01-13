<script setup>

definePageMeta({ 
  middleware: ['signed-out', 'store'],
})

const product = useProductStore()

const orders = ref([])

async function refreshList() {
  orders.value = await product.getStoreOrders()
}

async function fulfill(val) {

  const { res, err } = await product.setOrderAsFulfilled(val)

  const toast = useToast()
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
      title: `Succefully set ${res[0]+' '+res[1]}'s order as fulfilled.`,
    })
  }

}

onMounted(async () => {

  refreshList()

})

</script>


<template><div id='orders'>

<section id="actions">

  <div>
    <h3>User Orders</h3>
  </div>

  <div class="buttons">
    <UButton variant="soft" label="Export to PDF"
      icon="i-heroicons-arrow-down-on-square-stack-20-solid"
      @click=""/>
    <UInput
      placeholder="Search..." class="m-0 p-0 h-10" id="search"
      icon="i-heroicons-magnifying-glass-20-solid" size="md"
      :trailing="false"
    />
  </div>

</section>

<div id="double">

<section class="max-w-3xl mx-auto px-4">
  <UCard class="orders" v-for="i in orders">
    <div class="item flex-col md:flex-row">

      <section>
        <div>
          <UAvatar size="sm" :src="i.buyer.user_image"/>
          <UIcon id='icon' :class="i.status == 'pending' ? 'text-orange-500' : 'text-blue-500'" :name="'i-tabler-arrow-big-right-lines'" />
        </div>
        <div>
          <section class="flex items-center gap-x-2">
            <NuxtLink class="inline-block max-w-[100pt] underline truncate" :to="'/product/' + i.product.id">
              {{ i.product.name }}
            </NuxtLink> x{{ i.product.quantity }}
          </section>
          <section>{{ relativeTime(i.date)[0] }}, {{ i.status }}</section>
        </div>
      </section>

      <section class="flex gap-x-3 pt-4 md:pt-0 min-w-[279px]">
        <div>
          {{ i.buyer.first_name+' '+i.buyer.last_name }}
          <span class="pl-2 text-gray-700 dark:text-gray-400">₱{{ i.product.price * i.product.quantity }}</span>
        </div>
        <div v-if="i.status == 'pending'">
          <UButton icon='i-tabler-input-check' label="Fulfill" 
            color="gray" variant='outline' :ui="{ rounded: 'rounded-full' }"
            @click="fulfill(i.id)" />
        </div>
      </section>

    </div>
  </UCard>
</section>

</div>

</div></template>


<style scoped>

#actions {
  @apply flex flex-wrap;
}

#actions {
  
  @apply items-center justify-between;
  
  div {

    @apply flex items-center gap-x-4 m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}

:deep(.orders){
  @apply mb-4;

  > div {
    @apply p-3
  }

  .item {
    @apply flex flex-wrap items-center justify-between gap-x-3;
    
    section {
      @apply flex flex-row items-center;

      div {
        @apply flex flex-col;

        section {
          &:nth-child(1) {
            @apply flex items-center;
          }
          &:nth-child(2) {
            @apply flex items-center text-[gray];
          }
        }

      }

      div:nth-of-type(1) {
        @apply flex flex-row items-center;
      }

      #icon {
        width: 50px;
        height: 20px;
      }
    
    }

    > section:nth-of-type(2) {
      @apply justify-end w-[var(--amnt-l)]
    }
  }
}

:deep(#search + span) {
  padding-inline-start: 1.15rem;
}

@media only screen and (max-width: 520px) {
  :deep(.history) {
    --amnt-l: 100%;
  }
}

</style>