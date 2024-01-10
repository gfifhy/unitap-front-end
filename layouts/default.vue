<script setup lang="ts">
useHead({ titleTemplate: 'UniTap' })
</script>

<template>

  <SideNav />

  <main>
    <slot/>
  </main>

  <UNotifications />

</template>