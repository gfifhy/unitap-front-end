import { defineStore } from "pinia"

export const useCMSStore = defineStore('cms', () => {

  const landing = ref(null)

  const getLanding = async () => {
    if (!landing.value) await fetchLanding()
    return landing.value
  }
  
  async function fetchLanding() {
    await useFetch('http://0.0.0.0') // shit workaround for first fetch err
    let { res, err } = await doRequest('api/landing')
    landing.value = res 
    return { res, err }
  }

  async function editLanding(val) {
    const { res, err } = await doRequest('api/landing', {
      method: 'POST',
      body: convertForm(val)
    })
    return { res, err }
  }

  return { 
    getLanding,
    editLanding
  }

})

function convertForm(req) {
  const formData = new FormData();

  req.forEach((item, index) => {
    for (const [key, value] of Object.entries(item)) {
      if (key === 'value' && typeof value === 'object' && value !== null && !(value instanceof File)) {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          formData.append(`${index}.value[${nestedKey}]`, 
            Object.prototype.toString.call(nestedValue) === '[object Object]' ? 
            JSON.stringify(nestedValue) : nestedValue
          );
        }
      } else if (value instanceof File) {
        formData.append(`${index}.value[image]`, value, value.name);
      } else {
        formData.append(`${index}.${key}`, value);
      }
    }
  });

  return formData;
}