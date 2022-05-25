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
      header-text="禁止"
    />
    <Kanban
      :key="3"
      :list="list3"
      :group="group"
      class="kanban done"
      header-text="开发中"
    />
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
      list1: [
        { name: "数据分析管理" },
        { name: "产品管理" },
        { name: "样品管理" },
      ],
      list2: [{ name: "产品排期" }, { name: "产品报名" }],
      list3: [{ name: "个人信息修改" }],
    };
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

