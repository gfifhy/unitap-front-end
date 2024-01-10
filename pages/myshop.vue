<script setup>

useHead({ titleTemplate: 'Shop - UniTap' })

definePageMeta({ 
  middleware: 'signed-out',
})

const myProducts = ref({})
const role = ref('student')
const loading = ref(true)

onMounted(async () => {
  const account = useAuthStore()
  role.value = account.user?.role.slug
  myProducts.value = await useProductStore().getMyProducts()
  loading.value = false
})


</script>


<template><div id='shop'>

<div id='merchant' v-if="loading || role == 'store'">

  <section id='actions'>

    <div>
      <h3>My Store</h3>
    </div>

    <div class="buttons" v-if="!loading">
      <!--ButtonTooltip text="Filter" hotkey="F"
        variant="soft" icon="i-heroicons-funnel-20-solid" 
        @click=""/>
      <UInput
        placeholder="Search..." class="max-w-[10rem]" id="search"
        icon="i-heroicons-magnifying-glass-20-solid" size="md"
        :trailing="false"
      /-->
      <UButton label="Add"
        variant="solid" icon="i-heroicons-plus-circle-20-solid"
        @click="navigateTo('/product/create')"/>
    </div>

  </section>

  <section id='items'>
    <ShopItemCard_SK v-for="i in 10" :key="i" v-if="loading"/>
    <template v-else-if="myProducts.length !== 0" v-for="(i, k) in myProducts">
      <ShopItemCard :name="i.product_name" :price="i.price" :img="i.image" :stock="i.stock"
        @click="false/*navigateTo(`/product/${i.id}`)*/"
      />
    </template>
    <template v-else>
      <UButton label="Add product" class="min-h-[320px] justify-center"
        variant="soft" icon="i-heroicons-plus-circle-20-solid"
        @click="navigateTo('/product/create')" />
      <UCard v-for="i in 3" class="min-h-[320px]" />
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

#items {
  --mw: 15rem;
  @apply 
    mx-auto px-3 max-w-[1366px] grid gap-x-4 gap-y-4
    grid-cols-[repeat(auto-fill,minmax(var(--mw),1fr))]
  ;
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