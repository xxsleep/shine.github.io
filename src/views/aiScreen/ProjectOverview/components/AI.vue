<template>
  <div class="AI-container">
    <!-- 上方盒子 -->
    <div class="top-box">
      <!-- 左侧盒子 -->
      <div class="inner-box">
        <div class="data-row">32564</div>
        <div class="data-row small-text">总数量</div>
      </div>
      <!-- 右侧盒子 -->
      <div class="inner-box">
        <div class="data-row">254</div>
        <div class="data-row small-text">今日数量</div>
      </div>
    </div>
    <!-- 下方盒子 -->
    <div class="bottom-box">
      <div ref="chartContainer" style="width: 100%; height: 100%;" />
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 获取 DOM 元素
      const chartDom = this.$refs.chartContainer
      // 初始化图表
      const myChart = echarts.init(chartDom)

      // 指定图表的配置项和数据
      const option = {
        // 将图例放在右上角
        legend: {
          data: ['安全带未穿', '安全帽未佩戴'],
          textStyle: {
            color: '#fff' // 图例文字颜色为白色
          },
          orient: 'horizontal' // 明确指定图例水平展示
        },
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月'],
          axisLabel: {
            color: '#fff' // x 轴文字颜色为白色
          }
        },
        yAxis: {
          type: 'value',
          name: '单位（个）',
          axisLabel: {
            color: '#fff' // y 轴文字颜色为白色
          },
          nameTextStyle: {
            color: '#fff' // y 轴名称文字颜色为白色
          }
        },
        series: [
          {
            name: '安全带未穿',
            type: 'bar',
            data: [3444, 3442, 2455, 2222, 4155],
            barWidth: 18, // 设置柱子宽度
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1495F8' // 渐变起始颜色
                  },
                  {
                    offset: 1,
                    color: '#06476F' // 渐变结束颜色
                  }
                ]
              }
            }
          },
          {
            name: '安全帽未佩戴',
            type: 'bar',
            data: [4522, 5521, 4323, 6111, 5222],
            barWidth: 18, // 设置柱子宽度
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#44FCD7' // 渐变起始颜色
                  },
                  {
                    offset: 1,
                    color: '#132835' // 渐变结束颜色
                  }
                ]
              }
            }
          }
        ],
        // 让图表撑满盒子剩余部分
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        }
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.AI-container{
  height: 100%;
}
.top-box {
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-box {
  width: 133px;
  height: 71px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 17.5px; /* 左右间距各 17.5px，总共 35px */
  background-color: rgba(#16A5FF, 0.2);
}

.data-row {
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
  font-size: 20px;
  color: #65EAFF;
}

.small-text {
  font-size: 14px;
  color: #fff;
}

.bottom-box {
  height: calc(100% - 80px); /* 设置下方盒子的高度 */
}
</style>
