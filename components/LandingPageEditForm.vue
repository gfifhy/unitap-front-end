<script setup>

const $cfg = useAppConfig()

const tabs = [
  {
    key: 'section1',
    label: 'Upper'
  },
  {
    key: 'section2',
    label: 'Middle'
  },
  {
    key: 'section3',
    label: 'Lower'
  }
]

const radio = $cfg.radioYesNo

const u = ref($cfg.bannerTitleCardRef)
const m = ref($cfg.simpleTitleCardRef)
const mCards = ref([$cfg.smallAvatarCardRef])
const l = ref($cfg.bannerTitleCardRef)

const loading = ref(true)

const validate = state => {
  return validateForm(state, [
    //'id','role','first_name','last_name','email'
  ])
}

const onTab = e => {
  console.log(e)
}

const handleNewCard = () => {
  mCards.value.push($cfg.smallAvatarCardRef)
}

onMounted(async () => {

  [u.value, m.value, mCards.value, l.value] = await useCMSStore().getLanding(true)

  loading.value = false

})

async function submit(e) {

  loading.value = true

  var req = []

  if (e === 'section1' || e === 0) {
    req.push({
      type: 'upperLanding',
      value: u.value,
      is_disabled: false
    })
  }
  if (e === 'section2' || e === 0) {
    req.push({
      type: 'middleLanding',
      value: m.value,
      is_disabled: !!m.value.disabled
    })
    for (let i=0; i<mCards.value.length; ++i) {
      req.push({
        type: 'middleLanding_card',
        value: mCards.value[i],
        option: i
      })
    }
  }
  if (e === 'section3' || e === 0) {
    req.push({
      type: 'lowerLanding',
      value: l.value,
      is_disabled: !!l.value.disabled
    })
  }

  if (!req.length) { throw new Error('Request is empty.') }
  else {

    const { res, err } = await useCMSStore().editLanding(req)
    
    const toast = useToast()
    if (err) {
      toast.add({
        icon: "i-heroicons-exclamation-circle-20-solid",
        title: 'Operation failed!',
        description: err.message?.join('; '),
        color: 'red'
      })
    } else {
      toast.add({
        icon: "i-heroicons-check-circle-20-solid",
        title: "Operation successful!",
        description: 'Updated Landing Page.',
      })
    }

  }

  loading.value = false
  
}


</script>

<template>  <UTabs :items="tabs" class="w-full" @change="onTab">  <template #item="{ item }">

