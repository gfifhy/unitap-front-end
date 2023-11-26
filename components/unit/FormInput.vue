<script>
export default {
  props: {
    modelValue: String,
    type: String,
    name: String,
    min: Number,
    label: String,
    placeholder: String,
    hint: String,
    icon: String,
    disabled: Boolean,
  },
  methods: {
    updateText(e){
      this.$emit('update:modelValue', e.currentTarget.value)
    },
    clipboard(val) {
      navigator.clipboard.writeText(val)
    }
  }
};
</script>

<template><div>

  <FormLabel v-if="label" :hint="hint" :label="label" :disabled="disabled"/>

  <UInput @input="updateText" :value="modelValue"
    :type="type" :name="name" :placeholder="placeholder"
    :icon="icon" :disabled="disabled"
    size="xl" color="white" :min="min"
    :ui="{ icon: { trailing: { pointer: '' } } }">

    <template #trailing>

      <UButton v-show="modelValue !== ''" @click="modelValue = ''" v-if="!disabled"
        icon="i-heroicons-x-mark-20-solid" 
        color="gray" variant="link" 
        :padded="false" tabindex="-1"
      />

      <UButton @click="clipboard(modelValue)" v-else
        icon="i-heroicons-clipboard-20-solid" 
        color="gray" variant="link" 
        :padded="false" tabindex="-1"
      />

    </template>

  </UInput>

</div></template>

<style scoped>

[disabled="true"] {
  opacity: .3;
}

</style>