<template>
  <div>
    <div class="loader" v-if="loading">...Loading</div>
    <div v-else class="folder-list">
      <template v-if="(isWindows && isRoot) || !isRoot">
        <FolderListItem name=".." @click="goOneLevelUp()" />
      </template>

      <template v-if="path">
        <FolderListItem
          v-for="item in folder"
          :name="item.name"
          @click="item.folder ? goOneLevelDown(item.name) : null"
        />
      </template>
      <template v-else-if="isWindows">
        <FolderListItem
          v-for="drive in drives"
          :name="drive"
          @click="goOneLevelDown(drive)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import FolderListItem from "./components/FolderListItem";

export default {
  name: "App",
  components: {
    FolderListItem,
  },
  data() {
    return {
      isWindows: window.ipc.system === "win32",
      path: "/",
      folder: null,
      drives: [],
      loading: false,
    };
  },
  created() {
    this.init();
  },
  computed: {
    isRoot() {
      return /^(.+:)?\/$/m.test(this.path);
    },
  },
  watch: {
    path(newPath) {
      if (newPath) {
        this.requestFolder(newPath);
      }
    },
  },
  methods: {
    async init() {
      this.loading = true;
      if (this.isWindows) {
        await this.requestDrives();
      }
      await this.requestFolder(this.path);
      this.loading = false;
    },
    async requestFolder(path) {
      const res = await window.ipc.request("read-folder", {
        path,
      });
      if (res.success) {
        this.folder = res.data;
      }
    },
    async requestDrives() {
      const res = await window.ipc.request("get-disks");
      if (res.success) {
        this.drives = res.data;
      }
    },
    goOneLevelUp() {
      this.path = this.path.slice(0, this.path.lastIndexOf("/"));
    },
    goOneLevelDown(name) {
      this.path = this.path + `/${name}`;
    },
  },
};
</script>
