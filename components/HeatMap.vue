<script setup lang="ts">

const counts = ref(false)

onMounted(async () => {

  counts.value = await useGuidanceStore().getLocationPopulations('admin')

})

</script>

<template><div id="heatmap" class="min-w-[800px] min-h-[0] flex flex-col items-center">

<NuxtImg src="/Campus-Map_top.jpg" />

<div id="heat-map-content" class="relative">

  <template v-if="counts" v-for="i in counts">
    <MapDot 
      :name="i.location"
      :location="i.location_slugs"
      :count="i.count"
      :xPosition="i.x_pos"
      :yPosition="i.y_pos"  />
  </template>

  <NuxtImg class="aspect-video w-[1000px]" src="/Campus-Map.jpg" />
  <h3 class="font-light text-xs justify-center m-0 bg-gray-800 rounded-b-md"><a href="https://www.umak.edu.ph/about/campus-map/" target="_blank">Artwork by Prof. Stanley Rovira.</a></h3>

</div>

</div></template>
