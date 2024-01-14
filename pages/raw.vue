<script setup>

definePageMeta({ 
  layout: 'raw',
  middleware: 'signed-out',
})

const loading = ref(true)
const analytics = useAnalyticsStore()

const gViolations = ref({})
const gViolationTypes = ref([])



const setViolationTypes = async () => {


  if (!gViolationTypes.value.length) {

    loading.value = true

    const res = await analytics.fetchViolations('m', true)
    
    const filtered = []

    res.forEach((v, k) => {
      filtered.push({...buildGraphData(v.data, 5), type: v.violationType})
    })

    gViolationTypes.value = filtered

  }

  loading.value = false

}

onMounted(async () => {


  const styleSheet = document.createElement("style")

  styleSheet.innerText = `
    body > #app {
      display: block !important; 
      height: unset !important;
      width: unset !important;
    }
  `

  document.head.appendChild(styleSheet)

  useColorMode().value = 'light'

  gViolations.value = buildGraphData(await analytics.fetchViolations('m'), 6)

  loading.value = false
  await setViolationTypes().then(() => {
    setTimeout(() => {
      window.print();
    }, 500)
  })
  
  window.onafterprint = window.close;


})


</script>

<template>

<h3>Student Violations Statistic</h3>
<div class="text-center">

<h4>Overall past month</h4>
<Chart :loading="loading" class="mx-auto"
  :datasets="gViolations.datasets"
  :grid="gViolations.grid"
  :labels="gViolations.labels"
/>

<table v-if="gViolations.labels" class="mx-auto">
  <tr>
    <th v-for="i in gViolations.labels.xLabels">{{ i }}</th>
  </tr>
  <tr v-for="(i, k) in gViolations.datasets" :key="k">
    <td v-for="v in i.data">{{ v }} people</td>
  </tr>
</table>

<h4>By type</h4>
<div class="py-6" v-for="(i, k) in gViolationTypes" :key="k">
  <UBadge color="gray" size="lg">{{ i.type }}</UBadge>
  <Chart :loading="loading"
    :datasets="i.datasets"
    :grid="i.grid"
    :labels="i.labels"
  />
  <table v-if="i.labels" class="mx-auto">
    <tr>
      <th v-for="p in i.labels.xLabels">{{ p }}</th>
    </tr>
    <tr v-for="(p, k) in i.datasets" :key="k">
      <td v-for="v in p.data">{{ v }} people</td>
    </tr>
  </table>
</div>

</div>

</template>


<style scoped>

  h4 {
    @apply mx-auto
  }

div > svg {
  @apply max-w-[600px] max-h-[200px]
}

:deep(.vtc) {
  @apply w-[500px] h-[200px] mx-auto
}

table {
  display: flex;
  justify-content: center;
  align-items: center;
}
tbody {
  display: flex;
  width: 800px;
  position: relative;
  align-items: stretch;
  border: 1px solid black;
  
}
tr {
  flex-basis: 33.33333333%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 5px 10px;
 
  &:first-child > th {
    @apply justify-end
  }
}
tr + tr {
border-left: 1px solid black;
}

th, td {
  flex-basis: 100%;
  text-align: left;
  display: flex;
  padding: 2px;
  
}
th {
  font-weight: bold;
}

</style>