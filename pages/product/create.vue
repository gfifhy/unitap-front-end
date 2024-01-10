<script setup lang="ts">

useHead({ titleTemplate: 'Create Product - UniTap' })

definePageMeta({ 
  middleware: 'store',
})

</script>

<template><div id='createproduct'>

<section id="actions">

  <div>
    <h3>Create Product</h3>
  </div>

  <div class="buttons">

    <UButton label="back to my shop"
      variant="ghost" icon="i-heroicons-arrow-long-left"
      @click="navigateTo('/myshop')"
    />
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
  <CreateProductForm />
</section>

</div></template>

<style scoped>

#actions {
  
  @apply flex flex-wrap items-center justify-between;
  
  div {

    @apply m-1 pl-2 pr-2 flex;

    button {
      @apply m-2;
    }
  }

}

#interface {
  @apply max-w-lg mx-auto px-4
}

  
</style>