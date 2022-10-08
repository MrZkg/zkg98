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
        <el-table :data="dataList" border>
          <el-table-column label="序号" fixed width="60" align="center">
            <template slot-scope="scope">
              <div>{{ scope.$index }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sex"
            label="姓别"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="age"
            label="年龄"
            show-overflow-tooltip
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                v-loading="isDisable"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                v-loading="isDisable"
                @click="handleDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog
      :title="modifyForm.id ? '编辑' : '新增'"
      :visible.sync="modifyDialog"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
    >
      <el-form
        :model="modifyForm"
        :rules="rules"
        ref="modifyForm"
        label-width="6em"
        class="modifyForm"
      >
        <el-form-item label="姓名" prop="">
          <el-input
            type="text"
            placeholder="请输入姓名"
            v-model="modifyForm.name"
            maxlength="50"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="">
          <el-radio-group v-model="modifyForm.sex">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" prop="">
          <el-input-number v-model="modifyForm.age" :min="0"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="danger"
          round
          icon="el-icon-close"
          @click="modifyDialog = false"
          :loading="isDisable"
          >取消</el-button
        >
        <el-button
          type="success"
          round
          icon="el-icon-check"
          @click="modifyFormSubmit('modifyForm')"
          :loading="isDisable"
          >保存</el-button
        >
      </div>
    </el-dialog>
    <!-- @closed="modifyFormClosed"
      @open="modifyFormOpen" -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDisable: false,
      currentPage: 1,
      ruleForm: {},
      rules: {},
      dataList: [],
      modifyDialog: false,
      modifyForm: {
        id: "",
        name: "",
        sex: 1,
        age: 0,
      },
    };
  },
  created() {
    this.findUsers();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addUsers(tData) {
      this.isDisable = true;
      this.$api.addUsers(tData).then((res) => {
        this.$message.success(res.msg);
        this.findUsers();
        this.modifyDialog = false;
        this.isDisable = false;
      });
    },
    updateUser(tData) {
      this.isDisable = true;
      this.$api.updateUser(tData).then((res) => {
        this.$message.success(res.msg);
        this.findUsers();
        this.modifyDialog = false;
        this.isDisable = false;
      });
    },
    findUsers() {
      this.$api.findUsers().then((res) => {
        this.dataList = res.data;
      });
    },
    modifyFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let tData = this.modifyForm;
          if (tData.id) {
            this.updateUser(tData);
          } else {
            this.addUsers(tData);
          }
        } else {
          return false;
        }
      });
    },
    //编辑
    handleEdit(row) {
      this.modifyForm = {
        id: row._id,
        name: row.name,
        sex: row.sex,
        age: row.age,
      };
      this.modifyDialog = true;
    },
    // 删除
    handleDel(row) {
      let tData = {
        name: row.name,
      };
      this.isDisable = true;
      this.$api.deleteUser(tData).then((res) => {
        this.$message.success(res.msg);
        this.findUsers();
        this.isDisable = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
	padding-top: 20px;
	display: flex;
	justify-content: end;

}
</style>
