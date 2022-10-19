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
              <span>{{ (cur_page - 1) * pageSize + scope.$index }}</span>
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
            <template slot-scope="scope">
              <span>{{ scope.row.sex | enumSex }}</span>
            </template>
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
        <div
          class="pagination"
          :class="device === 'pc' ? 'k-flex k-row-right' : ''"
        >
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="cur_page"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            :layout="
              device === 'mobile'
                ? 'total, prev, next,jumper'
                : 'total, sizes, prev, pager, next, jumper'
            "
            :total="paging.totalCount"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog
      :width="device === 'mobile' ? '90%' : '50%'"
      :title="modifyForm.id ? '编辑' : '新增'"
      :visible.sync="modifyDialog"
      top="5vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center
      @close="modifyDialogClose"
    >
      <el-form
        :model="modifyForm"
        :rules="rules"
        ref="modifyForm"
        label-width="6em"
        class="modifyForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            type="text"
            placeholder="请输入姓名"
            v-model="modifyForm.name"
            maxlength="5"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="modifyForm.sex">
            <el-radio-button label="1">男</el-radio-button>
            <el-radio-button label="0">女</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["device"]),
    ...mapState(["isCollapse"]),
  },
  data() {
    return {
      isDisable: false,
      pageSize: 10,
      cur_page: 1,
      paging: {},
      ruleForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "blur",
          },
        ],
        age: [
          {
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
      },
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
        this.paging = {
          pageSize: 10,
          currPage: 1,
          totalpages: 1,
          totalCount: res.data.length,
        };
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
    // 删除事件
    handleDel(row) {
      this.$confirm("确认删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let tData = {
            name: row.name,
          };
          this.delUser(tData);
        })
        .catch(() => {});
    },
    // 删除
    delUser(tData) {
      this.isDisable = true;
      this.$api.deleteUser(tData).then((res) => {
        this.$message.success(res.msg);
        this.findUsers();
        this.isDisable = false;
      });
    },
    modifyDialogClose() {
      this.modifyForm = {
        id: "",
        name: "",
        sex: 1,
        age: 0,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  padding-top: 20px;
}
</style>
