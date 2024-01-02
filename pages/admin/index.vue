<template><div id='adminpanel'>

<section id='actions'>
  <div>
    <h3>Admin Panel</h3>
  </div>
  <div class="buttons">
    <UPopover mode="hover">

      <UButton variant="soft" icon="i-heroicons-ellipsis-vertical-20-solid" 
        @click="" />

      <template #panel>
        <div class="ctxmenu">
          
          <UButton variant="ghost" icon="i-heroicons-beaker-solid"
            label="Test" 
            @click="" />

        </div>
      </template>

    </UPopover>
  </div>
</section>

<section id="interface">
  <div id="items">
    <UButton variant="outline" label="Manage Users" icon="i-tabler-users-group"
      @click="navigateTo('admin/manage')" />
    <UButton variant="outline" label="CMS" icon="i-tabler-brackets-contain-end"
      @click="navigateTo('admin/cms')" />
    <!--UButton label="Logs" icon="i-tabler-report"
      @click="navigateTo('admin/log')" />
    <UButton label="System" icon="i-tabler-robot"
      @click="navigateTo('admin/system')" /-->
  </div>
</section>

</div></template>


<style scoped>

#actions,
#items {
  @apply flex flex-wrap;
}

#actions {
  
  @apply items-center justify-between;
  
  div {

    @apply flex items-center m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}

#items {
  --mw: 15rem;

  @apply 
    mx-auto px-3 max-w-[1366px] grid gap-x-4 gap-y-4
    grid-cols-[repeat(auto-fill,minmax(var(--mw),1fr))]
  ;

  :deep(button) {
    > span:first-child {
      @apply w-14 h-14;
      + span {
        @apply text-xl 
      }
    }
  }
}
@media screen only and (max-width: 535px) {
  #items {
    --mw: 10rem
  }
}

</style>