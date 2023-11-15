<script setup lang="ts">
useHead({ titleTemplate: 'UniTap' })
</script>

<template>
  <div id="app">

    <SideNav />

    <main>
      <NuxtPage class="content"/>
    </main>

    <UNotifications />

  </div>
</template>