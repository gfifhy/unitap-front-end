<script>

export default {
	emits: ['update:modelValue', 'onFileSelect'],
  props: {
    modelValue: String,
    label: { default: 'Image', type: String },
  },
  methods: {
    onFileSelect(e) {
		  const file = e.target.files[0]
		  if (file) {
      	this.$emit('update:modelValue', file)
      	this.$emit('onFileSelect', URL.createObjectURL(file))
		  } else {
		  	this.$emit('onFileSelect', null)
		  }
    }
  }
}

</script>

<template>

  <FormLabel :label="label" />
  <UInput type="file" name="image" accept="image/*" 
    @change="onFileSelect" />

  <div id="preview" class="max-w-[240px] mx-auto">
    <slot></slot>
  </div>

</template>

<style scoped>

:deep(input[type=file]) {
  &::file-selector-button {
    @apply border-transparent bg-primary-950
           text-primary cursor-pointer px-2 py-1 rounded-[0.2em]
    ;
    
    &:hover {
      @apply bg-primary-900 text-gray-100
    }

  }
}

</style>