<UForm class="user" :validate="validate" :validateOn="['submit']" :state="u || m || l" @submit="submit(item.key)">

  <template v-if="item.key === 'section1'" class="space-y-3">

    <div id="double" class="gap-x-2">

      <section>

        <FilePicker v-model="u.img" @onFileSelect="u.imgurl = $event" label="Cover">
          <NuxtImg v-if="u.imgurl" class="max-h-[300px] overflow-y-auto"
            :src="u.imgurl.lastIndexOf('blob:', 0) === 0 ?
                  u.imgurl : 
                  $cfg.api.head + u.imgurl" />
        </FilePicker>

        <URadioGroup legend="Cover mode" :options="[
            {
              value: 'covered',
              label: 'Covered'
            },
            {
              value: 'tiled',
              label: 'Tiled'
            }
          ] " v-model="u.cover_mode" />

      </section>

      <aside class="grow">
        <FormInput placeholder="Title" icon="i-tabler-cursor-text"
          label="Title" type="text" name="title"
          v-model="u.title"
        />
        <FormInput placeholder="Subtitle" icon="i-tabler-cursor-text"
          label="Subtitle" type="text" name="subtitle"
          v-model="u.subtitle"
        />
        <UTextarea placeholder="Description" icon="i-tabler-cursor-text"
          label="Description" type="text" name="description"
          v-model="u.description"
        />
        <div class="sbs">
          <FormInput placeholder="Click Here" icon="i-tabler-cursor-text"
            label="Button Text" type="text" name="btn_txt"
            v-model="u.btn_txt"
          />
          <FormInput placeholder="/article/abcd" icon="i-tabler-cursor-text"
            label="Button Destination" type="text" name="btn_lnk" class="grow"
            v-model="u.btn_lnk"
          />
        </div>
      </aside>

    </div>

  </template>

  <template v-else-if="item.key === 'section2'" class="space-y-3">
    <div id="double">

      <section class="grow">
        <FormInput placeholder="Title" icon="i-tabler-cursor-text"
          label="Lead" name="mtitle"
          v-model="m.title"
        />
        <UTextarea placeholder="Subtitle" icon="i-tabler-cursor-text"
          name="msubtitle"
          v-model="m.subtitle"
        />
        <URadioGroup legend="Section disabled" :options="radio"
          v-model="m.disabled"
        />
      </section>

      <aside class="px-2">
        <template v-for="(i, k) in mCards" :key="k">

          <div class="sbs py-2">
            <FormLabel :label="'Card #' + (k + 1)" class="grow" />
            <UButton color="red" variant="ghost" icon="i-tabler-trash-x"
              @click="mCards.splice(k, 1)" v-if="mCards[1]" />
            <UButton label="Add card" variant="soft" icon="i-tabler-library-plus"
              @click="handleNewCard" v-if="k === 0"/>
          </div>

          <div class="sbs dark:bg-gray-900 bg-gray-100 rounded-xl p-3 ">

            <div class="max-h-[190px] max-w-[100px] overflow-hidden">
              <UAvatar size="3xl" class="avatar" :src="$cfg.api.head + i.imgurl" 
                v-if="i.imgurl" />
            </div>

            <div class="grow gap-y-2 flex flex-col">
              <FilePicker v-model="i.img" @onFileSelect="i.imgurl = $event" />
              <FormInput placeholder="Title" icon="i-tabler-cursor-text"
                type="text" name="ctitle"
                v-model="i.title" />
              <FormInput placeholder="Subtitle" icon="i-tabler-cursor-text"
                type="text" name="csubtitle"
                v-model="i.subtitle" />
            </div>

          </div>

        </template>
      </aside>
    </div>
  </template>


  <template v-else-if="item.key === 'section3'" class="space-y-3">

    <div id="double" class="gap-x-2">

      <section class="max-h-[300px] overflow-hidden">
        <FilePicker v-model="l.img" @onFileSelect="l.imgurl = $event" label="Cover">
          <NuxtImg 
            :src="l.imgurl.lastIndexOf('blob:', 0) === 0 ?
                  l.imgurl : 
                  $cfg.api.head + l.imgurl"
            v-if="l.imgurl" />
        </FilePicker>
      </section>

      <aside class="grow">
        <FormInput placeholder="Title" icon="i-tabler-cursor-text"
          label="Title" type="text" name="ltitle"
          v-model="l.title"
        />
        <FormInput placeholder="Subtitle" icon="i-tabler-cursor-text"
          label="Subtitle" type="text" name="lsubtitle"
          v-model="l.subtitle"
        />
        <UTextarea placeholder="Description" icon="i-tabler-cursor-text"
          label="Description" type="text" name="ldescription"
          v-model="l.description"
        />
        <div class="sbs">
          <FormInput placeholder="Click Here" icon="i-tabler-cursor-text"
            label="Button Text" type="text" name="lbtn_txt"
            v-model="l.btn_txt"
          />
          <FormInput placeholder="/article/abcd" icon="i-tabler-cursor-text"
            label="Button Destination" type="text" name="lbtn_lnk" class="grow"
            v-model="l.btn_lnk"
          />
        </div>
      </aside>

    </div>

    <URadioGroup legend="Section disabled" :options="radio"
      v-model="l.disabled" />

  </template>

  <footer>
    <span></span>
    <ColoredButton type="submit" label="apply" :disabled="loading"/>
  </footer>

</UForm>

</template></UTabs>

</template>


<style scoped>

button[name="delete"] {
  @apply text-rose-600;
  &:hover {
    @apply bg-rose-600/10
  }
}

</style>