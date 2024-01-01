<script setup lang="ts">
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const props = defineProps({
  modelValue: {
    type: Date,
    default: null
  }
})

const emit = defineEmits(['update:model-value', 'onClose'])

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const date = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:model-value', value)
    emit('onClose')
  }
})

const limit = (d: Date) => {
  d.setDate(d.getDate() - 1)
  return d
}

const disables = ref([{ start: null , end: limit(new Date) }]);

const attrs = [
  {
    key: 'today',
    dot: {
      color: 'green',
      fillMode: 'outline'
    },
    dates: new Date()
  },
]
const selectAttr = {
  highlight: {
    color: 'green',
    class: '!bg-green-100 dark:!bg-green-800'
  }
}

</script>

<template>
  <DatePicker
    v-model="date"
    mode="dateTime"
    transparent
    borderless
    is24hr
    :attributes="attrs"
    :select-attribute="selectAttr"
    :is-dark="isDark"
    title-position="left"
    trim-weeks
    hide-time-header
    :first-day-of-week="2"
    :disabled-dates="disables"
  />
</template>