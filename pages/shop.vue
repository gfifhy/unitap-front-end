<script setup>

useHead({ titleTemplate: 'Shop - UniTap' })

definePageMeta({ 
  middleware: 'signed-out',
})

const product = useProductStore()

const myProducts = ref({})
const stores = ref({})
const products = ref({})
const role = ref('student')
const loading = ref(true)

onMounted(async () => {
  const account = useAuthStore()
  role.value = account.user?.role.slug
  myProducts.value = await product.fetchProduct()
  stores.value = await product.getStores()
  loading.value = false
})

const switchStore = async v => {
  products.value = await product.fetchProduct(v)
}

</script>


<template><div id='shop'>

<div id='merchant' v-if="role == 'store'">

  <section id='actions'>

    <div>
      <h3>My Store</h3>
    </div>

    <div class="buttons" v-if="!loading">
      <UButton label="View all"
        variant="ghost" icon="i-heroicons-squares-2x2-20-solid"
        @click="navigateTo('/myshop')"/>
      <UButton label="Add"
        variant="solid" icon="i-heroicons-plus-circle-20-solid"
        @click="navigateTo('/product/create')"/>
    </div>

  </section>

  <section id='items'>
    <ShopItemCard_SK v-for="i in 5" :key="i" v-if="loading"/>
    <template v-else v-for="(i, k) in myProducts">
      <ShopItemCard :name="i.product_name" :price="i.price" :img="i.image"
        @click="navigateTo(`/product/${i.id}`)" v-if="k < 6"
      />
    </template>
    <UButton label="View all"
      variant="soft" icon="i-heroicons-squares-2x2-20-solid"
      @click="navigateTo('/myshop')" v-if="myProducts.length !== 0"/>
    <template v-else>
      <UButton label="Add product" class="min-h-[320px]"
        variant="soft" icon="i-heroicons-plus-circle-20-solid"
        @click="navigateTo('/product/create')" />
      <UCard v-for="i in 3" />
    </template>
  </section>

</div>

<div id='stores'>

  <section id='actions'>

    <div>
      <h3>Stores</h3>
    </div>

    <div class="buttons" v-if="!loading">
      <UInput
        placeholder="Search..." class="max-w-[10rem]" id="search"
        icon="i-heroicons-magnifying-glass-20-solid" size="md"
        :trailing="false"
      />
    </div>

  </section>

  <section id='items'>
    <ShopInfoCard_SK v-for="i in 5" :key="i" v-if="loading"/>
    <template v-else v-for="i in stores">
      <ShopInfoCard
        :img="i.store_logo" :name="i.store_name" desc="This is a store."
        @click="switchStore(i.id)" />
    </template>
  </section>

</div>

<div id='global' v-if="products.length !== 0">

  <section id='actions'>

    <div>
      <h3>Products</h3>
    </div>

    <div class="buttons" v-if="!loading">
      <ButtonTooltip text="Filter" hotkey="F"
        variant="soft" icon="i-heroicons-funnel-20-solid" 
        @click=""/>
      <UInput
        placeholder="Search..." class="max-w-[10rem]" id="search"
        icon="i-heroicons-magnifying-glass-20-solid" size="md"
        :trailing="false"
      />
    </div>

  </section>

  <section id='items'>
    <ShopItemCard_SK v-for="i in 5" :key="i" v-if="loading"/>
    <template v-else v-for="i in 5">
      <ShopItemCard :name="'Black Hat G'" :price="'140'" :img="'/tui.jpg'"
        @click="navigateTo('/product/product-id')"
      />
    </template>
  </section>

</div>

</div></template>


<style scoped>

#actions,
#items {
  @apply flex flex-wrap;
}

#actions {
  
  @apply items-center justify-between;
  
  div {

    @apply flex items-center m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}

#stores #items,
#global #items {
  --mw: 15rem;
  @apply 
    mx-auto px-3 max-w-[1366px] grid gap-x-4 gap-y-4
    grid-cols-[repeat(auto-fill,minmax(var(--mw),1fr))]
  ;
}

#merchant #items {
  @apply flex gap-x-4 overflow-x-auto flex-nowrap p-3;
  > div {
    @apply min-w-[220px] max-w-[220px]
  }
}

:deep(#search + span) {
  padding-inline-start: 1.15rem;
}

@media screen only and (max-width: 535px) {
  #global #items {
    --mw: 10rem
  }
}

</style>