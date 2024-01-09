<script setup lang="ts">

useHead({ titleTemplate: 'Transaction - UniTap' })

definePageMeta({ 
  middleware: 'signed-out',
})

</script>

<template><div id='transact'>

<section id="actions">
  <div>
    <h3>Transaction</h3>
  </div>
</section>

<section id="interface">
  <TransactionForm />
</section>

</div></template>

<style scoped>

#actions {
  
  @apply flex flex-wrap items-center justify-between;
  
  div {

    @apply m-1 pl-2 pr-2;

    button {
      @apply m-2;
    }
  }

}

#interface {
  @apply max-w-lg mx-auto px-4
}

  
</style>