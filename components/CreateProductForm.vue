<script setup lang="ts">

const loading = ref(false)

const f = ref({
  product_name: 'Sandwich',
  description: 'Egg',
  price: '69',
  stock: '5',
  image : null,
  imgurl: null
})

const validate = state => {
  return validateForm(state, [
    'product_name','description','price', 'stock', 'image'
  ])
}

async function submit(e: FormSubmitEvent<any>) {
  
  loading.value = true

  const { res, err } = await useProductStore().addProduct(e.data)

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
      title: "Product added!",
      description: res.product_name,
    })
    f.value = clearObject(f.value)
  }
  loading.value = false

}

</script>

<template>

  <UForm class="user" :validate="validate" :validateOn="['submit']" :state="f" @submit="submit" :disabled="loading ?? false">
    
    <FormInput placeholder="Sandwich" icon="i-heroicons-cube-solid"
      label="Name" type="text" name="product_name"
      v-model="f.product_name"
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
        label="Stock" type="number" name="stock" min="-1"
        v-model="f.stock"
      />
    </div>
    <FilePicker v-model="f.image" @onFileSelect="f.imgurl = $event">
      <ShopItemCard :name="f.name || 'Sandwich'" :price="f.price || '0.00'"
        :img="f.imgurl" v-if="f.imgurl" />
    </FilePicker>

    <footer>
      <div></div>
      <UButton label="create" type="submit" trailingIcon="i-tabler-cube-plus"
        :loading="loading" class="h-12 w-1 justify-end" />
    </footer>

  </UForm>

</template>
