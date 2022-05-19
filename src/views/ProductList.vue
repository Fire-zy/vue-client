<template>
  <div class="table_container">
    <!-- 表格 -->
    <el-table
      :data="tableData"
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
            <!-- <el-form-item label="产品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item> -->
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
      <!-- <el-table-column label="产品 ID" prop="id"> </el-table-column> -->
      <el-table-column label="产品名称" prop="pro_name"> </el-table-column>
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
          <!-- <el-button size="mini" @click="handleAdd()">添加</el-button> -->
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

    <!-- 添加弹窗 -->
    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <!-- 修改表单 -->
      <el-form :model="addTable" class="updateDialog">
        <div class="updateDialogLeft">
          <el-form-item label="产品名称" label-width="100px">
            <el-input v-model="addTable.pro_name"></el-input>
          </el-form-item>
          <el-form-item label="产品介绍" label-width="100px">
            <el-input v-model="addTable.pro_introduction"></el-input>
          </el-form-item>
          <el-form-item label="产品类别" label-width="100px">
            <el-input v-model="addTable.pro_type"></el-input>
          </el-form-item>
          <el-form-item label="产品图" label-width="100px">
            <el-input v-model="addTable.pro_picture"></el-input>
          </el-form-item>
          <el-form-item label="日常价格" label-width="100px">
            <el-input v-model="addTable.pro_daliyprice"></el-input>
          </el-form-item>
          <el-form-item label="历史最低价" label-width="100px">
            <el-input v-model="addTable.pro_lowprice"></el-input>
          </el-form-item>
          <el-form-item label="直播间价格" label-width="100px">
            <el-input v-model="addTable.pro_saleprice"></el-input>
          </el-form-item>
        </div>
        <div class="updateDialogRight">
          <el-form-item label="产品链接" label-width="100px">
            <el-input v-model="addTable.pro_link"></el-input>
          </el-form-item>
          <el-form-item label="折扣方式" label-width="100px">
            <el-input v-model="addTable.pro_discount"></el-input>
          </el-form-item>
          <el-form-item label="联系人" label-width="100px">
            <el-input v-model="addTable.pro_contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" label-width="100px">
            <el-input v-model="addTable.pro_phone"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱" label-width="100px">
            <el-input v-model="addTable.pro_email"></el-input>
          </el-form-item>
          <el-form-item label="上架数量" label-width="100px">
            <el-input v-model="addTable.pro_num"></el-input>
          </el-form-item>
          <el-form-item label="排期状态" label-width="100px">
            <el-input v-model="addTable.pro_timestatus"></el-input>
          </el-form-item>
          <el-form-item label="审核状态" label-width="100px">
            <el-input v-model="addTable.choosestatus"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertProduct()">确 定</el-button>
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
      id: "2",
      imgHead: "",
      dialogVisible: false,
      dialogFormVisible: false,
      tags: [],
      // inputValue: "",
      tableData: [],
      selectTable: {},
      addTable: {
        pro_name: "",
        pro_introduction: "",
        pro_type: "",
        pro_picture: "",
        pro_daliyprice: "",
        pro_link: "",
        pro_discount: "",
        pro_lowprice: "",
        pro_saleprice: "",
        pro_contacts: "",
        pro_phone: "",
        pro_email: "",
        pro_num: "",
        pro_timestatus: "",
        choosestatus: "",
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
    this.getProduct();
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
    //添加产品信息
    insertProduct() {
      this.dialogFormVisible = false;
      this.$axios
        .post("api/product/insertProduct", this.addTable)
        .then((res) => {
          // console.log(res.data);

          if (res.data.status == 0) {
            this.$message({
              type: "success",
              message: "添加产品成功",
            });
            this.getProduct();
            this.addTable = {};
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