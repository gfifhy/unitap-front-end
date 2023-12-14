<script setup lang="ts">

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

const radio = [
  {
    value: 1,
    label: 'Yes'
  },
  {
    value: 0,
    label: 'No'
  }
]


const u = ref({
  coverimg: '',
  coverimgurl: null,
  title:'',
  subtitle:'',
  description:'',
  btn_txt:'',
  btn_lnk:'',
  disabled: '',
})
const m = ref({
  title:'',
  subtitle:'',
  disabled: '',
  cards: [
    {
      title: '',
      subtitle: '',
      avatar: null,
      avatarurl: '',
    }
  ]
})
const l = ref({
  title:'',
  subtitle:'',
  disabled: '',
  cards: [
    {
      title: '',
      subtitle: '',
      avatar: null,
      avatarurl: '',
    }
  ]
})

const loading = ref(false)

const validate = state => {
  return validateForm(state, [
    //'id','role','first_name','last_name','email'
  ])
}

const onTab = e => {
  console.log(e)
}

const handleNewCard = () => {
  m.value.cards.push({
    ctitle: '',
    csubtitle: '',
    avatar: '',
    avatarurl: '',
  })
}

/*
onMounted(() => {

})*/

async function submit(e) {

  loading.value = true

  const toast = useToast()

  if (e === 'section1') {
    const { res, err } = await users.editUser(m.value, "PUT")
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
        title: "User updated!",
        description: `Updated info for ${res.email}`,
      })
    }
    loading.value = false
  }

}

async function test() {
  console.log('bet');
}

</script>

<template>  <UTabs :items="tabs" class="w-full" @change="onTab">  <template #item="{ item }">

<UForm class="user" :validate="validate" :validateOn="['submit']" :state="u || m || l" @submit="submit(item.key)">

  <template v-if="item.key === 'section1'" class="space-y-3">

    <div id="double" class="gap-x-2">

      <section class="max-h-[300px] overflow-hidden">
        <FilePicker v-model="u.coverimg" @onFileSelect="u.coverimgurl = $event" label="Cover">
          <NuxtImg :src="u.coverimgurl" v-if="u.coverimgurl" />
        </FilePicker>
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

    <URadioGroup legend="Section disabled" :options="radio"
      v-model="u.disabled" />

  </template>

  <template v-else-if="item.key === 'section2'" class="space-y-3">
    <div id="double">

      <section class="grow">
        <FormInput placeholder="Title" icon="i-tabler-cursor-text"
          label="Lead" name="title"
          v-model="m.title"
        />
        <UTextarea placeholder="Subtitle" icon="i-tabler-cursor-text"
          name="subtitle"
          v-model="m.subtitle"
        />
        <URadioGroup legend="Section disabled" :options="radio"
          v-model="m.disabled"
        />
      </section>

      <aside class="px-2">
        <template v-for="(i, k) in m.cards" :key="k">

          <div class="sbs py-2">
            <FormLabel :label="'Card #' + (k + 1)" class="grow" />
            <UButton color="red" variant="ghost" icon="i-tabler-trash-x"
              @click="m.cards.splice(k, 1)" v-if="m.cards[1]" />
            <UButton label="Add card" variant="soft" icon="i-tabler-library-plus"
              @click="handleNewCard" v-if="k === 0"/>
          </div>

          <div class="sbs dark:bg-gray-900 bg-gray-100 rounded-xl p-3 ">

            <div class="max-h-[190px] max-w-[100px] overflow-hidden">
              <UAvatar size="3xl" class="avatar" :src="i.avatarurl" 
                v-if="i.avatarurl" />
            </div>

            <div class="grow gap-y-2 flex flex-col">
              <FilePicker v-model="i.avatar" @onFileSelect="i.avatarurl = $event" />
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

    <div id="double">

      <section class="grow">
        <FormInput placeholder="Title" icon="i-tabler-cursor-text"
          label="Lead" name="title"
          v-model="l.title"
        />
        <UTextarea placeholder="Subtitle" icon="i-tabler-cursor-text"
          name="subtitle"
          v-model="l.subtitle"
        />
        <URadioGroup legend="Section disabled" :options="radio"
          v-model="l.disabled"
        />
      </section>

      <aside class="px-2">
        <template v-for="(i, k) in l.cards" :key="k">

          <div class="sbs py-2">
            <FormLabel :label="'Card #' + (k + 1)" class="grow" />
            <UButton color="red" variant="ghost" icon="i-tabler-trash-x"
              @click="l.cards.splice(k, 1)" />
            <UButton label="Add card" variant="soft" icon="i-tabler-library-plus"
              @click="handleNewCard" v-if="k === 0"/>
          </div>

          <div class="sbs dark:bg-gray-900 bg-gray-100 rounded-xl p-3 ">

            <div class="max-h-[190px] max-w-[100px] overflow-hidden">
              <UAvatar size="3xl" class="avatar" :src="i.avatarurl" 
                v-if="i.avatarurl" />
            </div>

            <div class="grow gap-y-2 flex flex-col">
              <FilePicker v-model="i.avatar" @onFileSelect="i.avatarurl = $event" />
              <FormInput placeholder="Title" icon="i-tabler-cursor-text"
                type="text" :name="'ctitle_' + k"
                v-model="i.ctitle" />
              <FormInput placeholder="Subtitle" icon="i-tabler-cursor-text"
                type="text" :name="'csubtitle' + k"
                v-model="i.csubtitle" />
            </div>

          </div>

        </template>
      </aside>
    </div>

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