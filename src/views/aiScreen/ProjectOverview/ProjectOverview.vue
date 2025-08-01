<template>
  <div class="container">
    <!-- 左侧布局 -->
    <div class="left-container">
      <!-- 左侧第一个组件 -->
      <div class="left-component" style="height: 270px;">
        <div class="component-title">设备统计</div>
        <div class="component-content">
          <Device />
        </div>
      </div>
      <!-- 左侧第二个组件 -->
      <div class="left-component" style="height: 270px;">
        <div class="component-title">设备监测告警处理统计</div>
        <div class="component-content">
          <DeviceGj />
        </div>
      </div>
      <!-- 左侧第三个组件 -->
      <div class="left-component" style="height: 350px;">
        <div class="component-title">
          省份租赁排名
          <a href="#" class="view-more">查看更多 ></a>
        </div>
        <div class="component-content">
          <Ranking />
        </div>
      </div>
    </div>
    <!-- 右侧布局 -->
    <div class="right-container">
      <!-- 右侧第一个组件 -->
      <div class="right-component" style="height: 400px;">
        <div class="component-title">
          AI视频监控识别
          <a href="#" class="view-more">查看更多 ></a>
        </div>
        <div class="component-content">
          <AI />
        </div>
      </div>
      <!-- 右侧第二个组件 -->
      <div class="right-component" style="height: 500px;">
        <div class="component-title">
          设备告警信息
          <a href="#" class="view-more">查看更多 ></a>
        </div>
        <div class="component-content">
          <DeviceInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Device from './components/device.vue'
import DeviceGj from './components/deviceGj.vue'
import Ranking from './components/toRanking.vue'
import AI from './components/AI.vue'
import DeviceInfo from './components/deviceInfo.vue'
export default {
  components: {
    Device,
    DeviceGj,
    Ranking,
    AI,
    DeviceInfo
  },
  data() {
    return {
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
// 整体容器样式
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
}

// 左侧容器样式
.left-container {
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

// 左侧组件样式
.left-component {
  width: 100%;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(5, 41, 92, 0.27);
  border: 2px solid rgba(110, 158, 255, 0.27);
}

// 右侧容器样式
.right-container {
  width: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

// 右侧组件样式
.right-component {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(5, 41, 92, 0.27);
  border: 2px solid rgba(110, 158, 255, 0.27);
}

// 组件标题样式
.component-title {
  width: 100%;
  height: 47px;
  display: flex;
  padding-left: 25px;
  line-height: 48px;
  color: #f0f0f0;
  font-weight: bold;
  font-size: 18px;
  background-image: url('../img/model_title1.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  justify-content: space-between; // 添加这行以实现左右对齐
  padding-right: 25px; // 添加右侧内边距
}

// 查看更多链接样式
.view-more {
  color: #f0f0f0;
  text-decoration: none;
  font-size: 14px; // 添加这行设置文字大小为14px
}

// 地图样式
.map {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url('../img/map.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
}

.component-content {
  height: 100%;
  width: 100%;
  padding: 0 5px 5px;
  color: #f0f0f0;
}
</style>
