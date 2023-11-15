<script setup>

const actions = i => {
  return [
    { variant: 'solid', color: 'primary', label: 'Action', click: () => alert(i) },
    { variant: 'soft', color: 'primary', label: 'Action', click: () => alert('bsabsabs') }
  ]
}

</script>

<template><div id="notifications">

<UNotification
  v-for="i in 3"
  :id="i"
  :actions="actions(i)"
  :avatar="{ src: 'https://avatars.githubusercontent.com/u/0?v=4' }"
  title="Notification"
  description="This is a notification."
  :timeout="0"
/>

</div></template>

<style scoped>

#notifications {
  @apply w-[400px]
}

@media only screen and (max-width: 500px) {
  #notifications {
    @apply w-[300px]
  }
}

</style>