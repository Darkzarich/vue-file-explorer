<template>
  <div>
    <div class="loader" v-if="loading">...Loading</div>
    <div v-else class="folder-list">
      <template v-if="(isWindows && isRoot) || (!isRoot && path)">
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
          @click="goOneLevelDown(drive, true)"
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
      loading: true,
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
  methods: {
    async init() {
      if (this.isWindows) {
        await this.requestDrives();
      }
      await this.requestFolder(this.path);
    },
    async requestFolder(path) {
      this.loading = true;
      const res = await window.ipc.request("read-folder", {
        path,
      });
      if (res.success) {
        this.folder = res.data;
        this.loading = false;
      }
    },
    async requestDrives() {
      const res = await window.ipc.request("get-disks");
      if (res.success) {
        this.drives = res.data;
      }
    },
    async goOneLevelUp() {
      if (!this.isRoot) {
        // cut one part of the path
        this.path = this.path.slice(0, this.path.lastIndexOf("/"));
        return await this.requestFolder(this.path);
      }
      this.path = "";
    },
    async goOneLevelDown(name, isDrive = false) {
      if (!isDrive) {
        this.path = this.path + `/${name}`;
      } else {
        this.path = `${name}/`;
      }
      return await this.requestFolder(this.path);
    },
  },
};
</script>

<style lang="scss">
body,
#app {
  font-family: "Roboto", sans-serif;
  background: #2c2c2c;
  color: #ffffff;
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.folder-list {
  overflow-y: auto;
  height: 100%;
  position: absolute;
  width: 100%;

  &::-webkit-scrollbar {
    width: 5px;
    height: 8px;
    background-color: #2c2c2c;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #797979;
    border-radius: 10px;
  }
}
</style>
