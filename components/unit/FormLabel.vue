<script>
export default {
  props: {
    label: String,
    hint: String,
  }

};
</script>

<template>
  <div>
    <span>{{label}}</span><span>{{hint}}</span>
  </div>
</template>

<style scoped>

div {
  @apply flex justify-between py-1
}

span:last-child {
  opacity: .6;
}

</style>

