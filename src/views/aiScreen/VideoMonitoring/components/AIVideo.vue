<template>
  <div class="full-height-container">
    <div class="left-element">
      <!-- 添加 autoplay 属性 -->
      <video height="100%" controls autoplay>
        <source src="../img/video.mp4" type="video/mp4">
        您的浏览器不支持视频播放。
      </video>
    </div>
    <div class="right-element">
      <!-- 添加 autoplay 属性 -->
      <video height="100%" controls autoplay>
        <source src="../img/video.mp4" type="video/mp4">
        您的浏览器不支持视频播放。
      </video>
    </div>
  </div>
</template>

<script>
export default {
  // 可以在这里添加组件的逻辑代码
}
</script>

<style lang="scss" scoped>
/* 让页面高度撑满 */
html,
body {
  height: 100%;
  margin: 0;
}

.full-height-container {
  display: flex;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  gap: 15px;
  /* 设置两个元素之间的间隔 */
}

.left-element,
.right-element {
  flex: 1;
  /* 让左右两个元素宽度撑满 */
  background-color: #757474;
  /* 为了方便查看，设置背景颜色 */
  display: flex;
  justify-content: center;
}
</style>
