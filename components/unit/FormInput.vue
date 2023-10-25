<script>
export default {
  props: {
    modelValue: String,
    type: String,
    name: String,
    label: String,
    placeholder: String,
    hint: String,
    icon: String
  },
  methods: {
    updateText(e){
      this.$emit('update:modelValue', e.currentTarget.value)
      console.log(e.currentTarget.value)
    }
  }
};
</script>

<template>

  <FormLabel :hint="hint" :label="label" />

  <UInput v-model="val" @input="updateText" :value="modelValue"
    :type="type" :name="name" :placeholder="placeholder"
    :icon="icon" 
    size="lg" color="white" 
    :ui="{ icon: { trailing: { pointer: '' } } }">

    <template #trailing>
      <UButton v-show="modelValue !== ''" @click="modelValue = ''"
        icon="i-heroicons-x-mark-20-solid" 
        color="gray" variant="link" 
        :padded="false" tabindex="-1"
      />
    </template>

  </UInput>

</template>

