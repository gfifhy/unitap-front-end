<script setup>

definePageMeta({ 
  middleware: 'signed-out',
})

const route = useRoute()


</script>

<template>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/register">Register</NuxtLink>
    <h1>dasbnoard</h1>
    
    <p>Current route: {{ route.path }}</p>

</template>
