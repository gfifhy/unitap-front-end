<script setup lang="ts">

useHead({ titleTemplate: 'Product - UniTap' })

definePageMeta({ 
  middleware: 'signed-out',
})

const columns = [{
  key: 'item',
  label: 'Item'
}, {
  key: 'price',
  label: 'Price',
  class: 'text-right'
}]

const items = ref([{
  item: 'Lindsay Walton',
  price: '1',

}, {
  item: 2,
  price: 'Courtney Henry',
}])

const shop = useProductStore()
const loading = ref(true)
const confirmModal = ref(false)

const product = ref({
  product_name: 'Black Hat G',
  description : `Yo, peep the game-changer – "Black Hat G" in the house! This ain't your grandma's graduation cap; it's the flyest, baddest way to rep your academic grind with straight-up gangsta style. Draped in that jet-black satin, this hat ain't playin'. Smooth like victory, it's got that golden insignia upfront, screaming success louder than a mic drop. This ain't just a cap; it's a symbol of hustlin', grinding, and making it against all odds.`,
  stock: '6',
  price: '140',
  image: '/tui.jpg'
})

const f = ref({
  product_id: useRoute().params.id,
  quantity: 1,
})

const confirmation = () => {

  const totalCost = parseInt(product.value.price) * parseInt(f.value.quantity)

  items.value = [{
    item: { value: product.value.product_name, class: 'italic' },
    price: { value: `₱${product.value.price} x ${f.value.quantity}`, class: 'text-right' },
  }, {
    item: { value: "Total", class: "font-bold" },
    price: { value: '₱'+totalCost, class: "!text-blue-500 text-right" },
    class: 'bg-blue-500/10'
  }, {
    item: { value: " " },
    price:{ value: " " },
  }, {
    item: { value: "Wallet", class: 'dark:!text-white !text-black' },
    price: ' ',
    class: '!border-transparent'
  }, {
    item: { value: "Balance" },
    price: { value: '- ₱' + totalCost, class: "!text-rose-500 text-right" },
  }]

  confirmModal.value = true

}
const limitInput = () => {
  if (f.value.quantity != "") {
    if (parseInt(f.value.quantity) < 1) {
      f.value.quantity = "1";
    }
    if (parseInt(f.value.quantity) > parseInt(product.value.stock)) {
      f.value.quantity = product.value.stock;
    }
  }
}

async function buy() {

  const toast = useToast()

  const { res, err } = await shop.orderProduct(f.value)

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
      title: "Order sent!",
      description: `Ordered ${product.value.product_name}`
    })
    useAuthStore().identity.balance = res.balance
    navigateTo('/history')
  }

}

onMounted(async () => {
  product.value = await shop.fetchProduct(f.value.product_id)
  loading.value = false
})

</script>

<template><div id='createproduct'>

<section id="actions">

  <div>
    <h3>Product</h3>
  </div>

</section>

<section id="interface" v-if="!loading">

  <div id="double">

    <section>
      <NuxtImg :src="product?.image" />
    </section>

    <aside>

      <h2>{{ product?.product_name }}</h2>
      <div id='price'>
        <UIcon name="i-tabler-currency-peso"/> {{ product?.price * f.quantity }}
      </div>

      <UDivider />

      <UForm class="user">
        <FormInput placeholder="1" 
          :hint="product?.stock + ' items left'" icon="i-tabler-brand-x"
          label="Quantity" type="number" name="quantity" min="1" @input="limitInput"
          v-model="f.quantity"
        />

        <footer id="actions">
          <UButton v-if="false"
            label="add to cart"
            variant="ghost" icon="i-tabler-shopping-cart-plus"
            @click="" :loading="loading" :disabled="loading"
          />
          <span v-else></span>
          <UButton 
            label="Buy" icon="i-tabler-shopping-bag"
            @click="confirmation" :loading="loading" :disabled="loading"
          />
        </footer>
      </UForm>

    </aside>

  </div>

  <div id="double" class="details">

    <section id="desc">
      {{ product?.description }}
    </section>

    <aside>
      <h3 class="invisible">Reviews</h3>
    </aside>

  </div>

</section>


<template v-if="confirmModal">
  <UModal v-model="confirmModal">
    <UCard :ui="{ ring: '', header: { base: 'flex items-center justify-between' }, footer: { base: 'flex justify-center' }, divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>

        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Confirm transaction
        </h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="confirmModal = false" />

      </template>

      <UTable :rows="items" :columns="columns">
        <template #price-data="{ row }">
          {{ row.price.value }}
        </template>
        <template #item-data="{ row }">
          {{ row.item.value }}
        </template>
      </UTable>

      <template #footer>
        
        <UButton label="Confirm" @click="buy" />

      </template>
    </UCard>
  </UModal>
</template>

</div></template>

<style scoped>

section {

  @apply flex w-full rounded-xl overflow-hidden;
  

  > img {
    @apply h-full w-full object-cover
  }
}

#actions {
  
  @apply flex flex-wrap items-center justify-between;
  
  div {

    @apply m-1 pl-2 pr-2;

    button {
      @apply m-2;
    }
  }

}

#interface {
  @apply max-w-5xl mx-auto justify-center flex-col px-4
}

#double {
  
  @apply flex flex-row h-full items-center;


  > aside {
    @apply flex flex-col justify-center h-full px-4 lg:px-10;
  }

  &.details {
    @apply items-start;
    > aside {
      @apply px-1
    }
  }
}

#desc {
  @apply lg:p-6 p-4
}

:deep(#price) {

  @apply flex items-center text-amber-600 text-2xl;

  > span {
    @apply h-10 w-10
  }

}

footer {
  @apply h-20
}

</style>