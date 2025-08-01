<template>
  <div class="app-containers">
    <el-card
      class="operate-container"
      shadow="never"
      style="margin-bottom: 10px"
    >
      <div class="flex flex-sa flex-align-center">
        <!-- <h2>设备总数&emsp;999</h2>
        <h2>使用中设备&emsp;999</h2>
        <h2>空闲中设备&emsp;999</h2> -->
        <div>
          <div class="top-title-sub">设备总数</div>
          <div class="top-title">{{ 2071 }}</div>
        </div>
        <div>
          <div class="top-title-sub">账户总数</div>
          <div class="top-title">{{ 1 }}</div>
        </div>
      </div>
    </el-card>
    <!-- <el-card style="margin-bottom: 10px" class="cards overimg">
      <el-col :span="12">
        <div class="device">
          <div class="info">
            <img src="~@/assets/overview/device.png" alt="" />
            <span>设备信息</span>
          </div>
          <div class="total">设备总数：2071个</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="account">
          <div class="info">
            <img src="~@/assets/overview/user.png" alt="" />
            <span>账户数</span>
          </div>
          <div class="total">账户总数：1个</div>
        </div>
      </el-col>
    </el-card> -->
    <el-card style="margin-bottom: 10px" class="cards">
      <div class="analysisBox">
        <div class="overview item item1">
          <p class="title">设备情况</p>
          <p style="padding-left: 12px">设备总数： 2071</p>
          <p style="padding-left: 12px" class="onlineNum">在线数量： 148</p>
          <p style="padding-left: 12px;color:gray;">离线数量： 1923</p>
        </div>
        <div class="online item item2">
          <div ref="onlineChart" style="width: 100%; height: 100%" />
        </div>
        <div class="warining item item3">
          <p class="title">报警统计</p>
          <p style="padding-left: 12px">今日报警： 181</p>
          <p style="padding-left: 12px" class="onlineNum">已处理量： 0</p>
          <p style="padding-left: 12px" class="outlineNum">未处理量： 181</p>
        </div>
        <div class="handler item item4">
          <div ref="handleChart" style="width: 100%; height: 100%" />
        </div>
      </div>
    </el-card>
    <el-card>
      <!-- <el-form label-width="100px" :model="formData1" :inline="true">
        <el-row>
          <el-col :span="20">
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
            <el-button
              class="buttonSearch"
              icon="el-icon-search"
              size="small"
              @click="search"
              >查询</el-button
            >
          </el-col>

          <el-col :span="4">
            <div style="text-align: right">
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
      </el-form> -->
      <div class="situation">今日警情</div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        stripe
        :header-cell-style="{ background: '#f2f2f2' }"
      >
        <el-table-column label="序号" type="index" width="90" align="center" />
        <el-table-column label="所属设备" width="240" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="报警时间" width="240" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="报警内容" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>

        <el-table-column label="处理状态" width="220" align="center">
          <template slot-scope="scope">
            <span style="color: green">{{
              scope.row.status == 1 ? "已处理" : ""
            }}</span>
            <span style="color: #ff0000">{{
              scope.row.status == 2 ? "未处理" : ""
            }}</span>
          </template>
        </el-table-column>

        <!-- <el-table-column label="出租单位" width="150" align="center">
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
            <span>{{ scope.row.author }}</span>
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
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column> -->

        <el-table-column label="操作" width="220" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              >处理</el-button
            >
            <el-button size="mini" type="danger" @click="handleRemove(row)">
              删除
            </el-button>
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
          name: "XY23030173",
          detail: "设备数量：6",
          author: "您的设备（XY23030173）,产生左倾斜报警，请及时处理。",
          status: "2",
          time: "2025/06/05 15:40:44",
        },
        {
          name: "XY23030195",
          detail: "设备数量：0",
          author: "您的设备（XY23030195）,产生右倾斜报警，请及时处理。",
          status: "2",
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
    handleRemove() {},
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
      // 123
      // const data = {
      //   total: {
      //     title: "总计",
      //     figure: "2847",
      //   },
      //   data: [
      //     { value: 1048, name: "设备在线数" },
      //     { value: 300, name: "设备离线" },
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
      // 123
      // var data = {
      //   value: 100,
      //   total: 100,
      // };
      // let max = data.total;
      // let value = data.value;
      // let option = {
      //   backgroundColor: "",
      //   title: [
      //     {
      //       text: (value || "-") + "%",
      //       x: "center",
      //       y: "center",
      //       textStyle: {
      //         color: "#f57818",
      //         fontSize: "30",
      //         fontWeight: "normal",
      //         fontStyle: "italic",
      //       },
      //       top: "35%",
      //     },
      //   ],
      //   grid: {
      //     left: "0%",
      //     top: "0%",
      //     right: "0%",
      //     bottom: "0%",
      //   },
      //   angleAxis: {
      //     axisLine: {
      //       show: false,
      //     },
      //     axisLabel: {
      //       show: false,
      //     },
      //     splitLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     min: 0,
      //     max: 100,
      //     startAngle: 90,
      //   },
      //   radiusAxis: {
      //     type: "category",
      //     axisLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLabel: {
      //       show: true,
      //     },
      //     data: [],
      //   },
      //   polar: {
      //     radius: "126%",
      //     center: ["50%", "45%"],
      //   },
      //   series: [
      //     {
      //       type: "bar",
      //       data: [value],
      //       z: 1,
      //       coordinateSystem: "polar",
      //       barMaxWidth: 15,
      //       name: "数据",
      //       color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
      //         {
      //           offset: 0,
      //           color: "#e5cbb4",
      //         },
      //         {
      //           offset: 0.4,
      //           color: "#f57818",
      //         },
      //       ]),
      //     },
      //     // 背景图形
      //     {
      //       type: "bar",
      //       data: [max],
      //       z: 0,
      //       silent: true,
      //       coordinateSystem: "polar",
      //       barMaxWidth: 15,
      //       roundCap: true,
      //       color: "rgba(71, 99, 187, 0.3)",
      //       barGap: "-100%",
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
    .outlineNum {
      color: #ff0000;
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
    .outlineNum {
      color: #ff0000;
    }
  }
}

