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
  const storeProducts = ref(null)
  const stores = ref(null)

  function $reset() {
    myProducts.value = null
    storeProducts.value = null
    stores.value = null
  }

  const getMyProducts = async () => {
    if (!myProducts.value) { 
      myProducts.value = await fetchStoreProduct()
    }
    return myProducts.value
  }

  const getStoreProducts = async (v) => {
    if (!storeProducts.value) { 
      storeProducts.value = await fetchStoreProduct(v)
    }
    return storeProducts.value
  }

  const getStores = async () => {
    if (!stores.value) { 
      stores.value = await fetchStore()
    }
    return stores.value
  }

  async function fetchStore(id) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/student/store${ id ? '/' + id : '' }`)
    return res
  }

  async function fetchProduct(id) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest(`api/student/product${ id ? '/' + id : '' }`)
    return res
  }

  async function fetchStoreProduct(id) {
    if (id) {
      const { res } = await doRequest(`api/store/product/${id}`)
      target.value = res
      return res
    }
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res } = await doRequest('api/store/product')
    return res
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

  async function orderProduct(val, role = 'student') {
    const { res, err } = await doRequest(`api/${role}/order-product`, {
      method: "POST",
      body: val
    })
    return { res, err }
  }

  async function getUserOrders(role = 'student') {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest(`api/${role}/orders`)
    return res
  }

  async function getStoreOrders() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest('api/store/orders')
    return res
  }

  async function setOrderAsFulfilled(val) {
    const { res, err } = await doRequest('api/store/order/fulfill', {
      method: "POST",
      body: { order_id: val }
    })
    return { res, err }
  }

  return { 
    $reset,
    getMyProducts,
    getStoreProducts,
    getStores,
    fetchStore,
    fetchProduct,
    fetchStoreProduct,
    addProduct,
    editProduct,
    orderProduct,
    getUserOrders,
    getStoreOrders,
    setOrderAsFulfilled,
  }

})
