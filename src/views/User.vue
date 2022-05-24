<template>
  <!-- 用户 -->
  <div class="index">
    <HeadNav></HeadNav>
    <LeftMenu></LeftMenu>
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
  created() {},
  methods: {},
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
.content {
  height: calc(100vh - 90px);
}
</style>

