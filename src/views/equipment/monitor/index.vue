<template>
  <div class="app-containers">
    <el-card style="margin-bottom: 10px" class="cards">
      <div class="analysisBox">
        <div class="overview item item1">
          <p class="title">设备概况</p>
          <p style="padding-left: 12px">设备总数： 2071</p>
          <p style="padding-left: 12px" class="onlineNum">在线数量： 148</p>
          <p style="padding-left: 12px;color:gray;">离线数量： 1923</p>
        </div>
        <div class="online item item2">
          <div ref="onlineChart" style="width: 100%; height: 100%" />
        </div>
        <div class="warining item item3">
          <p class="title">今日报警</p>
          <p style="padding-left: 12px">今日报警： 181</p>
          <p style="padding-left: 12px" class="onlineNum">已处理量： 0</p>
          <p style="padding-left: 12px;color:#ff0000;">未处理量： 181</p>
        </div>
        <div class="handler item item4">
          <div ref="handleChart" style="width: 100%; height: 100%" />
        </div>
      </div>
    </el-card>

    <!--查询条件-->
    <el-card
      class="filter-container"
      shadow="never"
      style="margin-top: 2px; margin-bottom: 10px"
    >
      <div>
        <i class="el-icon-search" />
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          type="primary"
          size="small"
          @click="search()"
        >
          查询搜索
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          size="small"
          @click="reset()"
        >
          重置
        </el-button>
      </div>
      <div class="flex flex-bw" style="margin-top: 15px">
        <el-form :inline="true" :model="formData1" size="small">
          <el-form-item label="名称:">
            <el-input
              v-model="formData1.partyA"
              placeholder="请输入名称"
              style="width: 160px"
              clearable
              size="small"
            />
          </el-form-item>

          <el-form-item label="设备号:">
            <el-input
              v-model="formData1.partyA"
              placeholder="请输入设备号"
              style="width: 160px"
              clearable
              size="small"
            />
          </el-form-item>

          <el-form-item label="设备状态">
            <el-select
              v-model="formData1.checkStatus"
              placeholder="请选择设备状态"
              style="width: 160px"
              clearable
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card>
      <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <el-col :span="20">
            <!-- <el-form-item label="名称:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入名称"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item label="设备号:">
              <el-input
                v-model="formData1.partyA"
                placeholder="请输入设备号"
                style="width: 160px"
                clearable
                size="small"
              />
            </el-form-item>

            <el-form-item label="设备状态">
              <el-select
                v-model="formData1.checkStatus"
                placeholder="请选择设备状态"
                style="width: 160px"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button
              class="buttonSearch"
              icon="el-icon-search"
              size="small"
              @click="search"
              >查询</el-button
            > -->
          </el-col>

          <el-col :span="4">
            <div>
              <el-button
                class="buttonSearch"
                icon="el-icon-s-finance"
                size="small"
                @click="search"
                >批量操作</el-button
              >
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        :header-cell-style="{ background: '#f2f2f2' }"
      >
        <el-table-column label="设备名称" width="150" align="center" fixed>
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="设备号" width="140" align="center" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.detail }}</span>
          </template>
        </el-table-column>

        <el-table-column label="资产号" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="出租单位" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="承租单位" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="created_at"
          label="项目名称"
          width="150"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="项目编号" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属仓库" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出租状态" width="140" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="启用时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报停时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分公司" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户信息" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备状态" width="130" align="center">
          <template slot-scope="scope">
            <span style="color: green">{{
              scope.row.status == 1 ? "在线" : ""
            }}</span>
            <span style="color: #ff0000">{{
              scope.row.status == 2 ? "离线" : ""
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="设备地址" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="限定区域" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最近更新时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
              >设备详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <div
        class="block"
        style="float: right; margin-top: 8px; padding-bottom: 10px"
      >
        <el-pagination
          :current-page="page.pageNum"
          :page-sizes="pageSizes"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import * as echarts from "echarts";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      formData1: {},
      options: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      pageSizes: [10, 20, 50, 100],
      myChart: null,
      myChart2: null,
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.initCharts();
    this.initChartsHandle();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.myChart.resize);
    this.myChart.dispose();
    window.removeEventListener("resize", this.myChart2.resize);
    this.myChart2.dispose();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      // getList().then((response) => {
      //   this.list = response.data.items.slice(0, 3);
      //   this.listLoading = false;
      //   this.page.total = 3;
      // });
      this.list = [
        {
          name: "XY22010002",
          detail: "ID_MYZNSTM_MC20_XY22010002",
          author: "",
          status: "2",
          time: "2025/06/05 15:40:44",
        },
        {
          name: "XY22010003",
          detail: "ID_MYZNSTM_MC20_XY22010003",
          author: "",
          status: "1",
          time: "2025/06/03 15:14:14",
        },
      ];
      this.listLoading = false;
      this.page.total = 2;
    },
    // 背景色
    // tableRowClassName({ row }) {
    //   if (row.questionType == 1 || row.questionType == 2) {
    //     return "row-grey";
    //   }
    //   return "";
    // },
    handleEdit() {},
    remove() {},
    search() {},
    handleSizeChange(val) {
      console.log(1);

      this.page.pageSize = val;
      // this.list();
    },
    handleCurrentChange(val) {
      console.log(2);
      this.page.pageNum = val;

      // this.list();
    },
    initCharts() {
      // const data = {
      //   total: {
      //     title: "总计",
      //     figure: "2847",
      //   },
      //   data: [
      //     { value: 1048, name: "设备在线数" },
      //     { value: 300, name: "设备离线" },
      //     // { value: 580, name: "数据3" },
      //     // { value: 484, name: "数据4" },
      //   ],
      // };
      // let option = {
      //   color: ["#fdcc5f", "#4189ff"],
      //   tooltip: {
      //     trigger: "item",
      //     padding: 0,
      //     borderWidth: 0,
      //     formatter: (params) => {
      //       return `<div style="background-color: rgba($color: #FFFFFF, $alpha: 0.95);
      //               box-shadow: 0 4px 9px 0 rgba($color: #000000, $alpha: 0.1);
      //               padding:0 12px;
      //               display: flex;
      //               align-items: center;
      //               border-radius: 4px;
      //               font-size: 12px;" class="tooltip-area"><p>${params.marker}${params.name}</p><h4 style="margin-left: 30px;">${params.percent}%</h4></div>`;
      //     },
      //   },
      //   legend: {
      //     bottom: "5%",
      //     right: "15%",
      //     icon: "circle",
      //     orient: "vertial",
      //   },
      //   series: [
      //     {
      //       name: "",
      //       type: "pie",
      //       radius: ["51%", "78%"],
      //       center: ["30%", "45%"],
      //       avoidLabelOverlap: false,
      //       label: {
      //         formatter: "{b|{d}%}",
      //         alignTo: "labelLine",
      //         rich: {
      //           a: {
      //             color: "#2b5fb2",
      //             fontSize: "14px",
      //           },
      //           b: {
      //             color: "#2b5fb2",
      //             fontSize: "12px",
      //             fontWeight: "600",
      //           },
      //         },
      //       },
      //       labelLine: {
      //         lineStyle: {
      //           cap: "round",
      //         },
      //         normal: {
      //           // 正常状态下的配置
      //           length: 1, // 第一段飞线长度
      //         },
      //       },
      //       data: data.data,
      //     },
      //   ],
      // };
      // 456
      let data = [
        { value: 599, name: "设备在线数" },
        { value: 856, name: "设备离线数" },
      ];
      const colorList = [
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(69,233,254,1)",
          },
          {
            offset: 1,
            color: "rgba(69,233,254,0.3)",
          },
        ]),
        new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: "rgba(255,181,111,1)",
          },
          {
            offset: 1,
            color: "rgba(255,181,111,0.3)",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            color: "rgba(101,122,250,1)",
          },
          {
            offset: 1,
            color: "rgba(101,122,250,0.3)",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(45,190,146,1)",
          },
          {
            offset: 1,
            color: "rgba(45,190,146,0.3)",
          },
        ]),
      ];
      let option = {
        backgroundColor: "#fff",
        // color: color,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: [8, 16],
          textStyle: {
            color: "#fff",
            fontSize: 16,
          },

          formatter: function (params) {
            return (
              params.marker +
              '<span style="color:' +
              params.color +
              '">' +
              params.data["name"] +
              "\n" +
              params.data["value"] +
              "</span>"
            );
          },
        },
        title: {
          // text: "数量",
          // subtext: `1000`,
          top: "48%",
          left: "center",
          textStyle: {
            color: "#222",
            fontSize: 20,
            fontWeight: 400,
          },
          subtextStyle: {
            color: "#222",
            fontSize: 16,
            fontWeight: 400,
          },
        },
        legend: {
          //  orient: 'vertical',
          icon: "circle",
          left: "center", // 修改为居中
          bottom: "0",
          width: 300,
          height: 60,
          itemWidth: 30,
          itemGap: 40,
          textStyle: {
            rich: {
              a: {
                color: "#222222",
                fontSize: 16,
                padding: [0, 10, 0, 0],
              },
              b: {
                color: "#222",
                fontSize: 16,
                padding: [0, 10, 0, 10],
              },
            },
          },
          formatter: function (name) {
            var target, unit;
            for (var i = 0, l = data.length; i < l; i++) {
              if (data[i].name == name) {
                target = data[i].value;
                unit = data[i].unit;
              }
            }
            return `{a| ${name}}`;
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["55%", "80%"],
            center: ["50%", "40%"], // 修改为居中
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%",
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#000",
                },
              },
            },
            itemStyle: {
              color: (params) => {
                return colorList[params.dataIndex];
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      this.myChart = echarts.init(this.$refs.onlineChart);
      window.addEventListener("resize", this.myChart.resize);
      this.myChart.setOption(option);
    },
    initChartsHandle() {
      // const data = {
      //   total: {
      //     title: "总计",
      //     figure: "2847",
      //   },
      //   data: [
      //     { value: 1048, name: "设备在线数" },
      //     { value: 300, name: "设备离线" },
      //     // { value: 580, name: "数据3" },
      //     // { value: 484, name: "数据4" },
      //   ],
      // };
      // let option = {
      //   color: ["#fdcc5f", "#4189ff"],
      //   tooltip: {
      //     trigger: "item",
      //     padding: 0,
      //     borderWidth: 0,
      //     formatter: (params) => {
      //       return `<div style="background-color: rgba($color: #FFFFFF, $alpha: 0.95);
      //               box-shadow: 0 4px 9px 0 rgba($color: #000000, $alpha: 0.1);
      //               padding:0 12px;
      //               display: flex;
      //               align-items: center;
      //               border-radius: 4px;
      //               font-size: 12px;" class="tooltip-area"><p>${params.marker}${params.name}</p><h4 style="margin-left: 30px;">${params.percent}%</h4></div>`;
      //     },
      //   },
      //   legend: {
      //     bottom: "5%",
      //     right: "15%",
      //     icon: "circle",
      //     orient: "vertial",
      //   },
      //   series: [
      //     {
      //       name: "",
      //       type: "pie",
      //       radius: ["51%", "78%"],
      //       center: ["30%", "45%"],
      //       avoidLabelOverlap: false,
      //       label: {
      //         formatter: "{b|{d}%}",
      //         alignTo: "labelLine",
      //         rich: {
      //           a: {
      //             color: "#2b5fb2",
      //             fontSize: "14px",
      //           },
      //           b: {
      //             color: "#2b5fb2",
      //             fontSize: "12px",
      //             fontWeight: "600",
      //           },
      //         },
      //       },
      //       labelLine: {
      //         lineStyle: {
      //           cap: "round",
      //         },
      //         normal: {
      //           // 正常状态下的配置
      //           length: 1, // 第一段飞线长度
      //         },
      //       },
      //       data: data.data,
      //     },
      //   ],
      // };
      // 456
      let data = [
        { value: 0, name: "已处理" },
        { value: 181, name: "未处理" },
        // { value: 300, name: "南岗区" },
        // { value: 200, name: "松北区" },
      ];
      const colorList = [
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(69,233,254,1)",
          },
          {
            offset: 1,
            color: "rgba(69,233,254,0.3)",
          },
        ]),
        new echarts.graphic.LinearGradient(1, 0, 0, 0, [
          {
            offset: 0,
            color: "rgba(255,181,111,1)",
          },
          {
            offset: 1,
            color: "rgba(255,181,111,0.3)",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 0, 0, [
          {
            offset: 0,
            color: "rgba(101,122,250,1)",
          },
          {
            offset: 1,
            color: "rgba(101,122,250,0.3)",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: "rgba(45,190,146,1)",
          },
          {
            offset: 1,
            color: "rgba(45,190,146,0.3)",
          },
        ]),
      ];
      let option = {
        backgroundColor: "#fff",
        // color: color,
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: [8, 16],
          textStyle: {
            color: "#fff",
            fontSize: 16,
          },

          formatter: function (params) {
            return (
              params.marker +
              '<span style="color:' +
              params.color +
              '">' +
              params.data["name"] +
              "\n" +
              params.data["value"] +
              "</span>"
            );
          },
        },
        title: {
          // text: "数量",
          // subtext: `1000`,
          top: "48%",
          left: "center",
          textStyle: {
            color: "#222",
            fontSize: 20,
            fontWeight: 400,
          },
          subtextStyle: {
            color: "#222",
            fontSize: 16,
            fontWeight: 400,
          },
        },
        legend: {
          //  orient: 'vertical',
          icon: "circle",
          left: "center", // 修改为居中
          bottom: "0",
          width: 300,
          height: 60,
          itemWidth: 30,
          itemGap: 40,
          textStyle: {
            rich: {
              a: {
                color: "#222222",
                fontSize: 16,
                padding: [0, 10, 0, 0],
              },
              b: {
                color: "#222",
                fontSize: 16,
                padding: [0, 10, 0, 10],
              },
            },
          },
          formatter: function (name) {
            var target, unit;
            for (var i = 0, l = data.length; i < l; i++) {
              if (data[i].name == name) {
                target = data[i].value;
                unit = data[i].unit;
              }
            }
            return `{a| ${name}}`;
          },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["55%", "80%"],
            center: ["50%", "40%"], // 修改为居中
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{d}%",
                textStyle: {
                  align: "center",
                  baseline: "middle",
                  fontSize: 14,
                  fontWeight: "500",
                  color: "#000",
                },
              },
            },
            itemStyle: {
              color: (params) => {
                return colorList[params.dataIndex];
              },
            },
            labelLine: {
              show: false,
            },
            data: data,
          },
        ],
      };
      this.myChart2 = echarts.init(this.$refs.handleChart);
      window.addEventListener("resize", this.myChart2.resize);
      this.myChart2.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
