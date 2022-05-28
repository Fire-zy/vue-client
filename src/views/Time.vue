<template>
  <div class="demo-app">
    <!-- <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>提示</h2>
        <ul>
          <li>选择日期，系统将提示您创建新事件</li>
          <li>拖放和调整事件大小</li>
          <li>单击事件将其删除</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <label>
          <input
            type="checkbox"
            :checked="calendarOptions.weekends"
            @change="handleWeekendsToggle"
          />
          切换周末
        </label>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>所有排期 ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="demo-app-main">
      <!-- <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar> -->

      <!-- 添加或修改 -->
      <el-dialog
        title="添加排期信息"
        :visible.sync="dialogFormVisible"
        width="400px"
      >
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item
            label="排期标题"
            prop="title"
            :rules="[
              { required: true, message: '请输入排期标题', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.title"
              placeholder="请输入排期标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="form.type" placeholder="请选择类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="颜色" class="color">
            <v-swatches v-model="form.color"></v-swatches>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small"
            >取 消</el-button
          >
          <el-button type="primary" @click="save('form')" size="small"
            >保 存</el-button
          >
        </div>
      </el-dialog>

      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template> </template>
      </FullCalendar>
    </div>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../event-utils";
import VSwatches from "vue-swatches";
export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    VSwatches,
  },

  data: function () {
    return {
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
      form: {
        color: "#1CA085",
      },
      calendarApi: "",
      dialogFormVisible: false,
      calendarOptions: {
        events: [],
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        eventTimeFormat: {
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
          hour12: true,
        },
        initialView: "dayGridMonth",
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        eventMouseEnter: this.eventMouseEnter, // 鼠标滑过
        eventDrop: this.eventDrop, //拖动日历事件
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        // you can update a remote database when these fire:
        eventAdd: this.handleAdd,
        // eventChange:
        // eventRemove:
      },
      currentEvents: [],
    };
  },
  created() {
    this.getTime();
  },
  methods: {
    eventMouseEnter(event, jsEvent, view) {
      // 鼠标划过的事件
      if (event.event.classNames.length) {
        // console.log(event)
      }
    },
    //拖动修改时间
    eventDrop(dropInfo) {
      //向表单添加键值对
      // console.log(dropInfo.event.startStr);
      this.$set(this.form, "id", dropInfo.event.id);
      this.$set(this.form, "start", dropInfo.event.startStr);
      this.$set(this.form, "end", dropInfo.event.endStr);
      this.$set(this.form, "color", dropInfo.event.color);
      // console.log(this.form);
      this.$axios.post("api/time/updateTime", this.form).then((res) => {
        // console.log(res);
      });
    },
    getTime() {
      this.$axios.get("api/time/getTime").then((res) => {
        this.calendarOptions.events = res.data.data;
      });
    },
    handleAdd(events) {},
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    //添加排期商品
    handleDateSelect(selectInfo) {
      //得到星期几
      let week = selectInfo.start.toString();
      let weeks = week.slice(0, 3);
      //打开表单
      this.dialogFormVisible = true;
      //向表单添加键值对
      this.$set(this.form, "start", selectInfo.startStr);
      this.$set(this.form, "end", selectInfo.endStr);
      this.$set(this.form, "week", weeks);

      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      this.calendarApi = calendarApi;
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //表单验证成功
          //添加至数据库
          this.$axios.post("api/time/insertTime", this.form).then((res) => {
            if (res.data.status == 0) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
            }
            //渲染
            this.calendarApi.addEvent(this.form);
            //重置form
            this.form = { color: "#1CA085" };
          });
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除事件
    handleEventClick(clickInfo) {
      if (confirm(`请问你确定要删除 '${clickInfo.event.title}'吗？`)) {
        // console.log(clickInfo.event.id);
        this.$axios
          .post("api/time/deleteTime", { id: clickInfo.event.id })
          .then((res) => {
            // console.log(res);
          });

        clickInfo.event.remove();
      }
    },
    //所有的排期
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>



<style lang='css'>
h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b {
  /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
