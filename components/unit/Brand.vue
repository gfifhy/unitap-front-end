<script setup>

const $cfg = useAppConfig()

const text = ref({
  head: null,
  tail: null
})

onMounted(async () => {

  const customtext = await useCMSStore().getLogoText()
  if (customtext) {
    text.value = JSON.parse(customtext)
  } 

})

</script>

<template>
  <div class='brand'>
    <span>{{ text.head ?? 'Uni' }}</span><span>{{ text.tail ?? 'Tap' }}</span>
  </div>
</template>

<style scoped>
div {

  background: linear-gradient(0deg, var(--c-tertiary), var(--c-secondary), var(--c-quinary), var(--c-quaternary), var(--c-primary));
  background-size: 1000% 1000%;
  background-position: 43% 0%;

  @apply flex h-full items-center bg-clip-text text-transparent pl-1 select-none;
  @apply transition ease-in-out duration-300;

  > span {
    @apply text-2xl uppercase tracking-[2px] leading-none;

    &:first-child {
      @apply font-extrabold;
    }
  }

  &:hover{
    animation: colored 10s ease infinite;
  }

}
</style>