<template>
  <div class="table_container">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#1f2d3d' }"
    >
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column label="用户名" prop="username"> </el-table-column>
      <el-table-column label="用户角色" prop="status"> </el-table-column>
      <el-table-column label="邮箱" prop="email"> </el-table-column>
      <el-table-column label="电话" prop="user_phone"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteUserinfo(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible">
      <!-- 修改表单 -->
      <el-form :model="selectTable">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="selectTable.username"></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户角色" label-width="100px">
          <el-input v-model="selectTable.status"></el-input>
        </el-form-item> -->
        <el-form-item label="用户角色" label-width="100px">
          <el-select v-model="selectTable.status" placeholder="请选择身份">
            <el-option label="管理员" value="管理员"></el-option>
            <el-option label="用户" value="用户"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="selectTable.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="selectTable.user_phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserinfo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogFormVisible: false,
      tableData: [],
      selectTable: {},
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    indexMethod(index) {
      return index * 1 + 1;
    },
    //打开编辑按钮
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.selectTable = row;
    },
    // 点击按钮，打开添加表单
    handleAdd() {
      this.dialogFormVisible = true;
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //行的颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
    // 获取用户信息
    getUsers() {
      this.$axios
        .get("/api/my/getUsers", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.tableData = res.data.data;
        });
    },
    // 修改用户信息
    updateUserinfo() {
      this.dialogVisible = false;
      this.$axios
        .post("api/my/updateUserinfo", this.selectTable)
        .then((res) => {
          // console.log(res.data);
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "修改用户信息成功",
            });
            this.getUsers();
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
    },
    // 删除用户信息
    deleteUserinfo(index, row) {
      this.$axios.post("api/my/deleteUserinfo", { id: row.id }).then((res) => {
        console.log(res.data);
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: "删除用户信息成功",
          });
          this.getUsers();
        } else {
          this.$message({
            type: "error",
            message: "删除用户信息失败",
          });
        }
      });
    },
  },
};
</script>


<style>
.updateDialog {
  display: flex;
  flex-direction: row;
}
.updateDialogLeft {
  /* width: 50%; */
}
.updateDialogRight {
  /* width: 50%; */
}
.demo-table-expand {
  padding: 20px 50px;
  background-color: #fbfdff;
  /* box-shadow: inset 0 2px 0 #f4f4f4; */
  /* padding-left: 40px; */
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 45%;
}

.table_container {
  padding: 20px;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>