<script setup lang="ts">

import { validateForm } from '~/helpers/validateForm'

const f = ref({
  product_name: '',
  description: '',
  price: '',
  stock: ''
})

const productimg = ref({
  image : null,
  imageUrl: null
})

const validate = (state) => {
  return validateForm(state, [
    'product_name','description','price', 'stock'
  ])
}

const imgSelect = (e) => {
  const file = e.target.files[0]
  productimg.value.image = file
  productimg.value.imageUrl = URL.createObjectURL(file)
}

async function submit(e: FormSubmitEvent<any>) {

  console.log({ ...e.data, image: productimg.value.image })

  //const { error } = await useAuthStore().register(f.value)

  //if(!error.value) { navigateTo("/") } else { console.log(error) }

}

</script>

<template>

  <UForm class="user" :validate="validate" :state="f" @submit="submit">
    
    <FormInput placeholder="Sandwich" icon="i-heroicons-cube-solid"
      label="Name" type="text" name="product_name"
      v-model="f.name"
    />
    <UTextarea
      autoresize
      placeholder="Product description..."
      v-model="f.description"
    />
    <div class='sbs'>
      <FormInput placeholder="0.00" icon="i-tabler-currency-peso"
        label="Price" type="number" name="price"
        v-model="f.price"
      />
      <FormInput placeholder="0" icon="i-tabler-hash"
        label="Stock" type="number" name="Stock" min="-1"
        v-model="f.stock"
      />
    </div>
    <FormLabel label="Image" />
    <UInput type="file" accept="image/*" @change="imgSelect"/>

    <div id="preview" v-if="productimg.imageUrl" class="max-w-[240px] mx-auto">
      <ShopItemCard :name="f.name || 'Sandwich'" :price="f.price || '0.00'" :img="productimg.imageUrl"/>
    </div>


    <footer>
      <div></div>
      <ColoredButton type="submit" label="create"/>
    </footer>

  </UForm>

</template>


<style scoped>

:deep(input[type=file]) {
  &::file-selector-button {
    @apply border-transparent bg-primary-950
           text-primary cursor-pointer px-2 py-1 rounded-[0.2em]
    ;
    
    &:hover {
      @apply bg-primary-900 text-gray-100
    }

  }
}

</style>