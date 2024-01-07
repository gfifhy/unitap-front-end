<script setup lang="ts">

const counts = ref([{
  id: '',
  name: '',
  slug: '',
  count: '',
  x_pos: '',
  y_pos: '',
}])

onMounted(async () => {

  counts.value = // await useGuidanceStore().getLocationPopulations('admin')

  [{
    id: 'safsafkasfjlksajfsakh',
    name: 'Admin Building',
    slug: 'admin',
    count: 8,
    x_pos: '41.3',
    y_pos: '26',
  }, {
    id: 'asvbasbsaasn',
    name: 'Oval Entrance',
    slug: 'oval',
    count: 3,
    x_pos: '41.8',
    y_pos: '70',
  }, {
    id: 'fgdldltryl',
    name: 'Rear Entrance',
    slug: 'admin',
    count: 1,
    x_pos: '26',
    y_pos: '42.3',
  }, {
    id: 'safsafkasytlydlfjlksajfsakh',
    name: 'Exit',
    slug: 'admin',
    count: 1,
    x_pos: '83',
    y_pos: '57.4',
  }, {
    id: 'safsafkasfjlksajfsakh',
    name: 'Admin Building',
    slug: 'hpsb',
    count: 69,
    x_pos: '29.4',
    y_pos: '11',
  }]

})

</script>

<template><div id="heatmap" class="min-w-[800px] min-h-[0] flex flex-col items-center">

<NuxtImg src="/Campus-map_top.jpg" />

<div id="heat-map-content" class="relative">

  <template v-if="counts" v-for="i in counts">
    <MapDot 
      :location="i.slug"
      :count="i.count"
      :xPosition="i.x_pos"
      :yPosition="i.y_pos"  />
  </template>

  <NuxtImg class="aspect-video w-[1000px]" src="/Campus-map.jpg" />
  <h3 class="font-light text-xs justify-center m-0 bg-gray-800 rounded-b-md"><a href="https://www.umak.edu.ph/about/campus-map/" target="_blank">Artwork by Prof. Stanley Rovira.</a></h3>

</div>

</div></template>
