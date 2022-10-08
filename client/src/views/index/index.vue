<template>
  <div class="page">
    <div @click="addUsers">tianjia</div>
		<el-button type="primary">111</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
		this.findUsers()
	},
  methods: {
    addUsers() {
      // let tData = {
      //   name: "zkg",
      // };
      let tData = [
        {
          name: "zkg1",
        },
        {
          name: "zkg2",
        },
      ];
      this.$api.addUsers(tData).then((res) => {
        console.log(res);
      });
    },
    findUsers() {
      this.$api.findUsers().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>