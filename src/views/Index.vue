<template>
  <!-- 用户 -->
  <div v-if="flag" class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>

  <!-- 管理员 -->
  <div v-else class="index">
    <HeadNav></HeadNav>
    <ManagerLeft></ManagerLeft>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
import LeftMenu from "../components/LeftMenu";
import ManagerLeft from "../components/ManagerLeft";

export default {
  name: "index",
  data() {
    return {
      flag: false,
    };
  },
  components: {
    HeadNav,
    LeftMenu,
    ManagerLeft,
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      setTimeout(() => {
        var status = sessionStorage.getItem("status");
        if (status == "用户") {
          this.flag = true;
        }
      }, 300);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

