<template>
  <div class="Echarts">
    <div id="main" style="width: 1000px; height: 800px"></div>
    <!-- <div id="main2" style="width: 1000px; height: 800px"></div> -->
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
            data: [],
          },
        ],
      },
      // 指定图表的配置项和数据
      option2: {
        title: {
          text: "产品排期数量图",
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
          data: ["食品", "美妆", "女装", "百货"],
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
            name: "美妆",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "食品",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "百货",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "女装",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
        ],
      },
    };
  },
  created() {
    this.getProduct();
    // this.getTime();
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
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option2);
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
    getTime() {
      this.$axios.get("api/time/getTime").then((res) => {
        var typeData = [];
        for (var i in res.data.data) {
          typeData.push(res.data.data[i].type);
        }
        //过滤掉重复的类别
        let textList = typeData.filter(
          (item, index, arr) => arr.indexOf(item, 0) === index
        );
        // this.option2.legend.data = textList;
        // console.log(this.option2.legend.data);
        //按类别将每天的数据算出来

        let list = res.data.data;
        let test = [];
        list.forEach((i, index) => {
          textList.forEach((j, index2) => {
            if (i.type == j[index2]) {
            }
            console.log(j);
          });
          // console.log(i.week);
          // if (i.type == "百货") {
          //   console.log(i);
          // }
        });
        // console.log(test);
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
