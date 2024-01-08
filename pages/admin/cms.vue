<template><div id='cms'>

<section id='landing'>
  <div id='actions'>
    <div>
      <h3>Landing Page</h3>
    </div>
  </div>

  <div id="interface">
    <LandingPageEditForm />
  </div>
</section>

<div id="double">
  
  <section id='articles' v-if="false">
    <ArticlesEditForm />
  </section>

  <section id='notifications'>
    <PushNotificationForm />
  </section>

</div>

</div></template>


<style scoped>

:deep(#actions) {
  
  @apply flex flex-wrap items-center justify-between;
  
  > div {

    @apply flex items-center m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}

:deep(#interface) {
  @apply px-4 flex flex-col gap-y-2
}


</style>