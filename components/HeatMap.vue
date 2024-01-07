<script lang="ts">

</script>

<template>
  asd <br>
  asd <br>
  asd <br>
  asd <br>
  asd <br>
  asd <br>
  asd <br>
  asd <br>
  <div  class="main relative" >
      <UPopover :popper="{ placement: 'auto' }" class="HPSB absolute top-[168px] left-[270px]">
        <UButton color="white" label="" class="p-3 rounded-full"/>
        <template #panel>
          <div class="p-4">
            <Placeholder class="h-20 w-48" />
            asdadasdsad
          </div>
        </template>
      </UPopover>


    <img src="/Campus-map.jpg"/>
    <h3 class="font-light text-xs justify-center m-0 bg-gray-800 rounded-b-md"><a href="https://www.umak.edu.ph/about/campus-map/" target="_blank">Artwork by Prof. Stanley Rovira.</a></h3>
  </div>
</template>

<style scoped>
</style>