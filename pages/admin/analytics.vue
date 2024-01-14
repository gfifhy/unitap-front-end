<script setup lang="ts">

useHead({ titleTemplate: 'Analytics - UniTap' })

definePageMeta({ 
  middleware: ['signed-out', 'admin'],
})

const analytics = useAnalyticsStore()
const loading = ref(true)

const test = ref({})
const gViolations = ref({})
const gViolationTypes = ref([])
const violationsType = ref(false)


const setViolationTypes = async () => {

  violationsType.value = !violationsType.value

  if (violationsType.value && !gViolationTypes.value.length) {

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

  gViolations.value = buildGraphData(await analytics.fetchViolations('m'), 6)

  loading.value = false

})

</script>

<template><div id='adminpanel'>

<section id='actions'>
  <div>
    <h3>Analytics</h3>
  </div>
</section>

<section id="interface">
  <div id="graphs" class="max-w-5xl mx-auto">

    <section id='actions'>
      <div>
        <h4>Student Violations</h4>
      </div>
      <div class="buttons gap-x-3">
        <UButton variant="soft" label="Switch view"
          icon="i-tabler-filter-filled"
          @click="setViolationTypes" />
        <UButton variant="solid" label="Export to PDF"
          icon="i-heroicons-arrow-down-on-square-stack-20-solid"
          @click="navigateTo('/raw', { open: { target: '_blank' } })"/>
      </div>
    </section>

    <div class="text-center">

      <template v-if="violationsType">

        <h5>By type</h5>

        <div class="py-6" v-for="(i, k) in gViolationTypes" :key="k">
          <UBadge color="gray" size="lg">{{ i.type }}</UBadge>
          <Chart :loading="loading"
            :datasets="i.datasets"
            :grid="i.grid"
            :labels="i.labels"
          />

        </div>

      </template>

      <template v-else>
        <h5>Overall past month</h5>
        <Chart :loading="loading"
          :datasets="gViolations.datasets"
          :grid="gViolations.grid"
          :labels="gViolations.labels"
        />
      </template>
    </div>

  </div>
</section>

</div></template>



<style scoped>

#graphs {
  > h4:not(:first-child) {
    @apply pt-9
  }
}

</style>