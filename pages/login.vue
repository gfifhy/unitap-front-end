<script setup lang="ts">

definePageMeta({ 
  middleware: 'signed-in',
})

</script>

<template><div id='login'>

<div id="double">

  <section>
    <NuxtImg src="/sex.jpg" />
  </section>

  <aside>

    <h1>welcome!</h1>

    <!--UDivider /--> <hr>

    <LoginForm />

  </aside>

</div>

</div></template>

<style scoped>

#login {
  @apply mt-auto mb-auto
}

#double {

  @apply flex flex-row h-full items-center;

  padding-left: var(--login-p);
  padding-right: var(--login-p);

  > aside {
    @apply flex flex-col justify-center h-full pl-10 pr-10;
  }
}

h1 {
  @apply text-5xl pb-4
}

section {

  @apply flex w-full rounded-xl overflow-hidden;
  
  max-height: var(--login-img-mh);

  > img {
    @apply h-full w-full object-cover
  }
}

</style>