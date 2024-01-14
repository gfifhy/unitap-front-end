<script setup>

useHead({ titleTemplate: 'Push Notifications - UniTap' })

definePageMeta({ 
  middleware: ['signed-out', 'admin'],
})

</script>

<template><div id='push_notifs'>

<PushNotificationForm />

</div></template>