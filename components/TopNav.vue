<script setup>

const account = useAuthStore()
const user = useUsersStore()
const online = useState('online', () => false)

onMounted(() => {
  online.value = computed(() => account.isLoggedIn)
});

const test = async () => {
  const a = await user.getViolations()
  console.log(a)
}

</script>


<template><nav class='ribbon'>

  <section class='proximal'>
    <Brand />
  </section>

  <section class='central' v-if="online">
    <UInput
      icon="i-heroicons-magnifying-glass-20-solid"
      size="md"
      :trailing="false"
      placeholder="Search..."
    />
    <div>welcome back, {{account.user.first_name +' '+ account.user.last_name }}</div>
     <UButton label="test" @click="test"/>
  </section>

  <section class='links' v-if="!online">
    <NuxtLink variant='ghost' to="/about">about</NuxtLink>
    <NuxtLink variant='ghost' to="/">blog</NuxtLink>
    <NuxtLink variant='ghost' to="/">pages</NuxtLink>
    <NuxtLink variant='ghost' to="/">contact</NuxtLink>
  </section>

  <section class='terminal' v-if="!online">
    <NuxtLink variant='ghost' to="/register">register</NuxtLink>
  </section>

  <section class='terminal' v-if="online">

  </section>

</nav></template>


<style scoped>

nav, section {
  @apply flex
}

nav {

  @apply justify-between flex-row w-full;

  height: var(--topnav-h);
  padding-top: var(--topnav-p);
  padding-bottom: var(--topnav-p);
  align-items: center;

}

a {

  @apply m-2 pl-2 pr-2 pt-1 pb-1 rounded-md inline-block relative overflow-hidden;

  @apply transition ease-in-out duration-300;

  &:hover {
    @apply scale-110
  }

  &::after {
    @apply absolute opacity-0 w-full left-0 bottom-0 h-0.5;
    content: '';
    opacity: 1;
    background: linear-gradient(90deg, var(--c-primary) 70%, var(--c-secondary));;
    transition: opacity 300ms, transform 300ms;
    @apply delay-100;
    transform: translate3d(-100%, 0, 0);
  }

  &:hover::after,
  &:focus::after {
    opacity: 1;
    transform: translate3d(0, 0.2em, 0);
    transform: translate3d(0, 0, 0);
  }

}

button {

  @apply w-10 m-2 justify-center;

  aspect-ratio: 1/1;

}

.central {
  @apply w-full h-full justify-start items-center p-4;
  > div {
    @apply m-2
  }
}

.proximal {
  display: var(--brand-top);
}

</style>
