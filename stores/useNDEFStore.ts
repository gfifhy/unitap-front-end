
import { defineStore } from "pinia"

export const useNDEFStore = defineStore('ndef', () => {

  let ndef = null

  let hasNDEF = true

  const toast = useToast()

  const toastErrorNDEF = desc => {
    toast.add({
      icon: 'i-tabler-exclamation-circle',
      title: 'NFC card reading error.',
      color: 'orange',
      timeout: 10000,
      description: desc
    })
  }

  const toastUserScanned = (person = "Manny Pacquiao") => {
    toast.add({
      icon: 'i-tabler-user-scan',
      title: `Recognized ${person}`
    })
  }

  const noSupport = async () => {

    if (!hasNDEF) {
      return false
    }

    if (!ndef) {
      try {
        ndef = new NDEFReader()
        if (ndef) {
          hasNDEF = true
        }
      } catch (e) { 
        console.warn(e)
        toastErrorNDEF('This device or browser has no NFC scanner support.\n' + e)
        hasNDEF = false
        return true
      }
    } else { await ndef.stop() }

    return false
  }


  async function start() {

    if (await noSupport()) {
      return false
    }

    try {

      await ndef.scan();

      ndef.addEventListener("readingerror", () => {
        console.error('NDEFReader: readingerror')
        toastErrorNDEF()
      });

    } catch (e) { console.error(e); toastErrorNDEF(e) } finally {

      await ndef.stop()

    }

  }

  return {
    ndef,
    start,
  }

})


/* component.vue
const busyNDEF = ref(false)
const isScanning = ref(false)

async function startNFCScan() {

  const uNDEF = useNDEFStore()

  if (!uNDEF.start()) return;

  isScanning.value = true

  uNDEF.ndef.addEventListener("reading", async ({ message, serialNumber }) => {

    busyNDEF.value = true

    const [user_id, nfc_id] = message.records.map((record) => [
      (new TextDecoder()).decode(record.data),
      serialNumber,
    ]).flat()

    await uNDEF.ndef.stop()
    
    busyNDEF.value = false
    isScanning.value = false

    return [user_id, nfc_id]

  });

}*/