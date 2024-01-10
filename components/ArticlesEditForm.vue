<script setup>

const toast = useToast()
const isOpen = ref(false)
const loading = useState('loading', () => false)

const f = ref([])

const onDelete = v => {
  f.value.articleTitle = v
  isOpen.value = true
}


async function articleDelete() {
/*
  loading.value = true

  const { res, err } = await cms.deleteArticle(target.value.id, 'DELETE')
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
      title: 'Successfully deleted!',
      description: `Deleted ${f.value.articleTitle}`
    })
  }

  loading.value = false
*/
  isOpen.value = false
}


onMounted(() => {
  f.value = [
    {
      avatar: false,
      articleTitle: 'asfskahfaf',
      date: '69/420/360',
    },
    {
      avatar: false,
      articleTitle: '8329320g29gh3',
      date: '12/32/23',
    },
  ]
})

</script>

<template>

<div id='actions'>
  <div>
    <h3>Articles</h3>
  </div>
  <div class="buttons">

    <UButton label="New" icon="i-tabler-file-plus"
      @click=""/>

    <UPopover mode="hover">

      <UButton variant="soft" icon="i-heroicons-ellipsis-vertical-20-solid" 
        @click="" />

      <template #panel>
        <div class="ctxmenu">
          
          <UButton variant="ghost" icon="i-heroicons-beaker-solid"
            label="Test" 
            @click="" />

        </div>
      </template>

    </UPopover>
  </div>
</div>

<div id="interface">

  <template v-for="i in f">
    <ArticleEntry :label="i.articleTitle" :date="i.date" del 
      @onDelete="onDelete(i.articleTitle)" />
  </template>

</div>

<UModal v-model="isOpen" :transition="false">
  <UCard>
    <template #header>
      <span class="text-xl">Confirmation</span>
    </template>

    <p>Are you sure you want to delete the article <i>{{ f.articleTitle }}</i>?</p>

    <template #footer>
      <div class="flex justify-center gap-x-3">
        <UButton name="delete" color="red" label="Yes" variant="ghost" @click="articleDelete" />
        <UButton label="No" @click="isOpen = false"/>
      </div>
    </template>
    
  </UCard>
</UModal>

</template>