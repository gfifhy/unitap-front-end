<script setup lang="ts">

useHead({ titleTemplate: 'Product - UniTap' })

definePageMeta({ 
  middleware: 'signed-out',
})

const loading = ref(true)

const product = ref({
  id: useRoute().params.id,
  product_name: 'Black Hat G',
  description : `Yo, peep the game-changer – "Black Hat G" in the house! This ain't your grandma's graduation cap; it's the flyest, baddest way to rep your academic grind with straight-up gangsta style. Draped in that jet-black satin, this hat ain't playin'. Smooth like victory, it's got that golden insignia upfront, screaming success louder than a mic drop. This ain't just a cap; it's a symbol of hustlin', grinding, and making it against all odds.`,
  stock: '6',
  price: '140',
  image: '/tui.jpg'
})

onMounted(async () => {
  //product.value = await useProductStore().fetchProduct(useRoute().params.id)
  loading.value = false
})

</script>

<template><div id='createproduct'>

<section id="actions">

  <div>
    <h3>Product</h3>
  </div>

  <div class="buttons">
    <UPopover mode="hover">

      <UButton variant="soft" icon="i-heroicons-ellipsis-vertical-20-solid" 
        @click="" />

      <template #panel>
        <div class="ctxmenu">
          
          <UButton variant="ghost" icon="i-heroicons-beaker-solid"
            label="Test" 
            @click="" />

        </div>
      </template>

    </UPopover>

  </div>

</section>

<section id="interface">

  <div id="double">

    <section>
      <NuxtImg :src="product?.image" />
    </section>

    <aside>

      <pre class="invisible">{{ $route.params.id }}</pre>
      <h2>{{ product?.product_name }}</h2>
      <div id='price'>
        <UIcon name="i-tabler-currency-peso"/> {{ product?.price }}
      </div>

      <UDivider />

      <UForm class="user">
        <FormInput placeholder="1" :hint="product?.stock + ' items left'" icon="i-tabler-brand-x"
          label="Quantity" type="number" name="quantity" min="1"
        />

        <footer id="actions">
          <UButton 
            label="add to cart"
            variant="ghost" icon="i-tabler-shopping-cart-plus"
            @click="" :loading="loading" :disabled="loading"
          />
          <UButton 
            label="Buy" icon="i-tabler-shopping-bag"
            @click="" :loading="loading" :disabled="loading"
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
      <h3>Reviews</h3>
    </aside>

  </div>

</section>

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