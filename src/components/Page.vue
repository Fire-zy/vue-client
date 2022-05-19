<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 200, 300, 400]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="20"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
};
</script>

<style  scoped>
.block {
  display: flex;
  justify-content: flex-end;
}
.block .el-pagination {
  margin: 20px;
}
</style>