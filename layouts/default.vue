<template>
  <div id="app">

    <nav>
      <Navigation />
    </nav>

    <main>
      <NuxtPage />
    </main>

  </div>
</template>


<style scoped>

#app {

  @apply flex-row

} #app.guest {

    @apply flex-col

  } 

nav {

  @apply flex justify-between flex-col w-16 h-screen;

  align-items: center;

} .guest nav {

    @apply  flex-row h-16 w-full;

  }

</style>