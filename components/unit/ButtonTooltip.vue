<script>
export default {
  props: {
    text: String,
    variant: String,
    color: String,
    hotkey: String,
    icon: String,
    click: Function,
  }
};

</script>

<template>
  <UTooltip :text="text" :shortcuts="hotkey ? ['⌘', hotkey] : []" :popper="{ placement: 'right' }">
    <UButton :icon="icon" :color="color" :variant="variant" @click="click" />
  </UTooltip>
</template>


