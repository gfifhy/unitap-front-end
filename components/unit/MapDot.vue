<script>
export default {
  props: {
    count: String,
    location: String,
    name: String,
    xPosition: String|Number,
    yPosition: String|Number,
  }
};

</script>

<template>

<span 
  id="dot"
  :class="location + ` absolute -translate-x-1/2 -translate-y-1/2`"
  :style="{ top: yPosition+'%', left: xPosition+'%' }"
>

  <UPopover mode="hover" :popper="{ placement: 'top'}">

    <UButton color="white" class="h-8 w-8 rounded-full justify-center" size="2xs"
      :ui="{ size: { '2xs': 'text-[12px] leading-[0]' } }" :label="count"
    />
    <template #panel>
      <div class="p-2 whitespace-nowrap flex flex-col items-center">
        <span class="text-primary-500">{{ name }}</span>
        <span>{{ count }} <span class="text-gray-500">students</span></span>
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