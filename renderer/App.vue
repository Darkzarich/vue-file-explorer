<template>
  <div>
    <pre>
      {{ files }}
    </pre>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      files: null,
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      this.files = await window.ipc.request("read-folder", {
        path: "/",
      });

      console.log(this.files);
    },
  },
};
</script>
