<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="产品名称">
        <el-input v-model="form.pro_name"></el-input>
      </el-form-item>
      <el-form-item label="产品类别">
        <el-select v-model="form.pro_type" placeholder="请选择产品类别">
          <el-option label="女装" value="womenwear"></el-option>
          <el-option label="内衣" value="underwear"></el-option>
          <el-option label="女鞋" value="womenshoes"></el-option>
          <el-option label="男鞋" value="manshoes"></el-option>
          <el-option label="箱包" value="bags"></el-option>
          <el-option label="美妆" value="makeup"></el-option>
          <el-option label="饰品" value="ornaments"></el-option>
          <el-option label="洗护" value="wash"></el-option>
          <el-option label="运动" value="sports"></el-option>
          <el-option label="百货" value="goods"></el-option>
          <el-option label="数码" value="digital"></el-option>
          <el-option label="家电" value="electric"></el-option>
          <el-option label="食品" value="食品"></el-option>
          <el-option label="母婴" value="baby"></el-option>
          <el-option label="生鲜" value="fresh"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品介绍">
        <el-input type="textarea" v-model="form.pro_introduction"></el-input>
      </el-form-item>
      <el-form-item label="日常价格">
        <el-input v-model="form.pro_daliyprice"></el-input>
      </el-form-item>
      <el-form-item label="历史最低价">
        <el-input v-model="form.pro_lowprice"></el-input>
      </el-form-item>
      <el-form-item label="直播间价格">
        <el-input v-model="form.pro_saleprice"></el-input>
      </el-form-item>
      <el-form-item label="产品链接">
        <el-input v-model="form.pro_link"></el-input>
      </el-form-item>
      <el-form-item label="折扣方式">
        <el-select v-model="form.pro_discount" placeholder="请选择折扣方式">
          <el-option label="满减" value="discount"></el-option>
          <el-option label="买一送一" value="discounttwo"></el-option>
          <el-option label="买二送一" value="discountthree"></el-option>
          <el-option label="其他" value="others"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.pro_contacts"></el-input>
      </el-form-item>
      <el-form-item label="联系人电话" required="" prop="mobile">
        <el-input v-model="form.pro_phone">
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>
      <el-form-item label="联系人邮箱" required="" prop="email">
        <el-input v-model="form.pro_email"></el-input>
      </el-form-item>
      <el-form-item label="上架数量">
        <el-input v-model="form.pro_num"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="insertProduct()">立即报名</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //添加产品信息
    insertProduct() {
      this.$axios.post("api/product/insertProduct", this.form).then((res) => {
        // console.log(res.data);
        if (res.data.status == 0) {
          this.$message({
            type: "success",
            message: "添加产品成功",
          });
          this.form = {};
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
<style scoped>
.container {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
</style>