<template>
  <svg
    :style="`width: ${size}px; height: ${size}px`"
    :viewBox="`0 0 ${size} ${size}`"
  >
    <use :xlink:href="`#${name}`"></use>
  </svg>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    size: {
      type: Number,
      default: 24,
    },
  },
};
</script>