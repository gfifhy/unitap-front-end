<script>
export default {
  props: {
    modelValue: Boolean,
    label: String,
    desc: String,
    footLabel: String,
    footDesc: String,
    icon: String,
  },
  methods: {
    updateValue(e){
      this.$emit('update:modelValue', e.currentTarget.value)
    },
    footTrigger(){
      this.$emit('footTriggered')
    },
  }
};
</script>

<template>

  <UCard id="setting">
    <div class="content">
      <ul>
        <li>{{label}}</li>
        <li class="desc">{{desc}}</li>
      </ul>
      
      <UToggle
        onIcon="i-heroicons-check-20-solid"
        offIcon="i-heroicons-x-mark-20-solid"
        :modelValue="modelValue" @click="modelValue = !modelValue"
        @change="updateValue"
      />
    </div>

    <template #footer v-if="modelValue && footLabel">
      <div class="foot">
        <span class="desc">{{footDesc}}</span>
        <UButton variant="soft" :icon="icon" :label="footLabel" 
          @click="footTrigger"/>
      </div>
    </template>

  </UCard>


</template>

<style scoped>

#setting {
  @apply my-3;

  .foot,
  .content {
    @apply flex justify-between items-center
  }

  .desc {
    @apply text-gray-500
  }

}

</style>