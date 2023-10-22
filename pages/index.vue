<script setup>

definePageMeta({ 
  middleware: 'signed-out',
})

const route = useRoute()


</script>

<template>
  <h1>dasbnoard</h1>
  
  <p>Current route: {{ route.path }}</p>

</template>
