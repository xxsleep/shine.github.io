<template>
  <div class="container">
    <!-- 左侧布局 -->
    <div class="left-container">
      <!-- 左侧第一个组件 -->
      <div class="left-component" style="height: 200px;">
        <div class="component-title">设备接入统计</div>
        <div class="component-content">
          <DeviceNum />
        </div>
      </div>
      <!-- 左侧第二个组件 -->
      <div class="left-component" style="height: 700px;">
        <div class="component-title">设备接入列表</div>
        <div class="component-content">
          <DeviceList />
        </div>
      </div>
    </div>
    <!-- 右侧布局 -->
    <div class="right-container">
      <!-- 右侧第一个组件 -->
      <div class="right-component">
        <div class="component-title2">
          AI视频监控识别
        </div>
        <div class="component-content">
          <AIVideo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceNum from './components/deviceNum.vue'
import AIVideo from './components/AIVideo.vue'
import DeviceList from './components/deviceList.vue'
export default {
  components: {
    DeviceNum,
    AIVideo,
    DeviceList
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
  width: 1450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  // 让右侧容器子元素填充剩余高度
  justify-content: stretch;
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
  // 让右侧组件填充父容器剩余高度
  flex: 1;
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
.component-title2{
   width: 100%;
  height: 47px;
  display: flex;
  padding-left: 25px;
  line-height: 48px;
  color: #f0f0f0;
  font-weight: bold;
  font-size: 18px;
  background-image: url('../img/model_title2.png');
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
