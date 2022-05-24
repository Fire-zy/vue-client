<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link
          v-for="(citem, cindex) in items"
          :to="citem.path"
          :key="cindex"
        >
          <el-menu-item :index="citem.path">
            <i :class="citem.icon"></i>
            <span slot="title">{{ citem.name }}</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      flag: true,
      items: [
        {
          icon: "el-icon-menu",
          name: "首页",
          path: "home",
        },
        {
          icon: "el-icon-s-data",
          name: "产品数据分析管理",
          path: "analyse",
        },
        {
          icon: "el-icon-s-custom",
          name: "产品管理",
          path: "productlist",
        },
        {
          icon: "el-icon-s-data",
          name: "样品管理",
          path: "sample",
        },
        {
          icon: "el-icon-date",
          name: "产品排期",
          path: "time",
        },
        {
          icon: "el-icon-s-data",
          name: "个人信息",
          path: "personal",
        },
        {
          icon: "el-icon-bell",
          name: "系统通知",
          path: "notice",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 71px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
  /* position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto; */
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.el-menu-item {
  margin-bottom: 0;
  margin-top: 15px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
