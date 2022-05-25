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

        <template v-for="item in items2">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'fa fa-margin ' + item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(citem, cindex) in item.children"
              :to="citem.path"
              :key="cindex"
            >
              <el-menu-item :index="citem.path">
                <span slot="title">{{ citem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "managerleft",
  data() {
    return {
      items: [
        {
          icon: "el-icon-s-data",
          name: "用户信息管理",
          path: "/infoshow",
        },
        {
          icon: "el-icon-s-data",
          name: "模块管理",
          path: "/modulars",
        },
        // {
        //   icon: "el-icon-s-data",
        //   name: "消息推送",
        //   path: "/noticemanager",
        // },
      ],
      items2: [
        {
          icon: "el-icon-s-data",
          name: "消息管理",
          path: "",
          children: [
            { path: "/noticemanager", name: "消息推送" },
            { path: "/noticemanage", name: "消息管理" },
          ],
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
  margin: 0;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
