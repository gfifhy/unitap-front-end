import { defineStore } from "pinia"

type Product = {
  product_name: String
  description: String
  price: String
  stock: String
  image: File
}

export const useProductStore = defineStore('products', () => {

  const target = ref(null)
  const myProducts = ref(null)
  const stores = ref(null)

  const getMyProducts = async () => {
    if (!myProducts.value) await fetchProduct() 
    return myProducts.value
  }

  const getStores = async () => {
    if (!stores.value) await fetchStore() 
    return stores.value
  }

  async function fetchStore(id) {
    if (id) {
      const { res } = await doRequest(`api/student/store/${id}`)
      return res
    }
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest('api/student/store')
    stores.value = res
    return res
  }

  async function fetchProduct(id) {
    if (id) {
      const { res } = await doRequest(`api/store/product/${id}`)
      target.value = res
      return res
    }
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest('api/store/product')
    myProducts.value = res
    return res
  }
  
  async function fetchProducts(v, meth) {
    const { res, err } = await doRequest(`api/store/product/${meth == 'PUT' ? v.id : v}`, {
      method: meth,
      body: meth == 'PUT' ? v : false
    })
    return { res, err }
  }

  async function addProduct(item: Product) { 
    const { res, err } = await doRequest('api/store/product', {
      method: "POST",
      body: item
    })
    return { res, err }
  }

  async function editProduct(id, meth) {
    const { res, err } = await doRequest(`api/store/product/${meth == 'PUT' ? id.id : id}`, {
      method: meth,
      body: meth == 'PUT' ? id : false
    })
    return { res, err }
  }

  return { 
    getMyProducts,
    getStores,
    fetchStore,
    fetchProduct,
    fetchProducts,
    addProduct,
    editProduct,
  }

})
