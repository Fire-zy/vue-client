<template>
  <div class="table_container">
    <el-select v-model="value" placeholder="请选择排序类别">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-button type="primary" plain>添加至产品管理</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#1f2d3d' }"
      :row-class-name="tableRowClassName"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        type="index"
        label="总排名"
        width="80px"
        :index="indexMethod"
      >
      </el-table-column>
      <el-table-column prop="pro_name" label="产品名称"> </el-table-column>
      <el-table-column prop="pro_type" label="产品类别"> </el-table-column>
      <el-table-column prop="comment" label="评论分数" sortable="custom">
      </el-table-column>
      <el-table-column
        prop="logscore"
        label="物流服务"
        sortable
        :default-sort="{ prop: 'logscore', order: 'descending' }"
      >
      </el-table-column>
      <el-table-column
        prop="serscore"
        label="卖家服务"
        sortable
        :default-sort="{ prop: 'serscore', order: 'descending' }"
      >
      </el-table-column>
      <el-table-column
        prop="describescore"
        label="宝贝服务"
        sortable
        :default-sort="{ prop: 'describescore', order: 'descending' }"
      >
      </el-table-column>
      <el-table-column
        prop="sales"
        label="月销量"
        sortable
        :default-sort="{ prop: 'sales', order: 'descending' }"
      >
      </el-table-column>
      <el-table-column prop="pro_introduction" label="产品介绍">
      </el-table-column>
    </el-table>
    <page></page>
  </div>
</template>

<script>
import page from "../components/Page.vue";
export default {
  components: {
    page,
  },
  data() {
    return {
      tableData: [],
      proptype: "",
      options: [
        {
          value: "女装",
          label: "女装",
        },
        {
          value: "女鞋",
          label: "女鞋",
        },
        {
          value: "男鞋",
          label: "男鞋",
        },
        {
          value: "箱包",
          label: "箱包",
        },
        {
          value: "美妆",
          label: "美妆",
        },
        {
          value: "饰品",
          label: "饰品",
        },
        {
          value: "洗护",
          label: "洗护",
        },
        {
          value: "运动",
          label: "运动",
        },
        {
          value: "百货",
          label: "百货",
        },
        {
          value: "数码",
          label: "数码",
        },
        {
          value: "家电",
          label: "家电",
        },
        {
          value: "食品",
          label: "食品",
        },
        {
          value: "母婴",
          label: "母婴",
        },
        {
          value: "生鲜",
          label: "生鲜",
        },
      ],
      value: "",
    };
  },
  created() {
    this.getAnalyse();
  },
  methods: {
    getAnalyse() {
      this.$axios
        .get("/api/analyse/getAnalyse", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = res.data.data;
        });
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //表格排序
    sortChange(column) {
      //定义需要排序的列，这样可以省去多个if-else if
      const actions = new Map([
        ["comment", "comment"],
        ["logscore", "logscore"],
        ["serscore", "serscore"],
        ["describescore", "describescore"],
        ["sales", "sales"],
      ]);
      // this.queryParams.pageIndex = 1;
      const prop = actions.get(column.prop);
      if (prop) {
        this.proptype = prop;
        if (column.order === "ascending") {
          this.tableData.sort(this.ascSortFun);
        } else if (column.order === "descending") {
          this.tableData.sort(this.desSortFun);
        }
      }
    },
    // 升序排列方法
    ascSortFun(a, b) {
      return a[this.proptype] - b[this.proptype];
    },
    // 降序排列方法
    desSortFun(a, b) {
      return b[this.proptype] - a[this.proptype];
    },
    formatter(row, column) {
      return row.address;
    },
    indexMethod(index) {
      return index * 1 + 1;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "success-row";
      }
      return "";
    },
  },
};
</script>

<style scoped>
.table_container {
  padding: 20px;
}
.el-table .success-row {
  background: #f0f9eb;
}

.el-select {
  margin-bottom: 20px;
  margin-right: 20px;
}
</style>