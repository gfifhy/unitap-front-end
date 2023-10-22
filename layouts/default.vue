<template>
  <div id="app">

    <SideNav />

    <main>
      <TopNav />
      <NuxtPage />
    </main>

  </div>
</template>


<style scoped>

#app {

  @apply flex h-screen w-screen overflow-hidden;
  
  flex-direction: var(--app-dir);

} 

main {

  @apply flex flex-col w-full overflow-auto

}

</style>