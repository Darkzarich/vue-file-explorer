<template>
  <div class="folder-list-item">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
.folder-list-item {
  padding: 10px;
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #797979;
    cursor: pointer;
  }
}
</style>