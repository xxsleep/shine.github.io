<template>
  <div class="AIcontainer" style="color: white; position: relative">
    <div class="Box_center">
      <div class="Box_title">
        <span>告警分类统计</span>
        <!-- <span class="checkDetail">查看更多 ></span> -->
      </div>

      <div class="Box_box">
        <div ref="barEcharts" style="width: 100%; height: 100%" />
      </div>
    </div>

    <div class="Box_bottom">
      <div class="Box_title">
        <span>设备类型统计</span>
        <!-- <span class="checkDetail">查看更多 ></span> -->
      </div>

      <div class="Box_box">
        <!-- <div class="Box_title alarmTypePic">告警类型</div> -->
        <div class="alarmType">
          <div class="timeChange">
            <div
              :class="{ isActive: timeIsActive == 3 }"
              @click="timeChange(3)"
            >
              年
            </div>
            <div
              :class="{ isActive: timeIsActive == 2 }"
              @click="timeChange(2)"
            >
              月
            </div>
            <div
              :class="{ isActive: timeIsActive == 1 }"
              @click="timeChange(1)"
            >
              周
            </div>
          </div>
          <div class="alarmTypeEcharts">
            <div class="echartsTitle">
              <div class="label">{{ typeName }}</div>
              <div class="value">{{ typeNum }} %</div>
            </div>
            <div ref="typeEcharts" style="width: 100%; height: 100%" />
          </div>
          <div class="alamTypeTitle">
            <div
              v-for="(item, index) in labelList"
              :key="index"
              class="box"
              :class="
                labelList.length <= 4 ? 'titleLabelTwo' : 'titleLabelThree'
              "
            >
              <div class="circle" :style="getColor(item)" />
              <div class="titleLabel_name">
                {{ item ? item.eventName : "" }}
              </div>
              <div class="titleLabel_num">
                <span>{{ item ? item.percent : 0 }}</span> %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeIsActive: 3,
      AIRecordVisible: false,
      eventType: '',
      deviceList: [],
      labelList: [],
      color: ['#178FE5', '#17E690', '#E6E6E6', '#FFC859'],
      typeName: '',
      typeNum: '',
      alarmTypeEcharts: null,
      barEcharts: null
    }
  },
  created() {},
  mounted() {
    this.getNoiseAlarm()
    this.initAlarmBarEcharts()
  },
  methods: {
    initAlarmTypeEcharts(arr = []) {
      var echarts = require('echarts')
      this.alarmTypeEcharts = echarts.init(this.$refs.typeEcharts)
      this.alarmTypeEcharts.setOption({
        color: this.color,
        legend: {
          show: false
        },
        series: [
          {
            name: '告警类型',
            type: 'pie',
            radius: [70, 100],
            center: ['50%', '50%'],
            roseType: 'radius',
            padAngle: 5,
            label: {
              show: false
            },
            data: arr
          },
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['50%', '50%'],
            radius: ['100%', '100%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: '',
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderColor: '#3A4039'
                  }
                }
              }
            ]
          }
        ]
      })
    },
    timeChange(e) {
      this.timeIsActive = e
      // this.getNoiseAlarm();
    },
    getColor(e, i) {
      console.log('e1111', e)
      return e && `border: 2px solid ${e.itemStyle.color};`
    },
    async getNoiseAlarm() {
      // const res = await api.alertTypeStatistic({ companyId: this.companyId, type: this.timeIsActive })
      const res = {
        data: {
          msg: '操作成功',
          code: 0,
          data: [
            {
              count: 3665,
              eventName: '安全帽未佩戴',
              eventType: 11001,
              percent: '35.11'
            },
            {
              count: 5222,
              eventName: '反光背心',
              eventType: 11004,
              percent: '50.00'
            },
            {
              count: 1552,
              eventName: '安全绳',
              eventType: 12100,
              percent: '14.87'
            }
          ]
        },
        status: 200,
        statusText: 'OK',
        headers: {
          'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
          'content-type': 'application/json',
          expires: '0',
          pragma: 'no-cache'
        },
        config: {
          url: '/project/screen/alertTypeStatistic',
          method: 'get',
          headers: {
            Accept: 'application/json, text/plain, */*',
            pId: 100001,
            token:
              'eyJ0eXAiOiJKV1QiLCJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJleHAiOjE3NDk0NTU5MDAsInVzZXJJZCI6MSwiaWF0IjoxNzQ5NDQ4NzAwfQ.0SzDi3geCWO1c-HFEvlmWjrIBYm6BfmnqOShzWZqFkE'
          },
          params: {
            companyId: '',
            type: 3
          },
          baseURL: 'http://ctjsapi.zmhycs.cn',
          transformRequest: [null],
          transformResponse: [null],
          timeout: 30000,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          maxBodyLength: -1,
          transitional: {
            silentJSONParsing: true,
            forcedJSONParsing: true,
            clarifyTimeoutError: false
          }
        },
        request: {}
      }
      let data = []
      if (res.data.code === 0) {
        data = res.data.data
        data = data.map((item) => {
          return {
            eventName: item.eventName,
            percent: item.percent,
            name: item.eventName,
            value: item.percent,
            itemStyle: {
              color: ''
            }
          }
        })
        data.forEach((e) => {
          if (e.eventName == '反光背心') {
            e.itemStyle.color = '#178FE5'
            this.labelList[0] = e
          }
          if (e.eventName == '安全帽未佩戴') {
            e.itemStyle.color = '#17E690'
            this.labelList[1] = e
          }

          if (e.eventName == '安全绳') {
            e.itemStyle.color = '#FFC859'
            this.labelList[3] = e
          }
        })

        const newArr = []
        this.labelList.forEach((item) => {
          if (item !== undefined && item !== null && item !== '') {
            newArr.push(item)
          }
        })
        this.labelList = newArr
        this.initAlarmTypeEcharts(this.labelList)
        this.typeName = this.labelList[0].eventName
        this.typeNum = this.labelList[0].percent
      } else {
        this.initAlarmTypeEcharts()
      }
      await this.$nextTick(() => {
        const that = this
        that.alarmTypeEcharts.on('mouseover', function(params) {
          that.typeName = params.data.name
          that.typeNum = params.data.value
        })
        that.alarmTypeEcharts.on('mouseout', function(params) {
          that.typeName = that.labelList[0].eventName
          that.typeNum = that.labelList[0].percent
        })
      })
    },

    initAlarmBarEcharts(arr = []) {
      var echarts = require('echarts')
      this.barEcharts = echarts.init(this.$refs.barEcharts)
      // 生成随机数据

      var barWidth = 18
      const option = {
        backgroundColor: '',
        title: {
          text: '', // 添加标题
          left: 'center',
          top: 3,
          textStyle: {
            color: '#1AF3E4',
            fontSize: 20,
            fontFamily: 'KaiTi'
          }
        },
        legend: {
          top: '3%',
          right: '0%',
          textStyle: {
            fontSize: '12px',
            color: '#FFF'
          },
          data: ['本年', '本月'] // 添加图例项
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            let str = params[0].name + ':'
            params.forEach((item) => {
              if (item.componentSubType === 'bar') {
                str += `<br/>${item.seriesName}：${item.value}`
              }
            })
            return str
          }
        },
        grid: {
          x: '10%',
          x2: '5%',
          y: '30%',
          y2: '10%'
        },
        xAxis: {
          data: ['安全帽未佩戴', '反光背心', '安全绳'], // 使用近七天日期数据
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: '#214776'
            }
          },
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#C5DFFB',
              fontWeight: 400,
              fontSize: '13'
            },
            interval: 0
            // rotate: 30,
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          name: '',
          min: 0,
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              opacity: 0.2
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#C5DFFB'
            }
          }
        },
        series: [
          {
            name: '本年',
            type: 'bar',
            barWidth: barWidth,
            data: [3665, 5222, 1552], // 正常出勤人数
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1, // 从上到下的渐变
                colorStops: [
                  { offset: 0, color: '#1594f5' }, // 渐变起始颜色
                  { offset: 1, color: '#3788a4' } // 渐变结束颜色
                ],
                global: false // 不使用全局坐标系
              }
            }
          },
          {
            name: '本月',
            type: 'bar',
            barWidth: barWidth,
            data: [366, 522, 152], // 迟到人数
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1, // 从上到下的渐变
                colorStops: [
                  { offset: 0, color: '#44f6d2' }, // 渐变起始颜色
                  { offset: 1, color: '#407781' } // 渐变结束颜色
                ],
                global: false // 不使用全局坐标系
              }
            }
          }
        ]
      }
      this.barEcharts.setOption(option)
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
  height: 403px;
  border: 2px solid rgba(110, 158, 255, 0.27);
  background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
  // background-color: yellow;
  margin-bottom: 17px;
}
.Box_bottom {
  height: 500px;
  border: 2px solid rgba(110, 158, 255, 0.27);
  background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
  // background-color: yellow;
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
  height: calc(100% - 50px);
  // background-color: rgba(#000000, 0.6);
  // border: 1px solid #3b4b55;
  border-radius: 2px;
  padding: 2px 3px 2px;
  // background: linear-gradient(
  //     0deg,
  //     rgba(17, 47, 53, 0.5),
  //     rgba(17, 47, 53, 0.5)
  //   ),
  //   linear-gradient(
  //     180deg,
  //     rgba(18, 26, 31, 0.1249) -5%,
  //     rgba(34, 59, 77, 0.5) 128%
  //   );
  box-sizing: border-box;
  // border: 1px solid #435059;
  display: flex;
  flex-direction: column;
  // background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
}
// 123
.AIcontainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  // padding-bottom: 77px;
}
.el-input__inner {
  height: 32px;
  opacity: 1;

  background: rgba(0, 0, 0, 0.11);
  color: #fff;
  box-sizing: border-box;
  border: 1px solid #194560;
  margin-bottom: 8px;
}

