<script>
export default {
  props: ['name','desc','price','img', 'stock']
};
</script>

<template>

  <UCard id='i-entry'>

    <NuxtImg id='img' :src="img" :title="price +' '+ name"/>

    <template #footer>
      <span id='name'>{{ name }} <span class="opacity-20">{{ stock }} left</span></span>
      <span id='price'>₱{{ price }}</span>
    </template>

  </UCard>

</template>

<style scoped>

#i-entry {

  @apply h-[320px] cursor-pointer;

  > :deep(div:first-of-type) {
    @apply p-0 h-[230px] overflow-hidden;
    > img {
      @apply object-cover h-full w-full
    }
  }

  > :deep(div:last-child) {
    @apply bg-[var(--l10)] flex flex-col;

    #name {
      @apply text-ellipsis whitespace-nowrap overflow-hidden;
    }
    
    #price {
      @apply text-primary text-[length:140%]
    }
  }

}

</style>