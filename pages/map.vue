<script setup>

useHead({ titleTemplate: 'Heat Map - UniTap' })

definePageMeta({ 
  middleware: ['signed-out'],
})

</script>

<template><div id="map">
 
<section id="actions">
  <div>
    <h3>Heat Map</h3>
  </div>
</section>

<HeatMap/>

</div></template>


<style scoped>

</style>