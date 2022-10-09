<template>
  <div class="page">
    <el-card>
      <el-row type="flex" justify="space-between" align="middle" slot="header">
        <div class="title" v-text="$route.meta.title"></div>
        <div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="modifyDialog = true"
            >新增</el-button
          >
        </div>
      </el-row>
      <div class="table">
        <div class="handle-box">
          <el-form
            :inline="true"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            :validate-event="false"
            @submit.native.prevent
          >
          </el-form>
        </div>
        <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          border
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="date" label="菜单" width="180">
          </el-table-column>
          <el-table-column prop="name" label="路由" width="180">
          </el-table-column>
          <el-table-column prop="address" label="图标"> </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {},
      rules: {},
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      isDisable: false,
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
