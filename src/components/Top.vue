<template>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      select: "",
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
};
</script>
