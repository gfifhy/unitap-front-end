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

  async function getTransfers(role) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest(`api/${role}/transfers`)
    return res
  }

  async function getRecentTransactions(role) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest(`api/${role}/transactions`)
    return res
  }

  return { 
    topUp,
    getTransfers,
    getRecentTransactions,
  }

})
