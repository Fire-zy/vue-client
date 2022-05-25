<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="item in cards"
        :timestamp="item.date"
        placement="top"
      >
        <el-card>
          <p class="title">{{ item.title }}</p>
          <span class="content">{{ item.content }}</span>
        </el-card>
      </el-timeline-item>
      <!-- <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item> -->
    </el-timeline>
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
.block {
  padding: 20px;
  width: 700px;
}

.title {
  font-size: 16px;
  font-weight: 400;
  color: #1f2f3d;
  line-height: 2.5em;
}
.content {
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;
}
</style>