.cards ::v-deep .el-card__body {
  padding: 12px !important;
}

.overimg {
  height: 210px !important;
  .device {
    background-image: url("~@/assets/overview/card.png");
    height: 185px;
    background-repeat: no-repeat;
    width: calc(100% - 20px);
    padding: 30px;
    letter-spacing: 5px;
    background-size: 100% 100%;
    .info {
      display: flex;
      align-items: center;
      margin-bottom: 45px;
      img {
        width: 65px;
        height: 65px;
        margin-right: 30px;
      }
      span {
        font-size: 22px;
        color: #fff;
      }
    }
    .total {
      font-size: 20px;
      color: #fff;
    }
  }
  .account {
    background-image: url("~@/assets/overview/card.png");
    height: 185px;
    background-repeat: no-repeat;
    width: calc(100% - 20px);
    padding: 30px;
    letter-spacing: 5px;
    background-size: 100% 100%;
    .info {
      display: flex;
      align-items: center;
      margin-bottom: 45px;
      img {
        width: 65px;
        height: 65px;
        margin-right: 30px;
      }
      span {
        font-size: 22px;
        color: #fff;
      }
    }
    .total {
      font-size: 20px;
      color: #fff;
    }
  }
}

.situation {
  color: #3eb4d1;
  font-size: 18px;
  margin-bottom: 10px;
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
.flex {
  display: flex;
}

.flex-bw {
  justify-content: space-between;
}

.flex-sa {
  justify-content: space-around;
}

.flex-align-center {
  align-items: center;
}

.filter-container {
  padding-bottom: 0;
}

.top-title-sub {
  color: #9c9c9c;
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 500;
}

.top-title {
  color: #000000;
  font-size: 20px;
  font-weight: 600;
}
</style>
