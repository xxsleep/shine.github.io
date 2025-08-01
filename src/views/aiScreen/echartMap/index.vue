<template>
  <div class="map-container">
    <div v-if="currentLevel !== 'china'" class="map-header">
      <button class="back-button" @click="handleBack">返回上一级</button>
    </div>
    <div ref="chartContainer" style="width: 100%; height: 600px;" />
    <div v-if="loading" class="loading">加载中...</div>
    <!-- <div v-if="error" class="error">{{ error }}</div> -->
  </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'

export default {
  name: 'ChinaMap',
  data() {
    return {
      chart: null,
      currentLevel: 'china', // 当前地图层级：china, province, city
      currentArea: '', // 当前选中的区域
      mapData: {}, // 地图数据
      loading: true,
      error: null,
      areaCodes: {}, // 存储地区编码
      // 模拟数据
      mockData: {
        china: {
          name: '中国',
          children: [
            {
              name: '北京', value: 800, children: [
                { name: '东城区', value: 300 },
                { name: '西城区', value: 400 },
                { name: '朝阳区', value: 500 }
              ]
            },
            {
              name: '上海', value: 900, children: [
                { name: '浦东新区', value: 600 },
                { name: '黄浦区', value: 400 },
                { name: '徐汇区', value: 300 }
              ]
            },
            {
              name: '广东', value: 1000, children: [
                {
                  name: '广州', value: 800, children: [
                    { name: '天河区', value: 500 },
                    { name: '海珠区', value: 400 }
                  ]
                },
                {
                  name: '深圳', value: 900, children: [
                    { name: '南山区', value: 600 }
                  ]
                }
              ]
            },
            {
              name: '浙江', value: 950, children: [
                {
                  name: '杭州', value: 850, children: [
                    { name: '西湖区', value: 600 },
                    { name: '滨江区', value: 500 }
                  ]
                },
                {
                  name: '宁波', value: 750, children: [
                    { name: '海曙区', value: 400 },
                    { name: '江北区', value: 350 }
                  ]
                }
              ]
            }
          ]
        }
      },
      guojiaData: null,
      mapCenter: null,
      // 历史记录栈
      mapHistory: []
    }
  },
  async mounted() {
    try {
      this.loading = true
      this.error = null

      // 1. 加载地区编码数据
      await this.loadAreaCodes()

      // 2. 加载地图数据
      await this.loadChinaMap()

      // 3. 初始化图表
      this.initChart()

      // 4. 渲染地图
      this.renderMap()

      this.loading = false
    } catch (error) {
      console.error('初始化失败:', error)
      this.error = '加载失败，请刷新页面重试'
      this.loading = false
    }
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    async loadAreaCodes() {
      try {
        const response = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/all.json')
        if (!response.data) {
          throw new Error('地区编码数据为空')
        }
        this.areaCodes = this.processAreaCodes(response.data)
      } catch (error) {
        console.error('加载地区编码数据失败:', error)
        throw error
      }
    },
    processAreaCodes(data) {
      const codes = {
        provinces: {},
        cities: {}
      }

      data.forEach(province => {
        codes.provinces[province.name] = province.adcode
        if (province.children) {
          codes.cities[province.name] = province.children.map(city => city.name)
        }
      })

      return codes
    },
    getProvinceCode(provinceName) {
      return this.areaCodes.provinces[provinceName]
    },
    async loadChinaMap() {
      try {
        const response = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
        if (!response.data) {
          throw new Error('地图数据为空')
        }
        this.guojiaData = response
        echarts.registerMap('china', response.data)

        // 生成完整的中国地图数据
        const chinaData = {
          name: '中国',
          children: response.data.features.map(feature => ({
            name: feature.properties.name,
            value: Math.floor(Math.random() * 1000)
          }))
        }

        // 设置当前地图数据
        this.currentLevel = 'china'
        this.currentArea = '中国'
        this.mapData = chinaData

        // 保存初始状态到历史记录
        this.mapHistory.push({
          level: 'china',
          area: '中国',
          data: JSON.parse(JSON.stringify(chinaData))
        })

        console.log('初始化中国地图数据:', {
          level: this.currentLevel,
          area: this.currentArea,
          mapData: this.mapData
        })
      } catch (error) {
        console.error('加载地图数据失败:', error)
        throw error
      }
    },
    async loadProvinceMap(provinceName) {
      try {
        const response = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${this.getProvinceCode(provinceName)}_full.json`)
        if (!response.data) {
          throw new Error('省份地图数据为空')
        }
        echarts.registerMap(provinceName, response.data)
      } catch (error) {
        console.error('加载省份地图数据失败:', error)
        throw error
      }
    },
    async loadCityMap(cityName) {
      try {
        const response = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${this.getCityCode(cityName)}_full.json`)
        if (!response.data) {
          throw new Error('城市地图数据为空')
        }
        echarts.registerMap(cityName, response.data)
      } catch (error) {
        console.error('加载城市地图数据失败:', error)
        throw error
      }
    },
    initChart() {
      if (this.chart) {
        this.chart.dispose()
      }
      this.chart = echarts.init(this.$refs.chartContainer)
      window.addEventListener('resize', () => {
        this.chart && this.chart.resize()
      })

      // 绑定点击事件
      this.chart.on('click', (params) => {
        this.handleMapClick(params)
      })
    },
    async loadMapData(area) {
      try {
        // 根据当前层级获取对应的模拟数据
        let data = this.mockData[area]
        if (!data) {
          // 如果找不到对应数据，生成随机数据
          data = {
            name: area,
            children: Array(5).fill(0).map((_, index) => ({
              name: `地区${index + 1}`,
              value: Math.floor(Math.random() * 1000)
            }))
          }
        }

        this.mapData = data
        return data
      } catch (error) {
        console.error('加载地图数据失败:', error)
        throw error
      }
    },
    renderMap() {
      if (!this.chart) {
        throw new Error('图表未初始化')
      }

      console.log('渲染地图 - 当前状态:', {
        level: this.currentLevel,
        area: this.currentArea,
        mapData: this.mapData,
        chartInstance: this.chart
      })

      const option = {
        title: {
          text: this.currentArea ? `${this.currentArea}地图` : '中国地图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(136,119,9,0.78)',
          borderColor: '#ccc',
          borderWidth: 1,
          padding: [10, 15],
          textStyle: {
            color: '#ffffff'
          },
          formatter: (params) => {
            const data = params.data || {}
            return `${params.name}<br/>数值：${data.value || 0}`
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          calculable: true
        },
        // 创建一个阴影背景层
        geo: {
          map: 'china',
          zoom: this.currentLevel === 'china' ? 1.6 : 1.2,
          top: this.currentLevel === 'china' ? '30%' : '8%',
          itemStyle: {
            areaColor: 'rgba(163, 1, 1, 1)',
            shadowColor: 'rgb(163, 1, 1)',
            shadowOffsetY: 5
          },
          select: {
            itemStyle: {
              areaColor: 'rgba(163, 1, 1, 1)',
              shadowColor: 'rgb(163, 1, 1)',
              shadowOffsetY: 5
            }
          },
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(163, 1, 1, 1)',
              shadowColor: 'rgb(163, 1, 1)',
              shadowOffsetY: 5
            }
          },
          regions: [{
            name: '南海诸岛',
            silent: true,
            itemStyle: {
              areaColor: 'rgb(255, 141, 141)',
              shadowColor: 'transparent',
              shadowOffsetY: 0
            },
            select: {
              itemStyle: {
                areaColor: 'rgb(255, 141, 141)',
                shadowColor: 'transparent',
                shadowOffsetY: 0
              }
            },
            emphasis: {
              itemStyle: {
                areaColor: 'rgb(255, 141, 141)',
                shadowColor: 'transparent',
                shadowOffsetY: 0
              }
            }
          }],
          z: 1,
          show: true
        },
        series: [{
          name: '数据',
          type: 'map',
          geoIndex: -1,
          map: this.currentLevel === 'china' ? 'china' : this.currentArea,
          zoom: this.currentLevel === 'china' ? 1.6 : 1.2,
          top: this.currentLevel === 'china' ? '30%' : '8%',
          z: 2,
          label: {
            show: true,
            color: '#000',
            fontSize: 14
          },
          select: {
            itemStyle: {
              areaColor: 'transparent',
              borderColor: '#ffffff',
              borderWidth: 1
            },
            label: {
              show: true,
              color: '#000',
              fontSize: 14
            }
          },
          emphasis: {
            label: {
              show: true,
              color: '#000',
              fontSize: 14
            },
            itemStyle: {
              areaColor: 'transparent',
              borderColor: '#ffffff',
              borderWidth: 1
            }
          },
          itemStyle: {
            areaColor: 'transparent',
            borderColor: '#ffffff',
            borderWidth: 1
          },
          data: this.mapData.children,
          zlevel: 2
        }]
      }

      console.log('渲染配置:', option)
      this.chart.setOption(option, true)
    },
    async handleMapClick(params) {
      const clickedArea = params.name
      console.log('点击区域:', clickedArea, this.currentLevel)

      // 如果当前已经是区级地图，则不进行任何操作
      if (this.currentLevel === 'city') {
        console.log('已经是区级地图，不进行切换')
        return
      }

      // 保存当前状态到历史记录
      this.mapHistory.push({
        level: this.currentLevel,
        area: this.currentArea,
        data: JSON.parse(JSON.stringify(this.mapData))
      })
      console.log('保存历史记录:', this.mapHistory)

      if (this.currentLevel === 'china') {
        try {
          this.loading = true
          // 获取省份的地图数据
          const provinceCode = this.getProvinceCode(clickedArea)
          if (!provinceCode) {
            throw new Error(`未找到省份 ${clickedArea} 的编码`)
          }

          const response = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${provinceCode}_full.json`)
          if (!response.data) {
            throw new Error('省份地图数据为空')
          }

          // 注册省份地图
          echarts.registerMap(clickedArea, response.data)

          // 生成省份的模拟数据
          const provinceData = {
            name: clickedArea,
            children: response.data.features.map(feature => ({
              name: feature.properties.name,
              value: Math.floor(Math.random() * 1000)
            }))
          }

          this.currentLevel = 'province'
          this.currentArea = clickedArea
          this.mapData = provinceData

          // 重新设置地图配置
          const option = {
            geo: {
              map: clickedArea,
              zoom: 1.2,
              top: '8%',
              itemStyle: {
                areaColor: 'rgba(163, 1, 1, 1)',
                shadowColor: 'rgb(163, 1, 1)',
                shadowOffsetY: 5
              },
              select: {
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                }
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                }
              },
              regions: [{
                name: '南海诸岛',
                silent: true,
                itemStyle: {
                  areaColor: 'rgb(255, 141, 141)',
                  shadowColor: 'transparent',
                  shadowOffsetY: 0
                },
                select: {
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  }
                },
                emphasis: {
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  }
                }
              }],
              z: 1,
              show: true
            },
            visualMap: {
              min: 0,
              max: 1000,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true
              // inRange: {
              //   color: ['#ffeda0', '#f03b20']
              // }
            },
            series: [{
              name: '数据',
              type: 'map',
              geoIndex: -1,
              map: clickedArea,
              zoom: 1.2,
              top: '8%',
              z: 2,
              label: {
                show: true,
                color: '#000',
                fontSize: 14
              },
              select: {
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                },
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                }
              },
              emphasis: {
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                },
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                }
              },
              itemStyle: {
                areaColor: 'transparent',
                borderColor: '#ffffff',
                borderWidth: 1
              },
              data: this.mapData.children,
              zlevel: 2
            }]
          }

          this.chart.setOption(option, true)
        } catch (error) {
          console.error('加载省份地图失败:', error)
          this.error = '加载省份地图失败'
          // 发生错误时，移除最后一条历史记录
          this.mapHistory.pop()
        } finally {
          this.loading = false
        }
      } else if (this.currentLevel === 'province') {
        try {
          this.loading = true
          // 获取城市的地图数据
          const cityCode = this.getProvinceCode(clickedArea)
          if (!cityCode) {
            throw new Error(`未找到城市 ${clickedArea} 的编码`)
          }

          const response = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${cityCode}_full.json`)
          if (!response.data) {
            throw new Error('城市地图数据为空')
          }

          // 注册城市地图
          echarts.registerMap(clickedArea, response.data)

          // 生成城市的模拟数据
          const cityData = {
            name: clickedArea,
            children: response.data.features.map(feature => ({
              name: feature.properties.name,
              value: Math.floor(Math.random() * 1000)
            }))
          }

          this.currentLevel = 'city'
          this.currentArea = clickedArea
          this.mapData = cityData

          // 重新设置地图配置
          const option = {
            geo: {
              map: clickedArea,
              zoom: 1.2,
              top: '8%',
              itemStyle: {
                areaColor: 'rgba(163, 1, 1, 1)',
                shadowColor: 'rgb(163, 1, 1)',
                shadowOffsetY: 5
              },
              select: {
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                }
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                }
              },
              regions: [{
                name: '南海诸岛',
                silent: true,
                itemStyle: {
                  areaColor: 'rgb(255, 141, 141)',
                  shadowColor: 'transparent',
                  shadowOffsetY: 0
                },
                select: {
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  }
                },
                emphasis: {
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  }
                }
              }],
              z: 1,
              show: true
            },
            visualMap: {
              min: 0,
              max: 1000,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true
              // inRange: {
              //   color: ['#ffeda0', '#f03b20']
              // }
            },
            series: [{
              name: '数据',
              type: 'map',
              geoIndex: -1,
              map: clickedArea,
              zoom: 1.2,
              top: '8%',
              z: 2,
              label: {
                show: true,
                color: '#000',
                fontSize: 14
              },
              select: {
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                },
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                }
              },
              emphasis: {
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                },
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                }
              },
              itemStyle: {
                areaColor: 'transparent',
                borderColor: '#ffffff',
                borderWidth: 1
              },
              data: this.mapData.children,
              zlevel: 2
            }]
          }

          this.chart.setOption(option, true)
        } catch (error) {
          console.error('加载城市地图失败:', error)
          this.error = '加载城市地图失败'
          // 发生错误时，移除最后一条历史记录
          this.mapHistory.pop()
        } finally {
          this.loading = false
        }
      }
    },
    async handleBack() {
      try {
        this.loading = true

        if (this.mapHistory.length === 0) {
          throw new Error('没有历史记录')
        }

        // 从历史记录中获取上一级数据
        const previousState = this.mapHistory.pop()
        console.log('历史记录状态:', previousState)

        // 使用历史记录中的数据
        this.currentLevel = previousState.level
        this.currentArea = previousState.area
        this.mapData = previousState.data

        // 如果是返回到中国地图，重新初始化
        if (this.currentLevel === 'china') {
          try {
            console.log('开始加载中国地图数据')

            // 1. 添加淡出动画
            if (this.chart) {
              this.chart.setOption({
                animation: true,
                animationDuration: 300,
                animationEasing: 'cubicOut'
              })
              // 等待动画完成
              await new Promise(resolve => setTimeout(resolve, 300))
            }

            // 2. 重新加载中国地图数据
            const response = await axios.get('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
            if (!response.data) {
              throw new Error('中国地图数据为空')
            }

            console.log('中国地图数据加载成功')

            // 3. 销毁当前图表实例
            if (this.chart) {
              this.chart.dispose()
              this.chart = null
            }

            // 4. 保存并注册地图
            this.guojiaData = response
            echarts.registerMap('china', response.data)
            console.log('中国地图注册成功')

            // 5. 生成新的地图数据
            const chinaData = {
              name: '中国',
              children: response.data.features.map(feature => ({
                name: feature.properties.name,
                value: Math.floor(Math.random() * 1000)
              }))
            }

            // 6. 更新状态
            this.currentLevel = 'china'
            this.currentArea = '中国'
            this.mapData = chinaData

            console.log('返回中国地图数据:', {
              level: this.currentLevel,
              area: this.currentArea,
              mapData: this.mapData
            })

            // 7. 重新初始化图表
            this.initChart()

            // 8. 添加淡入动画并渲染
            const option = {
              animation: true,
              animationDuration: 300,
              animationEasing: 'cubicIn',
              title: {
                text: '中国地图',
                left: 'center'
              },
              tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderColor: '#ccc',
                borderWidth: 1,
                padding: [10, 15],
                textStyle: {
                  color: '#333'
                },
                formatter: (params) => {
                  const data = params.data || {}
                  return `${params.name}<br/>数值：${data.value || 0}`
                }
              },
              visualMap: {
                min: 0,
                max: 1000,
                left: 'left',
                top: 'bottom',
                text: ['高', '低'],
                calculable: true
              },
              // 创建一个阴影背景层
              geo: {
                map: 'china',
                zoom: 1.6,
                top: '30%',
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                },
                select: {
                  itemStyle: {
                    areaColor: 'rgba(163, 1, 1, 1)',
                    shadowColor: 'rgb(163, 1, 1)',
                    shadowOffsetY: 5
                  }
                },
                emphasis: {
                  itemStyle: {
                    areaColor: 'rgba(163, 1, 1, 1)',
                    shadowColor: 'rgb(163, 1, 1)',
                    shadowOffsetY: 5
                  }
                },
                regions: [{
                  name: '南海诸岛',
                  silent: true,
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  },
                  select: {
                    itemStyle: {
                      areaColor: 'rgb(255, 141, 141)',
                      shadowColor: 'transparent',
                      shadowOffsetY: 0
                    }
                  },
                  emphasis: {
                    itemStyle: {
                      areaColor: 'rgb(255, 141, 141)',
                      shadowColor: 'transparent',
                      shadowOffsetY: 0
                    }
                  }
                }],
                z: 1,
                show: true
              },
              series: [{
                name: '数据',
                type: 'map',
                geoIndex: -1,
                map: 'china',
                zoom: 1.6,
                top: '30%',
                z: 2,
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                },
                select: {
                  itemStyle: {
                    areaColor: 'transparent',
                    borderColor: '#ffffff',
                    borderWidth: 1
                  },
                  label: {
                    show: true,
                    color: '#000',
                    fontSize: 14
                  }
                },
                emphasis: {
                  label: {
                    show: true,
                    color: '#000',
                    fontSize: 14
                  },
                  itemStyle: {
                    areaColor: 'transparent',
                    borderColor: '#ffffff',
                    borderWidth: 1
                  }
                },
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                },
                data: this.mapData.children,
                zlevel: 2
              }]
            }

            this.chart.setOption(option)
          } catch (error) {
            console.error('重新加载中国地图数据失败:', error)
            throw error
          }
        } else {
          // 如果不是中国地图，直接渲染
          const option = {
            geo: {
              map: this.currentLevel === 'province' ? this.currentArea : 'china',
              zoom: 1.2,
              top: '8%',
              itemStyle: {
                areaColor: 'rgba(163, 1, 1, 1)',
                shadowColor: 'rgb(163, 1, 1)',
                shadowOffsetY: 5
              },
              select: {
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                }
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(163, 1, 1, 1)',
                  shadowColor: 'rgb(163, 1, 1)',
                  shadowOffsetY: 5
                }
              },
              regions: [{
                name: '南海诸岛',
                silent: true,
                itemStyle: {
                  areaColor: 'rgb(255, 141, 141)',
                  shadowColor: 'transparent',
                  shadowOffsetY: 0
                },
                select: {
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  }
                },
                emphasis: {
                  itemStyle: {
                    areaColor: 'rgb(255, 141, 141)',
                    shadowColor: 'transparent',
                    shadowOffsetY: 0
                  }
                }
              }],
              z: 1,
              show: true
            },
            visualMap: {
              min: 0,
              max: 1000,
              left: 'left',
              top: 'bottom',
              text: ['高', '低'],
              calculable: true
            },
            series: [{
              name: '数据',
              type: 'map',
              geoIndex: -1,
              map: this.currentLevel === 'province' ? this.currentArea : 'china',
              zoom: 1.2,
              top: '8%',
              z: 2,
              label: {
                show: true,
                color: '#000',
                fontSize: 14
              },
              select: {
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                },
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                }
              },
              emphasis: {
                label: {
                  show: true,
                  color: '#000',
                  fontSize: 14
                },
                itemStyle: {
                  areaColor: 'transparent',
                  borderColor: '#ffffff',
                  borderWidth: 1
                }
              },
              itemStyle: {
                areaColor: 'transparent',
                borderColor: '#ffffff',
                borderWidth: 1
              },
              data: this.mapData.children,
              zlevel: 2
            }]
          }
          this.chart.setOption(option, true)
        }
      } catch (error) {
        console.error('返回上一级失败:', error)
        this.error = '返回上一级失败'
      } finally {
        this.loading = false
      }
    },
    getProvinceByCity(cityName) {
      console.log('查找城市所属省份:', cityName)
      console.log('当前地区编码数据:', this.areaCodes)

      // 从城市名获取所属省份
      for (const [provinceName] of Object.entries(this.areaCodes.provinces)) {
        const cities = this.areaCodes.cities[provinceName] || []
        // console.log(`检查省份 ${provinceName} 的城市列表:`, cities)
        if (cities.includes(cityName)) {
          console.log(`找到城市 ${cityName} 所属的省份:`, provinceName)
          return provinceName
        }
      }
      console.log(`未找到城市 ${cityName} 所属的省份`)
      return null
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 800px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.map-header {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}

.back-button {
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.back-button:hover {
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  color: #666;
}

.error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: red;
  font-size: 16px;
}
</style>
