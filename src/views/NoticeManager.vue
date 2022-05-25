<template>
  <div class="noticemanager">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="消息标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="消息时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date"
              style="width: 100%"
            >
              ></el-date-picker
            >
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="消息内容" prop="content">
        <el-input
          :rows="10"
          type="textarea"
          v-model="ruleForm.content"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即发送</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        title: "",
        date: "",
        content: "",
      },
      rules: {
        title: [{ required: true, message: "请输入消息标题", trigger: "blur" }],
        date: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        content: [
          { required: true, message: "请填写消息内容", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("api/notice/insertNotice", this.ruleForm)
            .then((res) => {
              if (res.data.status == 0) {
                this.$message({
                  type: "success",
                  message: "发布消息成功",
                });
                this.ruleForm = {};
              } else {
                this.$message({
                  type: "error",
                  message: res.message,
                });
              }
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.noticemanager {
  width: 700px;
  padding: 20px;
}
</style>
