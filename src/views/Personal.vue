<template>
  <div class="personal">
    <el-form :model="selectTable">
      <el-form-item label="用户名" label-width="100px">
        <el-input v-model="selectTable.username"></el-input>
      </el-form-item>
      <!-- <el-form-item label="用户状态" label-width="100px">
        <el-input v-model="selectTable.status"></el-input>
      </el-form-item> -->
      <el-form-item label="邮箱" label-width="100px">
        <el-input v-model="selectTable.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="100px">
        <el-input v-model="selectTable.user_phone"></el-input>
      </el-form-item>
      <el-form-item label="头像" label-width="100px">
        <div>
          <el-upload
            ref="pictureUpload"
            action="/api/api/upload"
            list-type="picture-card"
            :auto-upload="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :limit="10"
            :on-success="handleAvatarSuccess"
          >
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <!-- 1、预览 -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="预览图片" />
          </el-dialog>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="updateUserinfo()"
        >确 定 修 改</el-button
      >
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgHead: [],
      selectTable: {},
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$set(this.selectTable, "user_pic", res.message);
      console.log(this.selectTable);
    },
    handleChange(file, fileList) {
      // console.log(fileList);
      // this.fileList = fileList.slice(-3);
    },
    // 2、下载
    handleDownload(file) {
      window.open(file.url);
    },
    // 3、删除--根据 url 的不同进行匹配删除
    handleRemove(file) {
      let uploadFiles = this.$refs.pictureUpload.uploadFiles;
      for (var i = 0; i < uploadFiles.length; i++) {
        if (uploadFiles[i]["url"] == file.url) {
          uploadFiles.splice(i, 1);
        }
      }
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadAvatar(avatar) {
      console.log(avatar);
      // console.log(avatar.target.files[0]);
      let file = avatar.target.files[0];
      let data = new FormData();
      // console.log(data);
      data.append("file", file, file.name);
      data.append("data", 112);

      // console.log("123", data.get("file"));
      console.log(data);
      this.$axios.post("/api/api/zhutu", data).then((res) => {
        console.log(res);
      });
    },

    getFileHead(event) {
      this.file = event.target.files[0];
      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append("file", this.file);
      //封装axios方法
      this.$axios.post("/api/api/upload", formData).then((res) => {
        //赋值图片
        console.log(res.data.url);
        // this.imgHead = "http://localhost:8081/api/api" + res.data.url;
        this.imgHead = res.data.url;
        console.log(this.imgHead);
      });
    },

    getUsers() {
      this.$axios
        .post("/api/my/getUserInfo", {
          username: this.$store.state.user.username,
        })
        .then((res) => {
          this.selectTable = res.data.data[0];
        });
    },
    updateUserinfo() {
      this.$axios
        .post("api/my/updateUserinfo", this.selectTable)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "修改用户信息成功",
            });
            this.getUsers();
            location.reload();
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
    },
  },
};
</script>



<style>
.personal {
  padding: 50px;
}
.dialog-footer {
  margin-left: 100px;
}
.addImages {
  display: inline-block;
  width: 160px;
  height: 125px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px dashed darkgray;
  background: #f8f8f8;
  position: relative;
  overflow: hidden;
}
.text-detail {
  margin-top: 40px;
  text-align: center;
}
.text-detail > span {
  font-size: 40px;
}
.file {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 125px;
  opacity: 0;
}
</style>