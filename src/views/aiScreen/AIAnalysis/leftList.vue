<template>
  <div class="AIcontainer" style="color: white; position: relative">
    <div class="Box_center">
      <div class="Box_title">
        <span>项目月告警数量统计</span>
        <span class="checkDetail">查看更多 ></span>
      </div>

      <div class="Box_box">
        <Ranking />
      </div>
    </div>

    <div class="Box_bottom">
      <div class="Box_title">
        <span>识别设备统计</span>
        <span class="checkDetail">查看更多 ></span>
      </div>

      <div class="Box_box" style="padding-top:32px;">
        <!-- <img src="./img/dizuos.png" alt=""> -->
        <div class="deviceNum">
          <div class="deviceAll">
            <div class="num"><span>{{ 3465 }}</span></div>
            <div class="title">设备总数</div>
          </div>
          <div class="deviceUnline">
            <div class="num"><span>{{ 855 }}</span></div>
            <div class="title">离线设备</div>
          </div>

        </div>
        <!-- <div class="dizuo"></div> -->
        <div ref="pieEcharts" style="width: 100%;height:220px;" />
      </div>
    </div>
  </div>
</template>

<script>
import Ranking from './alarm.vue'
export default {
  components: {
    Ranking
  },
  data() {
    return {
      pieEcharts: null
    }
  },
  mounted() {
    this.initAlarmPieEcharts()
  },
  methods: {
    initAlarmPieEcharts() {
      var echarts = require('echarts')
      this.pieEcharts = echarts.init(this.$refs.pieEcharts)
      // 定义一个变量 seriesData，用于存储饼图的数据
      const seriesData = [
        {
          value: 4,
          name: '无锡市儿童福利院易地新建项目'
        },
        {
          value: 16,
          name: '龙塘岸后五巷B地块'
        },
        {
          value: 10,
          name: '锡钢地区北侧学校项目'
        },
        {
          value: 11,
          name: '梁溪河综合整治提升工程项目'
        },
        {
          value: 7,
          name: '中日友好园'
        }
      ]

      // 定义一个变量 colorStops，用于存储颜色渐变的停止点
      const colorStops = [
        [
          {
            offset: 0,
            color: 'rgba(38, 121, 203, 0.6)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(38, 121, 203, 1)' // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: 'rgba(140, 131, 240, 0.6)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(140, 131, 240, 1)' // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: 'rgba(29, 202, 205, 0.6)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(29, 202, 205, 1)' // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: 'rgba(71, 255, 172, 0.6)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(71, 255, 172, 1)' // 100% 处的颜色
          }
        ],
        [
          {
            offset: 0,
            color: 'rgba(197, 60, 205, 0.6)' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'rgba(197, 60, 205, 1)' // 100% 处的颜色
          }
        ]
      ]

      // 定义一个变量 option，用于存储图表的配置项
      const option = {
        // 设置图表的背景颜色
        backgroundColor: '',
        // 设置提示框的显示属性
        tooltip: {
          show: false
        },

        // 设置图表的标题
        // title: [
        //   {
        //     // 圆环中间内容
        //     text: "48",
        //     left: "27%",
        //     top: "40%",
        //     textStyle: {
        //       color: "#13E1EB",
        //       fontSize: 18,
        //       align: "center",
        //     },
        //   },
        //   {
        //     text: "台站数量",
        //     left: "25%",
        //     top: "48%",
        //     textStyle: {
        //       fontSize: 14,
        //       align: "center",
        //       color: "#fff",
        //     },
        //   },
        // ],

        // 设置图例的显示属性
        legend: {
          icon: 'circle',
          //   z: 100,
          //   itemWidth: 6,
          orient: 'vertical',
          top: '26%',
          left: '50%',
          itemGap: 10,
          textStyle: {
            rich: {
              name: {
                color: '#fff',
                fontSize: 12,
                align: 'left'
              }
            }
          },
          // 格式化图例的显示内容
          formatter: (name) => {
            const str = seriesData.filter((item) => item.name === name)[0]
            return `{name|${name}}`
            // return `{name|${name}} {value|${str.value}}`;
          }
        },

        series: [
          {
            name: '访问来源',
            type: 'pie',
            // 设置饼图的半径
            radius: ['35%', '62%'],
            // 设置饼图的中心位置
            center: ['30%', '55%'],
            // 设置饼图的数据
            data: seriesData,
            // 设置标签的显示属性
            label: {
              show: false
            },

            // 设置图元的样式
            itemStyle: {
              // 设置图元的边框颜色
              borderColor: 'rgba(27, 47, 63, 0.6)',
              // 设置图元的边框宽度
              borderWidth: 2,
              // 设置图元的颜色
              color: function(params) {
                return {
                  x: 0,
                  y: 1,
                  x2: 1,
                  y2: 0,
                  // 根据索引值从 colorStops 数组中获取颜色渐变对象
                  colorStops: colorStops[params.dataIndex] // 100% 处的颜色
                }
              }
            }
          }
        ]
      }
      this.pieEcharts.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.checkDetail {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  text-align: right;
  color: rgba(207, 218, 230, 0.7);
  cursor: pointer;
}
.Box_center {
  height: 468px;
  border: 2px solid rgba(110, 158, 255, 0.27);
  background: linear-gradient(to bottom, /* 等同于 180deg */ #0d2f57, #041938);
  margin-bottom: 15px;
  //   background-color: yellow;
}
.Box_bottom {
  height: 436px;
  border: 2px solid rgba(110, 158, 255, 0.27);
  background: linear-gradient(to bottom, /* 等同于 180deg */ #0d2f57, #041938);
  //   background-color: yellow;
}
.Box_title {
  height: 45px;
  position: relative;
  background: url("../img/model_title1.png") no-repeat;
  background-size: 100% 100% !important;
  margin-bottom: 5px;
  padding-right: 13px;
  padding-left: 45px;
  display: flex;
  justify-content: space-between;
  font-family: PingFang;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.Box_box {
  width: 100%;
//   height: calc(100% - 50px);
//   background-color: rgba(#000000, 0.6);
//   border: 1px solid #3b4b55;
  border-radius: 2px;
  padding: 2px 5px 3px;
//   background: linear-gradient(
//       0deg,
//       rgba(17, 47, 53, 0.5),
//       rgba(17, 47, 53, 0.5)
//     ),
//     linear-gradient(
//       180deg,
//       rgba(18, 26, 31, 0.1249) -5%,
//       rgba(34, 59, 77, 0.5) 128%
//     );
  box-sizing: border-box;
//   border: 1px solid #435059;
  display: flex;
  flex-direction: column;
//   background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
//   img {
//     // margin-top: 30px;
//     position: absolute;
//     top: 30px;
//   }
  .deviceNum {
    height: 105px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 64px;
    background: url('./img/dizuos.png') no-repeat;
    background-size: 100% 100%;
    // background-color: yellow;
    .deviceAll {
      height: 100%;
      width: 116px;
      position: relative;
    //   padding-left: 17px;
    text-align: center;
      cursor: pointer;

    }
    .deviceUnline {
      height: 100%;
      width: 116px;
      position: relative;
    //   padding-left: 17px;
    text-align: center;
      cursor: pointer;
    }
    .num {
      span {
        font-family: Furore;
        font-size: 22px;
        line-height: normal;
        letter-spacing: 0px;

      }
      font-size: 18px;
    //   color: #ffffff;
      color: #65EAFF;
      line-height: 32px;
    }
    .title {
      line-height: 23px;
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: normal;
      line-height: normal;
      text-transform: uppercase;
      letter-spacing: 0px;

      font-variation-settings: "opsz" auto;
      color: #adbfcc;
      margin-top: 5px;
    }
  }
  .dizuo {
        height: 50px;
        width: 100%;
        background: url('./img/dizuo.png');
    }
  .projectList {
    // cursor: pointer;
    margin-top: 14px;
    height: 100%;
    overflow: hidden;
    .scorllList {
      height: 46px;
      margin-bottom: 11px;
      .unLineTitle {
        font-family: Source Han Sans;
        padding-left: 6px;
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: -0.35px;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
      }
      .boxContent {
        height: 20px;
        background: rgba(6, 13, 6, 0.4);
        box-sizing: border-box;
        border: 1px solid rgba(77, 102, 71, 0.4);
        margin-top: 5px;
        font-size: 14px;
        line-height: 20px;
        padding: 0 6px;
        display: flex;
        align-items: center;
        .progressBar {
          max-width: 95%;
          width: 0px;
          height: 8px;
          background: linear-gradient(90deg, #757575 0%, #e5e5e5 100%);
        }
      }
      .one {
        background: linear-gradient(
          90deg,
          rgba(15, 84, 153, 0.396) 0%,
          #73d0ff 99%
        ) !important;
      }
      .two {
        background: linear-gradient(90deg, #0b4d2c 0%, #4dffb5 99%) !important;
      }
    }
  }
}
</style>
