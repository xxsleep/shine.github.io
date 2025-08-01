<template>
  <FullScreen>
    <div
      :class="[
        'ai-container',
        currentTab === 'projectOverview' ? 'container_bgc2' : 'container_bgc1',
      ]"
    >
      <div class="title_tab">
        <div class="tab-buttons">
          <div
            v-for="tab in tabs"
            :key="tab.name"
            :class="{ active: currentTab === tab.name }"
            @click="changeTab(tab.name)"
          >
            {{ tab.label }}
          </div>
        </div>
        <div class="right-info">
          <!-- <div class="time-info">
            <div>{{ currentTime }}</div>
            <div>{{ currentDate }}</div>
          </div>
          <div class="weather-info">
            当前天气：晴
          </div> -->
          <div class="backs" @click="back">
            <i class="el-icon-back" />
          </div>
          <img src="./img/weather.png" alt="" class="weather-icon">
        </div>
      </div>
      <component :is="currentComponent" class="currentComponent" />
    </div>
  </FullScreen>
</template>

<script>
import ProjectOverview from './ProjectOverview/ProjectOverview.vue'
import VideoMonitoring from './VideoMonitoring/VideoMonitoring.vue'
import AIAnalysis from './AIAnalysis/AIAnalysis.vue'
import EchartMap from './echartMap/index.vue'
import FullScreen from './components/FullScreen.vue'

export default {
  components: {
    FullScreen,
    ProjectOverview,
    VideoMonitoring,
    AIAnalysis,
    EchartMap
  },
  data() {
    return {
      currentTab: 'projectOverview',
      currentComponent: ProjectOverview,
      currentTime: '',
      currentDate: '',
      tabs: [
        { name: 'projectOverview', label: '项目概况' },
        { name: 'videoMonitoring', label: '视频监控' },
        { name: 'aiAnalysis', label: 'AI分析' }
        // { name: 'EchartMap', label: '地图' }
      ]
    }
  },
  mounted() {
    this.updateDateTime()
    setInterval(this.updateDateTime, 1000)
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab
      switch (tab) {
        case 'projectOverview':
          this.currentComponent = ProjectOverview
          break
        case 'videoMonitoring':
          this.currentComponent = VideoMonitoring
          break
        case 'aiAnalysis':
          this.currentComponent = AIAnalysis
          break
        case 'EchartMap':
          this.currentComponent = EchartMap
          break
      }
    },
    updateDateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')

      this.currentTime = `${hours}:${minutes}:${seconds}`
      this.currentDate = `${year}-${month}-${day}`
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.ai-container {
  width: 1920px;
  height: 1080px;
  padding: 0px 20px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.container_bgc1 {
  background-image: url("./img/bgc.png");
  background-color: rgba(1, 11, 27, 0.9);
}

.container_bgc2 {
  background-image: url("./img/map.png");
}

.title_tab {
  height: 104px;
  padding-left: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: url("./img/title.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
}

.tab-buttons {
  display: flex;
}

.tab-buttons div {
  width: 175px;
  height: 77px;
  color: #90b6ed;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
  line-height: 77px;
}

.tab-buttons div.active {
  color: #fff;
  font-weight: bold;
  background-image: url("./img/active.png");
}

.right-info {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.time-info {
  text-align: center;
  margin-right: 20px;
}

.weather-info {
  text-align: center;
}

.currentComponent {
  width: 100%;
  height: calc(100% - 104px);
  padding: 10px 0 30px;
}

.backs {
  // position: absolute;
  // right: 400px;
  // top: 2.2vw !important;
  cursor: pointer;
  padding: 2px 20px;
  color: #fff;
  // border: 1px solid #fff;
  font-weight: 500;
  height: 104px;
  line-height: 104px;
  .el-icon-back {
    font-size: 24px;
  }
}
</style>
