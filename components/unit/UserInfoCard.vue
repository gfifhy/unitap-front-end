<script>
export default {
  props: {
    user: Object,
    editButton: Boolean,
  },
  methods: {
    editClick() {
      this.$emit('editClicked')
    },
  }
};
</script>

<template>

  <UCard id='u-entry'>

    <UButton id='edit'
      variant="ghost" icon="i-heroicons-pencil-square-20-solid"
      v-if="editButton" @click="editClick"
    />
    <UAvatar id='avatar' :src="user?.imgurl || user?.user_image" size="md" />

    <template #footer>
      <span id='name'>{{user?.first_name +' '+user?.last_name}}</span>
      <span id='role'>{{user?.role?.name}}</span>
    </template>

  </UCard>

</template>

<style>

#u-entry {
  @apply h-[210px];
  --avatar-sz: 6em;
  --edit-pos: absolute;

  div {
    padding: var(--card-p, 1rem);
  }

  > div:first-of-type {
    @apply flex justify-center items-center relative;

    > #edit {
      @apply z-[2] justify-center top-0 right-0 m-2;
      position: var(--edit-pos);
      > span {
        @apply w-6 h-6
      }
    }

    > span {
      @apply h-[var(--avatar-sz)] w-[var(--avatar-sz)];
      #avatar {
        @apply w-full h-full object-cover
      }
    }

    + div {
      @apply flex flex-col justify-center;

      #name {
        @apply text-primary-400 truncate
      }

      #role {
        @apply text-gray-400
      }

    }

  }

}

@media (max-width: 521px) {
  #u-entry {
    --card-p: .4em;
    --avatar-sz: 3em;
    --edit-pos: relative;
    @apply flex flex-row h-[70px]
  }
}
</style>