.Box_title {
  height: 45px;
  position: relative;
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

.alarmTypePic {
  // background: url("./img/ctalarmType.png") no-repeat;
  background-size: 100% 100% !important;
}
.alarmClassification {
  // background: url("./img/ctalarmClassification.png") no-repeat;
  background-size: 100% 100% !important;
}
.alarmType {
  height: calc(100% - 37px);
  position: relative;
  .timeChange {
    height: 13px;
    display: flex;
    position: absolute;
    top: 14px;
    right: 12px;
    div {
      width: 46px;
      height: 13px;
      text-align: center;
      line-height: 13px;
      font-family: Source Han Sans;
      font-size: 10px;
      font-weight: bold;
      line-height: normal;
      letter-spacing: 1px;
      color: #cfdae5;
      background-color: red;
      background: url("./img/uncheck.png") no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      margin-left: -3px;
    }
    .isActive {
      background: url("./img/check.png") no-repeat !important;
    }
  }
  .alarmTypeEcharts {
    height: 225px;
    margin-top: 45px;
    position: relative;
    .echartsTitle {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translateX(-50%);
      .label {
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
      .value {
        font-size: 22px;
        color: #fff;
        text-align: center;
        margin-top: 10px;
      }
    }
  }

  .alamTypeTitle {
    margin-top: 60px;
    display: flex;
    flex-wrap: wrap;
    padding: 0 24px;
    .box {
      display: flex;
      width: 50%;
      height: 16px;
      .circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        margin-top: 4px;
        margin-right: 10px;
      }
      .titleLabel_name {
        font-family: 思源黑体;
        font-size: 12px;
        font-weight: 350;
        line-height: 16px;
        letter-spacing: 0px;
        color: #ffffff;
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .titleLabel_num {
        line-height: 16px;
        width: 40%;
        font-family: D-DIN;
        font-size: 12px;
        font-weight: normal;
        color: #98b29e;
        span {
          font-family: D-DIN;
          font-size: 16px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 0.8px;
        }
      }
    }
    .titleLabelTwo {
      margin-bottom: 20px;
    }
    .titleLabelThree {
      margin-bottom: 10px;
    }
  }
}
.alarmClass {
  height: calc(100% - 50px);
  .timeTab {
    height: 20px;
    display: flex;
    justify-content: space-between;
    padding: 0 14px;
    div {
      width: 130px;
      height: 18px;
      opacity: 1;
      background: rgba(61, 69, 77, 0.3);
      font-size: 12px;
      font-weight: 350;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0px;
      color: #ffffff;
      position: relative;
    }
    .timeTab_month::before {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background: #17e690;
      position: absolute;
      left: 30%;
      top: 50%;
      transform: translateY(-50%);
    }
    .timeTab_year::before {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 3px;
      background: #178fe5;
      position: absolute;
      left: 30%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .barEcharts {
    height: calc(100% - 20px);
  }
}

// .Box_box {
//   width: 100%;
//   border: 1px solid #3b4b55;
//   border-radius: 2px;
//   padding-top: 20px;
//   box-sizing: border-box;
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
//   display: flex;
//   flex-direction: column;
//   position: relative;
// }

.Box_center {
  // height: 50%;
}

.blackModal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.7;
  background: #000000;
  display: none;
  z-index: 1000;
}
</style>