// .row-grey {
//   background-color: #fcd5b5 !important;
// }
.app-containers {
  padding: 10px !important;
}
.smallTab {
  // float: left;
  padding: 0 20px 0 0;
  font-weight: 700;
  font-size: 16px;
}

.el-row {
  // border-bottom: 2px solid #18bbfc;
  margin-bottom: 13px;
}

.el-form-item {
  margin-bottom: 8px !important;
}
.el-button--small,
.el-button--small.is-round {
  margin-top: 4px !important;
}
.buttonSearch {
  background: #61afff;
  // background: #00c0f1;
  color: #fff;
  font-weight: 500;
}

.analysisBox {
  // background-color: skyblue;
  height: 200px;
  display: flex;
  .item {
    flex: 1;
  }
  .item2 {
    flex: 2;
  }
  .item4 {
    flex: 2;
  }
  .overview {
    color: rgb(51, 51, 51);
    font-size: 15px;
    .title {
      color: #3eb4d1;
      font-size: 18px;
      margin-top: 5px !important;
    }
    .onlineNum {
      color: green;
    }
  }
  .online {
    padding-top: 45px;
    // background-color: yellow;
  }
  .handler {
    padding-top: 45px;
    // background-color: yellow;
  }
  .warining {
    color: rgb(51, 51, 51);
    font-size: 15px;
    .title {
      color: #3eb4d1;
      font-size: 18px;
      margin-top: 5px !important;
    }
    .onlineNum {
      color: green;
    }
  }
}

.cards ::v-deep .el-card__body {
  padding: 12px !important;
}

// .el-table__body-wrapper::-webkit-scrollbar-thumb {
//   background: #c1c1c1; /* 滚动条滑块颜色 */
//   border-radius: 4px; /* 滑块圆角 */
// }

// /* 自定义滚动条样式 */
// .el-table__body-wrapper ::-webkit-scrollbar {
//   height: 8px; /* 滚动条高度 */
// }

// .el-table__body-wrapper ::-webkit-scrollbar-track {
//   background: #f1f1f1; /* 滚动条轨道背景色 */
//   border-radius: 4px; /* 轨道圆角 */
// }
</style>
