<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col class="col" :span="$store.state.device === 'pc'?'6':'12'" v-for="(item, i) in list" :key="i">
        <el-card class="box-card">
          <!-- <div class="dot" :style="'--color: ' + item.color"></div> -->
          <!-- <span class="dot" data-color="red"></span> -->
          <span class="text"> {{ item.name }}</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          name: "销售精英榜",
          icon: "aquamarine",
          color: "red",
        },
        {
          name: "图标",
          icon: "",
          color: "green",
        },
        {
          name: "人员管理",
          icon: "",
        },
        {
          name: "产品管理",
          icon: "",
        },
        {
          name: "收款管理",
          icon: "",
        },
        {
          name: "销售跟进",
          icon: "",
        },
        {
          name: "参数配置",
          icon: "",
        },
        {
          name: "服务跟进",
          icon: "",
        },
        {
          name: "财务管理",
          icon: "",
        },
        {
          name: "系统管理",
          icon: "",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.col {
  margin-bottom: 20px;
}
.dot {
  width: 20px;
  height: 20px;
  background: var(--color);
  border-radius: 50%;
  position: relative;
  margin-right: 10px;
  color: #666666;

  &::after {
    display: block;
    content: "";
    width: 13px;
    height: 13px;
    background: var(--color);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.text {
  white-space: nowrap;
}
/deep/.el-card__body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>