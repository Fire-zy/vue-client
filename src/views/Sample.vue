<template>
  <div class="table_container">
    <div class="top">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button class="add" type="primary" @click="handleAdd()" plain
        >+新增</el-button
      >
    </div>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
      style="width: 100%"
      :header-cell-style="{ background: '#eef1f6', color: '#1f2d3d' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row class="choose">
            <el-button
              type="success"
              icon="el-icon-check"
              size="medium"
              round
              @click="pass(props.row)"
              >已入样品库</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-close"
              size="medium"
              round
              @click="refuse(props.row)"
              >已出库</el-button
            >
          </el-row>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="样品名称">
              <span>{{ props.row.pro_name }}</span>
            </el-form-item>
            <el-form-item label="样品数量">
              <span>{{ props.row.number }}</span>
            </el-form-item>
            <el-form-item label="样品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="出库用途">
              <span>{{ props.row.purpose }}</span>
            </el-form-item>
            <el-form-item label="样品分类">
              <span>{{ props.row.pro_type }}</span>
            </el-form-item>
            <el-form-item label="合作状态">
              <span>{{ props.row.choosestatus }}</span>
            </el-form-item>
            <el-form-item label="样品描述">
              <span>{{ props.row.pro_introduction }}</span>
            </el-form-item>
            <el-form-item label="入库时间">
              <span>{{ props.row.get_time }}</span>
            </el-form-item>
            <el-form-item label="出库时间">
              <span>{{ props.row.out_time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column label="样品 ID" prop="id"> </el-table-column> -->
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column label="样品名称" prop="pro_name"> </el-table-column>
      <el-table-column label="描述" prop="pro_introduction"> </el-table-column>
      <el-table-column label="样品状态" prop="choosestatus">
        <template #default="{ row }">
          <span v-if="row.choosestatus">
            <div
              v-for="(item, index) in row.choosestatus.split(';')"
              :key="index"
              style="margin-top: 3%"
            >
              <el-tag v-if="item == '未审核'" type="warning">
                {{ item }}
              </el-tag>
              <el-tag v-else-if="item == '已入样品库'" type="success">
                {{ item }}
              </el-tag>
              <el-tag v-else="item == '已出库'" type="danger">
                {{ item }}
              </el-tag>
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <!-- <el-button size="mini" @click="handleAdd()">添加</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="deleteSample(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <page></page>

    <!-- 修改弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible">
      <!-- 修改表单 -->
      <el-form :model="selectTable">
        <el-form-item label="样品名称" label-width="100px">
          <el-input
            v-model="selectTable.pro_name"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="样品数量" label-width="100px">
          <el-input v-model="selectTable.number"></el-input>
        </el-form-item>
        <el-form-item label="样品用途" label-width="100px">
          <el-input v-model="selectTable.purpose"></el-input>
        </el-form-item>

        <el-form-item label="样品类别" label-width="100px">
          <el-select
            v-model="selectTable.pro_type"
            placeholder="请选择样品类别"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="样品介绍" label-width="100px">
          <el-input v-model="selectTable.pro_introduction"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" label-width="100px">
          <el-date-picker
            v-model="selectTable.get_time"
            type="date"
            value-format="yyyy 年 MM 月 dd 日"
            placeholder="选择入库时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出库时间" label-width="100px">
          <el-date-picker
            v-model="selectTable.out_time"
            type="date"
            value-format="yyyy 年 MM 月 dd 日"
            placeholder="选择出库时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSample()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加弹窗 -->
    <el-dialog title="添加样品信息" :visible.sync="dialogFormVisible">
      <!-- 添加表单 -->
      <el-form :model="addTable">
        <el-form-item label="样品名称" label-width="100px">
          <el-input v-model="addTable.pro_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="样品数量" label-width="100px">
          <el-input v-model="addTable.number"></el-input>
        </el-form-item>
        <el-form-item label="样品用途" label-width="100px">
          <el-input v-model="addTable.purpose"></el-input>
        </el-form-item>
        <el-form-item label="样品类别" label-width="100px">
          <el-select v-model="addTable.pro_type" placeholder="请选择样品类别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="样品介绍" label-width="100px">
          <el-input v-model="addTable.pro_introduction"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" label-width="100px">
          <el-date-picker
            v-model="addTable.get_time"
            type="date"
            value-format="yyyy 年 MM 月 dd 日"
            placeholder="选择入库时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="出库时间" label-width="100px">
          <el-date-picker
            v-model="addTable.out_time"
            type="date"
            value-format="yyyy 年 MM 月 dd 日"
            placeholder="选择出库时间"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertSample()">确 定</el-button>
      </span>
    </el-dialog>
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
      select: "",
      id: "2",
      dialogVisible: false,
      dialogFormVisible: false,
      tableData: [],
      selectTable: {},
      time: "",
      addTable: {
        pro_name: "",
        number: "",
        purpose: "",
        pro_type: "",
        choosestatus: "",
        number: "",
        pro_introduction: "",
        get_time: "",
        out_time: "",
      },
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
    };
  },
  created() {
    this.getSample();
  },
  methods: {
    indexMethod(index) {
      return index * 1 + 1;
    },
    //入库
    pass(row) {
      row.choosestatus = "已入样品库";
      this.$axios.post("api/sample/updateSample", row).then((res) => {
        console.log(res);
      });
    },
    //出库
    refuse(row) {
      row.choosestatus = "已出库";
      this.$axios.post("api/sample/updateSample", row).then((res) => {
        console.log(res);
      });
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
        return "warning-row";
      }
      return "";
    },
    // 获取样品信息
    getSample() {
      this.$axios
        .get("/api/sample/getSample", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.tableData = res.data.data;
        });
    },
    // 更新样品信息
    updateSample() {
      this.dialogVisible = false;
      this.$axios
        .post("api/sample/updateSample", this.selectTable)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "更新样品信息成功",
            });
            this.getSample();
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
    },
    // 删除样品信息
    deleteSample(index, row) {
      this.$axios
        .post("api/sample/deleteSample", { id: row.id })
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "删除样品信息成功",
            });
            this.getSample();
          } else {
            this.$message({
              type: "error",
              message: "删除样品信息失败",
            });
          }
        });
    },
    //添加样品信息
    insertSample() {
      this.dialogFormVisible = false;
      this.$axios.post("api/sample/insertSample", this.addTable).then((res) => {
        // console.log(res.data);
        this.addTable = {};
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: "添加样品信息成功",
          });
          this.getSample();
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
.top {
  display: flex;
  width: 600px;
}
.top .add {
  margin-left: 20px;
}
.el-table {
  margin-top: 20px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
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