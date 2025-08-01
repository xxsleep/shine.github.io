<template>
  <div class="ai-container">
    <div class="projectBlock" @click="projectStep"></div>
    <div class="videoBlock" @click="videoStep"></div>
    <div class="aiBlock" @click="aiStep"></div>
    <div class="back" @click="back">
      <i class="el-icon-back"></i>
    </div>
    
    <img src="@/assets/screen/video.png" alt="" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    projectStep(){
      this.$router.push('/projectScreen')
    },
    videoStep(){
      this.$router.push('/videoScreen')
    },
    aiStep(){
      this.$router.push('/bigScreen')
    },
    back(){
      this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped>
.ai-container {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}

.projectBlock {
  width: 145px;
  height: 100px;
  // background-color: yellow;
  position: absolute;
  left: 30vw;
  cursor: pointer;
}

.videoBlock {
  width: 145px;
  height: 100px;
  // background-color: pink;
  position: absolute;
  left: 39vw;
  cursor: pointer;
}

.aiBlock {
  width: 145px;
  height: 100px;
  // background-color: skyblue;
  position: absolute;
  left: 48vw;
  cursor: pointer;
}
.back {
  // width: 70px;
  // height: 30px;
  // background-color: pink;
  position: absolute;
  left: 75vw;
  top: 3.5vh;
  cursor: pointer;
  padding: 2px 20px;
  color: #fff;
  // border: 1px solid #fff;
  font-weight: 500;
}
</style>

