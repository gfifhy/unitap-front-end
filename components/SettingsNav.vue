<script setup>

const emit = defineEmits(['itemClicked'])

const click = () => emit('itemClicked')

const links = ref([{
  label: 'Profile',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/0'
  },
  badge: '',
  click, to: './profile'
}, {
  label: 'Security',
  icon: 'i-heroicons-shield-check',
  click, to: './security'
}])

onMounted(() => {
  const account = useAuthStore()
  links.value[0].badge = account.user.role.name
})

</script>

<template>

  <UVerticalNavigation :links="links" />

</template>

<style scoped>

:deep(a) {
  @apply text-[16px] py-2;

  > span:first-of-type {
    @apply w-6 h-6;
    > img {
      @apply w-6 h-6;
    }
  }
}

</style>