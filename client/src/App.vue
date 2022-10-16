<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import { getDeviceType } from "./utils/getDeviceType";

export default {
  data() {
    return {};
  },
  created() {
    let self = this;
    this.getDeviceType();
    window.onresize = function () {
      self.getDeviceType();
    };
  },
  methods: {
    getDeviceType() {
      let device = getDeviceType();
      this.$store.commit("setDevice", device);
    },
  },
};
</script>

