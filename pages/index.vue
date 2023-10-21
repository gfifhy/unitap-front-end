<script setup>
const route = useRoute()

definePageMeta({ 
  middleware: 'signed-out',
})

</script>

<template>
  <div>
    <NuxtLink to="/about">About</NuxtLink>
    <NuxtLink to="/login">Login</NuxtLink>
    <NuxtLink to="/register">Register</NuxtLink>
    
    <h1>Nuxt Routing set up successfully!</h1>
    <p>Current route: {{ route.path }}</p>
    <a href="https://nuxt.com/docs/getting-started/routing" target="_blank">Learn more about Nuxt Routing</a>
  </div>
</template>
