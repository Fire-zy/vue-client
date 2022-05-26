<template>
  <div class="components-container board">
    <Kanban
      :key="1"
      :list="list1"
      :group="group"
      class="kanban todo"
      header-text="启用"
    />
    <Kanban
      :key="2"
      :list="list2"
      :group="group"
      class="kanban working"
      header-text="禁用"
    />
    <!-- <Kanban
      :key="3"
      :list="list3"
      :group="group"
      class="kanban done"
      header-text="开发中"
    /> -->
  </div>
</template>
<script>
import Kanban from "@/components/Kanban";

export default {
  name: "DragKanbanDemo",
  components: {
    Kanban,
  },
  data() {
    return {
      group: "mission",
      list1: [],
      list2: [],
    };
  },
  created() {
    this.getModules();
  },
  methods: {
    getModules() {
      this.$axios.get("api/modules/getModules").then((res) => {
        for (var i in res.data.data) {
          if (res.data.data[i].status == "1") {
            this.list1.push(res.data.data[i]);
          } else {
            this.list2.push(res.data.data[i]);
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.board {
  width: 1000px;
  // margin-left: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;
}
.kanban {
  &.todo {
    .board-column-header {
      background: #4a9ff9;
    }
  }
  &.working {
    .board-column-header {
      background: #f9944a;
    }
  }
  &.done {
    .board-column-header {
      background: #2ac06d;
    }
  }
}
</style>

