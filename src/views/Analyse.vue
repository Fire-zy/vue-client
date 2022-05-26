<template>
  <div class="table_container">
    <div class="top">
      <el-input
        placeholder="请输入产品名称查询"
        v-model="input3"
        class="input-with-select"
      >
        <el-select
          v-model="value"
          slot="prepend"
          placeholder="请选择排序类别"
          @change="selects(value)"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-input>
      <el-button class="delete" type="danger" plain>批量删除</el-button>
    </div>

    <el-table
      :data="tables"
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
      <el-table-column prop="pro_name" label="产品名称">
        <template slot-scope="scope">
          <span v-html="format(scope.row.pro_name)"></span>
        </template>
      </el-table-column>
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
      input3: "",
      tableData: [],
      proptype: "",
      options: [
        {
          value: "所有",
          label: "所有",
        },
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
  computed: {
    tables() {
      const search = this.input3;
      if (search) {
        return this.tableData.filter((dataNews) => {
          return Object.keys(dataNews).some((key) => {
            return String(dataNews[key]).toLowerCase().indexOf(search) > -1;
          });
        });
      }
      return this.tableData;
    },
  },
  methods: {
    format(val) {
      if (val.indexOf(this.input3) !== -1 && this.input3 !== "") {
        return val.replace(
          this.input3,
          '<font color="red">' + this.input3 + "</font>"
        );
      } else {
        return val;
      }
    },
    selects(value) {
      if (value == "所有") {
        this.getAnalyse();
      } else {
        this.$axios
          .post("/api/analyse/getDifferent", { pro_type: value })
          .then((res) => {
            this.tableData = res.data.data;
          });
      }
    },
    getAnalyse() {
      this.$axios.get("/api/analyse/getAnalyse").then((res) => {
        this.tableData = res.data.data;
      });
    },
    //多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(val);
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
.delete {
  margin-left: 10px;
}
</style>