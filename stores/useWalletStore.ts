import { defineStore } from "pinia"

export const useWalletStore = defineStore('wallet', () => {

  async function topUp(id) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest('api/admin/wallet/top-up', {
    	method: 'POST',
    	body: id
    })
    return { res, err }
  }

  return { 
    topUp,
  }

})
