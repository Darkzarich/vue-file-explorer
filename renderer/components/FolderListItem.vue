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
      if (this.folderItem.folder) {
        if (this.folderItem.protected) {
          return "folder-protected-icon";
        }
        return "folder-icon";
      }

      if (this.folderItem.protected) {
        return "file-lock";
      }

      if (this.folderItem.name == "..") {
        return "undo";
      }

      if (this.folderItem.drive) {
        return "hdd";
      }

      switch (this.folderItem.extension.toLowerCase()) {
        case ".exe":
        case ".msi":
          return "file-app";
        case ".png":
        case ".gif":
        case ".jpg":
        case ".svg":
        case ".jpeg":
        case ".bmp":
          return "file-picture";
        case ".mp3":
        case ".wav":
        case ".ogg":
        case ".midi":
        case ".flac":
        case ".aac":
          return "file-music";
        case ".mp4":
        case ".mov":
        case ".wmv":
        case ".avi":
        case ".flv":
        case ".mkv":
          return "file-video";
        case ".txt":
        case ".log":
        case ".md":
        case ".rtf":
          return "file-text";
        case ".pdf":
          return "file-pdf";
        case ".conf":
        case ".ini":
        case ".cfg":
        case ".cf":
          return "file-cog";
        default:
          return "file-unknown";
      }
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