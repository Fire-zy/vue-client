<template>
  <div class="table_container">
    <div class="top">
      <el-input
        placeholder="请输入产品名称查询"
        v-model="input3"
        class="input-with-select"
      >
        <el-select
          v-model="select"
          slot="prepend"
          placeholder="请选择类别"
          @change="selects(select)"
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
    </div>

    <!-- 表格 -->
    <el-table
      :data="tables"
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
              >通过初选</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-close"
              size="medium"
              round
              @click="refuse(props.row)"
              >直接否决</el-button
            >
          </el-row>
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产品名称">
              <span>{{ props.row.pro_name }}</span>
            </el-form-item>
            <el-form-item label="产品介绍">
              <span>{{ props.row.pro_introduction }}</span>
            </el-form-item>
            <el-form-item label="产品类别">
              <span>{{ props.row.pro_type }}</span>
            </el-form-item>
            <el-form-item label="日常价格">
              <span>{{ props.row.pro_daliyprice }}</span>
            </el-form-item>
            <el-form-item label="历史最低价">
              <span>{{ props.row.pro_lowprice }}</span>
            </el-form-item>
            <el-form-item label="直播间价格">
              <span>{{ props.row.pro_saleprice }}</span>
            </el-form-item>
            <el-form-item label="折扣方式">
              <span>{{ props.row.pro_discount }}</span>
            </el-form-item>
            <el-form-item label="联系人">
              <span>{{ props.row.pro_contacts }}</span>
            </el-form-item>
            <el-form-item label="联系人电话">
              <span>{{ props.row.pro_phone }}</span>
            </el-form-item>
            <el-form-item label="联系人邮箱">
              <span>{{ props.row.pro_email }}</span>
            </el-form-item>
            <el-form-item label="上架数量">
              <span>{{ props.row.pro_num }}</span>
            </el-form-item>
            <el-form-item label="排期状态">
              <span>{{ props.row.pro_timestatus }}</span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>{{ props.row.choosestatus }}</span>
            </el-form-item>
            <el-form-item label="产品链接">
              <span>{{ props.row.pro_link }}</span>
            </el-form-item>
            <el-form-item label="产品图">
              <img
                :src="
                  'http://localhost:5000/public/images/' + props.row.pro_picture
                "
                width="160px"
                height="160px"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" :index="indexMethod"> </el-table-column>
      <el-table-column label="产品名称" prop="pro_name">
        <template slot-scope="scope">
          <span v-html="format(scope.row.pro_name)"></span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" prop="choosestatus">
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
              <el-tag v-else-if="item == '已通过审核'" type="success">
                {{ item }}
              </el-tag>
              <el-tag v-else="item == '已驳回'" type="danger">
                {{ item }}
              </el-tag>
            </div>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="pro_introduction"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteProduct(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <page></page>

    <!-- 修改弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogVisible">
      <!-- 修改表单 -->
      <el-form :model="selectTable" class="updateDialog">
        <div class="updateDialogLeft">
          <el-form-item label="产品名称" label-width="100px">
            <el-input v-model="selectTable.pro_name"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍" label-width="100px">
            <el-input v-model="selectTable.pro_introduction"></el-input>
          </el-form-item>
          <el-form-item label="产品类别" label-width="100px">
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

          <el-form-item label="产品图" label-width="100px">
            <el-input v-model="selectTable.pro_picture"></el-input>
          </el-form-item>
          <el-form-item label="日常价格" label-width="100px">
            <el-input v-model="selectTable.pro_daliyprice"></el-input>
          </el-form-item>
          <el-form-item label="历史最低价" label-width="100px">
            <el-input v-model="selectTable.pro_lowprice"></el-input>
          </el-form-item>
          <el-form-item label="直播间价格" label-width="100px">
            <el-input v-model="selectTable.pro_saleprice"></el-input>
          </el-form-item>
        </div>
        <div class="updateDialogRight">
          <el-form-item label="产品链接" label-width="100px">
            <el-input v-model="selectTable.pro_link"></el-input>
          </el-form-item>

          <el-form-item label="折扣方式" label-width="100px">
            <el-select
              v-model="selectTable.pro_discount"
              placeholder="请选择折扣方式"
            >
              <el-option label="满减" value="满减"></el-option>
              <el-option label="买一送一" value="买一送一"></el-option>
              <el-option label="买二送一" value="买二送一"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" label-width="100px">
            <el-input v-model="selectTable.pro_contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" label-width="100px">
            <el-input v-model="selectTable.pro_phone"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱" label-width="100px">
            <el-input v-model="selectTable.pro_email"></el-input>
          </el-form-item>
          <el-form-item label="上架数量" label-width="100px">
            <el-input v-model="selectTable.pro_num"></el-input>
          </el-form-item>
          <el-form-item label="排期状态" label-width="100px">
            <el-input v-model="selectTable.pro_timestatus"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" label-width="100px">
            <el-input v-model="selectTable.choosestatus"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateProduct()">确 定</el-button>
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
      imgHead: "",
      dialogVisible: false,
      tags: [],
      tableData: [],
      selectTable: {},
      options: [
        {
          value: "所有",
          label: "所有",
        },
        {
          value: "已通过审核",
          label: "已通过审核",
        },
        {
          value: "未审核",
          label: "未审核",
        },
        {
          value: "已驳回",
          label: "已驳回",
        },
      ],
    };
  },
  created() {
    this.getProduct();
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
    selects(val) {
      if (val == "所有") {
        this.getProduct();
      } else {
        this.$axios
          .post("api/product/getDifferent", { choosestatus: val })
          .then((res) => {
            // console.log(res);
            this.tableData = res.data.data;
          });
      }
    },
    indexMethod(index) {
      return index * 1 + 1;
    },
    //打开编辑按钮
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.selectTable = row;
    },
    //通过初审
    pass(row) {
      row.choosestatus = "已通过审核";
      this.$axios.post("api/product/updateProduct", row).then((res) => {
        console.log(res);
      });
    },
    //驳回
    refuse(row) {
      row.choosestatus = "已驳回";
      this.$axios.post("api/product/updateProduct", row).then((res) => {
        console.log(res);
      });
    },

    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 获取样品信息
    getProduct() {
      this.$axios
        .get("/api/product/getProduct", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          this.tableData = res.data.data;
        });
    },
    // 修改产品信息
    updateProduct() {
      this.dialogVisible = false;
      this.$axios
        .post("api/product/updateProduct", this.selectTable)
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "修改产品信息成功",
            });
            this.getProduct();
          } else {
            this.$message({
              type: "error",
              message: res.message,
            });
          }
        });
    },
    // 删除样品信息
    deleteProduct(index, row) {
      this.$axios
        .post("api/product/deleteProduct", { id: row.id })
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "删除产品信息成功",
            });
            this.getProduct();
          } else {
            this.$message({
              type: "error",
              message: "删除样品信息失败",
            });
          }
        });
    },
  },
};
</script>


<style>
.choose {
  margin-left: 50px;
}
.updateDialog {
  display: flex;
  flex-direction: row;
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