<template>
  <div
    class="folder-list-item"
    :class="folderItem.protected ? 'folder-list-item--protected' : ''"
  >
    <div class="folder-list-item__left">
      <div class="folder-list-item__icon">
        <BaseIcon :name="icon" />
      </div>
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
import extensionToIcon from "./../utils/extensionToIcon";
import BaseIcon from "./Base/BaseIcon";

export default {
  components: {
    BaseIcon,
  },
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
    icon() {
      return extensionToIcon(this.folderItem);
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

  &--protected {
    opacity: 0.5;
  }

  &__left {
    display: flex;
    align-items: center;
  }

  &__icon {
    color: #797979;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin-right: 10px;
    position: relative;
    top: 2px;
  }

  &__date {
    color: #797979;
    transition: color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: #797979;
    cursor: pointer;

    .folder-list-item__date,
    .folder-list-item__icon {
      color: white;
    }
  }
}
</style>