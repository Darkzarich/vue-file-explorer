<template>
  <div class="folder-list-item">
    <div class="folder-list-item__left">
      <span class="folder-list-item__name">
        {{ folderItem.name }}
      </span>
    </div>
    <div class="folder-list-item__right">
      <div class="folder-list-item__date">
        {{ formattedDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: {
    folderItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    formattedDate() {
      if (this.folderItem.mtime) {
        return format(this.folderItem.mtime, "MM/dd/Y hh:mm:ss a");
      }
      return "";
    },
  },
};
</script>

<style lang="scss">
.folder-list-item {
  padding: 10px;
  transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__date {
    color: #797979;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: #797979;
    cursor: pointer;

    .folder-list-item__date {
      color: white;
    }
  }
}
</style>