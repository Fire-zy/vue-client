<template>
  <div class="noticemanage">
    <el-card v-for="item in cards" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <el-button
          @click="deleteNotice(item.id)"
          style="float: right; padding: 3px 0"
          type="text"
          >删除</el-button
        >
      </div>
      <div class="content">
        {{ item.content }}
      </div>
      <div class="date">发布时间 {{ item.date }}</div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [],
    };
  },
  created() {
    this.getNotice();
  },
  methods: {
    deleteNotice(val) {
      this.$axios.post("api/notice/deleteNotice", { id: val }).then((res) => {
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: "成功",
          });
        }
        this.getNotice();
      });
    },
    getNotice() {
      this.$axios.get("api/notice/getNotice").then((res) => {
        this.cards = res.data.data;
        // console.log(res.data);
      });
    },
  },
};
</script>
<style scoped>
.noticemanage {
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
}
.content {
  font-size: 14px;
  color: rgb(108, 108, 107);
  line-height: 25px;
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.date {
  font-size: 12px;
}
.box-card {
  width: 480px;
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>