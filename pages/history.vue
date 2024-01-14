<script setup>

useHead({ titleTemplate: 'History - UniTap' })

definePageMeta({ 
  middleware: ['signed-out'],
})

const transfers = ref([])

const orders = ref(null)

const role = ref('admin')

onMounted(async () => {

  role.value = useAuthStore().user.role.slug

  transfers.value = await useWalletStore().getTransfers(role.value)

  if (role.value === 'student') {
    orders.value = await useProductStore().getUserOrders()
  }

})

</script>


<template><div id='history'>

<section id="actions">

  <div>
    <h3>History</h3>
  </div>

  <!--div class="buttons">
    <UButton variant="soft" label="Export to PDF"
      icon="i-heroicons-arrow-down-on-square-stack-20-solid"
      @click=""/>
    <UInput
      placeholder="Search..." class="m-0 p-0 h-10" id="search"
      icon="i-heroicons-magnifying-glass-20-solid" size="md"
      :trailing="false"
    />
  </div-->

</section>

<div id="double">

<section class="max-w-3xl mx-auto px-4">
  <h4>Transfers</h4>
  <UCard class="transfers" v-for="i in transfers">
    <div class="item">
      <section>
        <div>
          <UAvatar id="avatar" size="sm" :src="i.avatar"/>
          <UIcon id='icon' :name="i.type === 'send' ? 'i-tabler-arrow-big-left' : 'i-tabler-arrow-big-right-filled'" />
        </div>
        <div>
          <section><span>Payment {{ i.type === 'send' ? 'to' : 'from' }} <b>{{ i.agent }}</b></span></section>
          <section>{{ relativeTime(i.date)[0] }}</section>
        </div>
      </section>
      <section>
        ₱{{ i.amount }}
      </section>
    </div>
  </UCard>
</section>


<section class="max-w-3xl mx-auto px-4" v-if="orders && role === 'student'">
  <h4>Orders</h4>
  <UCard class="orders" v-for="i in orders">
    <div class="item">
      <section>
        <div>
          <UAvatar size="sm" :src="i.seller.store_logo"/>
          <UIcon id='icon' :name="'i-heroicons-banknotes-20-solid'" />
        </div>
        <div>
          <section class="flex items-center gap-x-2">
            Ordered
              <NuxtLink class="inline-block max-w-[100pt] underline truncate" :to="'/product/' + i.product.id">
                {{ i.product.name }}
              </NuxtLink> x{{ i.product.quantity }}
          </section>
          <section>{{ relativeTime(i.date)[0] }}, {{ i.status }}</section>
        </div>
      </section>
      <section>
        ₱{{ i.product.price * i.product.quantity }}
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

:deep(.orders),
:deep(.transfers) {
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