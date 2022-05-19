<template>
  <div class="Echarts">
    <div id="main" style="width: 1000px; height: 800px"></div>
    <div id="main2" style="width: 1000px; height: 800px"></div>
  </div>
</template>

<script>
export default {
  name: "Echarts",
  data() {
    return {
      tableData: [],
      arr: [],
      mlist: [],
      test: [],
      option: {
        title: {
          text: "商品类别统计图",
        },
        legend: {
          top: "top",
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 3, name: "美妆" },
              { value: 3, name: "洗护" },
              { value: 3, name: "女鞋" },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    },
    myEcharts2() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main2"));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "产品总量图",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
          top: "top",
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          show: false,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getProduct() {
      //获取接口数据
      this.$axios
        .get("/api/product/getProduct", {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          //将protype获取出来放进新的数组
          this.tableData = res.data.data;
          for (let key in this.tableData) {
            this.arr.push(this.tableData[key].pro_type);
          }

          var newArr = [...new Set(this.arr)]; // 对原始数组去重
          var list = [];
          newArr.forEach((i) => {
            list.push(this.arr.filter((t) => t === i));
          });
          // 将数组整理成data的数据格式
          list.forEach((i, index) => {
            this.option.series[0].data.push({
              value: i.length,
              name: newArr[index],
            });
          });
          // 这里最重要，不要将myEcharts放进mounted里面，渲染不出数据
          this.myEcharts();
        });
    },
  },
  mounted() {
    this.myEcharts2();
  },
};
</script>

<style>
.Echarts {
  margin-bottom: 50px;
}

#main {
  margin-left: 50px;
  margin-top: 50px;
}
#main2 {
  margin-left: 50px;
}
</style>
