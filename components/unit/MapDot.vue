<script>
export default {
  props: {
    count: String,
    location: String,
    xPosition: String|Number,
    yPosition: String|Number,
  }
};

</script>

<template>

<span id="dot" :class="location + 
  ` absolute -translate-x-1/2 -translate-y-1/2`"
  :style="{ top: yPosition+'%', left: xPosition+'%' }"
  >

  <UPopover mode="hover" :popper="{ placement: 'top' }">
    <UButton color="white" label="" class="p-3 rounded-full"/>

    <template #panel>
      <div class="p-2 whitespace-nowrap">
        {{ count }} <span class="text-gray-500">people</span>
      </div>
    </template>

  </UPopover>

</span>

</template>

<style scoped>

#dot:hover {
  z-index: 6;
}

</style>