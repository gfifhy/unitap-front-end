<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
  }
};
</script>

<template>
  <button>
    <span class="circle" aria-hidden="true">
      <span class="icon arrow"></span>
    </span>
    <span class="button-text">{{label}}</span>
  </button>
</template>

<style scoped>

button { /* Major execution button */
  --t: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  @apply w-48 h-auto p-0 border-0 rounded-xl relative inline-block no-underline text-[inherit] cursor-pointer align-middle;
  outline: none;
  background-color: var(--l08);
  font-family: inherit;

  .circle {
    @apply relative block w-12 h-12 m-0 
    rounded-lg;
    transition: var(--t);
    .icon {
      @apply absolute m-auto inset-y-0;
      transition: var(--t);
      background: #fff;
      &.icon.arrow {
        @apply h-0.5 left-2.5;
        transition: var(--t);
        width: 1.125rem;
        background: unset;
      }
      &.icon.arrow::before {
        transition: var(--t);
        @apply absolute content-[""]
          top-[-0.25rem] w-2.5 h-2.5 rotate-45
          border-r-2 border-t-2 
          border-solid
          right-px;
          border-top-color: var(--c-primary);
          border-right-color: var(--c-primary);
      }
    }
  }
  .button-text {
    @apply absolute font-bold leading-[1.6] text-center px-0 py-3 inset-0;
    transition: var(--t);
    margin: 0 0 0 1.85rem;
    color: var(--la0);
  }

  &:hover {
    --c-arr: #000;
    .circle {
      width: 100%;
      background: var(--c-tertiary);
      .icon.arrow {
        background: var(--c-arr);
        transform: translate(1rem, 0);
         &::before {
          border-top-color: var(--c-arr);
          border-right-color: var(--c-arr);
         }
      }
    }
    .button-text {
      color: var(--c-arr);
    }
  }
  
}
</style>
