<template>
  <!-- 修改样式让图表撑满元素 -->
  <div ref="chart" style="width: 100%; height: 100%;" />
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
      const chartDom = this.$refs.chart
      // 初始化 ECharts 实例
      const myChart = echarts.init(chartDom)

      // 数据
      const data = [
        {
          value: 3497,
          name: '已处理',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, // 起始点 x 坐标
              y: 0, // 起始点 y 坐标
              x2: 0, // 结束点 x 坐标
              y2: 1, // 结束点 y 坐标
              colorStops: [
                {
                  offset: 0,
                  color: 'blue' // 渐变起始颜色为蓝色
                },
                {
                  offset: 1,
                  color: 'cyan' // 渐变结束颜色为青色
                }
              ]
            }
          }
        },
        {
          value: 159,
          name: '未处理',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, // 起始点 x 坐标
              y: 0, // 起始点 y 坐标
              x2: 0, // 结束点 x 坐标
              y2: 1, // 结束点 y 坐标
              colorStops: [

                {
                  offset: 0,
                  color: 'yellow' // 渐变起始颜色为绿色
                },
                {
                  offset: 1,
                  color: 'green' // 渐变结束颜色为黄色
                }
              ]
            }
          }
        }
      ]

      // 计算总数
      const total = data.reduce((sum, item) => sum + item.value, 0)

      // 配置项
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          // 让图例在右侧居中
          right: 20,
          top: 'middle',
          textStyle: {
            color: 'white', // 图例文字颜色设置为白色
            fontSize: 16
          },
          formatter: function(name) {
            const item = data.find(item => item.name === name)
            return `${name} ${item ? item.value : 0}`
          },
          data: data.map(item => item.name)
        },
        series: [
          {
            name: '处理状态',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['35%', '50%'], // 将环形图靠左
            label: {
              show: true, // 显示标签
              position: 'outside', // 标签位置在环形图外侧
              color: 'white', // 标签文字颜色设置为白色
              formatter: '{b}\n{d}%' // 标签显示格式，显示名称和百分比
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold',
                color: 'white' // 高亮时标签文字颜色设置为白色
              }
            },
            labelLine: {
              show: true // 显示标签线
            },
            data
          },
          {
            type: 'pie',
            radius: ['0', '0'], // 半径设置为 0，使其不可见
            center: ['35%', '50%'], // 将环形图靠左
            label: {
              show: true,
              position: 'center',
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              formatter: `${total}`

            },
            data: [
              {
                value: total,
                name: '总数'
              }
            ]
          }
        ]
      }

      // 使用配置项显示图表
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
