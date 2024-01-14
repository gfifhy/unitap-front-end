import { defineStore } from "pinia"

export const useCMSStore = defineStore('cms', () => {

  const landing = ref(null)
  const logoText = ref(null)

  const notifications = ref(null)
  const myNotifications = ref(null)

  function $reset() {
    notifications.value = null
    myNotifications.value = null
  }

  const getLogoText = async () => {
    if (!logoText.value) logoText.value = await fetchLogoText()
    return logoText.value
  }
  const getLanding = async isAdmin => {
    if (!landing.value) {
      const { res, err } = await fetchLanding(isAdmin)
      landing.value = res
    }
    const def = { disabled: 1 }
    return [
      JSON.parse(landing.value.find(x => x.type === 'upperLanding').value),
      JSON.parse(landing.value.find(x => x.type === 'middleLanding')?.value ?? false) || def,
      landing.value.reduce((filter, item) => {
        const val = JSON.parse(item.value) || {};
        if (item.type === "middleLanding_card") {
          filter.push(val);
        }
        return filter;
      }, []),
      JSON.parse(landing.value.find(x => x.type === 'lowerLanding')?.value ?? false) || def,
    ]
  }

  const getNotifications = async (refresh: Boolean = false, opt) => {
    if (refresh || !notifications.value) {
      const { res, err } = await fetchNotifications(opt)
      notifications.value = res
    }
    return notifications.value
  }

  const getMyNotifications = async (refresh: Boolean = false, opt) => {
    if (refresh || !myNotifications.value) {
      const { res, err } = await fetchNotifications(opt)
      myNotifications.value = res
    }
    return myNotifications.value
  }

  async function editLanding(val) {
    const { res, err } = await doRequest('api/landing', {
      method: 'POST',
      body: convertForm(val, 1, 'value')
    })
    return { res, err }
  }

  async function addNotification(val) {
    const { res, err } = await doRequest('api/notification', {
      method: 'POST',
      body: convertForm(val, 0)
    })
    return { res, err }
  }

  async function deleteNotification(id) {
    const { res, err } = await doRequest(`api/notification/${id}`, {
      method: 'DELETE'
    })
    return { res, err }
  }

  async function markNotification(id) {
    const { res, err } = await doRequest(
      `api/notification/${id ? 'mark-read/' + id : 'mark-read-all'}`
    )
    return { res, err }
  }

  async function fetchLogoText() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest('api/site/logotext')
    return res
  }


  async function setSitePicture(val) {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    const { res, err } = await doRequest('api/site/pictures', {
      method: 'POST',
      body: convertForm(val, 0)
    })
    return { res, err }
  }

  return { 
    $reset,
    getLanding,
    editLanding,
    getNotifications,
    getMyNotifications,
    addNotification,
    deleteNotification,
    markNotification,
    getLogoText,
    setSitePicture
  }

})

async function fetchLanding(isAdmin) {
  await useFetch('http://0.0.0.0') // shit workaround for first fetch err
  const { res, err } = await doRequest(`api/landing${isAdmin ? '/all' : ''}`)
  return { res, err }
}

async function fetchNotifications(opt) {
  await useFetch('http://0.0.0.0') // shit workaround for first fetch err
  const { res, err } = await doRequest(`api/notification${opt ? '/' + opt : ''}`)
  return { res, err }
}
