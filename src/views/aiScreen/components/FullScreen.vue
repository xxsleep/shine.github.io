<template>
  <div ref="full_screen" class="full-screen">
    <div ref="adapter_screen" class="adapter-screen">
      <slot />
      <!-- <img class="full-screen" src="./fullScreen.png" alt="" @click="fullScreenBtnFun"> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'FullScreen',
  data() {
    return {
      fullScreenBtnData: 'fullscreen',
      isShow: true
    }
  },
  created() {
    if (this.$route.params.userName) {
      this.isShow = false
    }
  },
  mounted() {
    this.scaleFun()
    window.addEventListener('resize', this.scaleFun, false)
    document.addEventListener('fullscreenchange', this.exitView, false)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.scaleFun)
    document.removeEventListener('fullscreenchange', this.exitView)
  },
  methods: {
    fullScreenBtnFun() {
      if (this.fullScreenBtnData === 'fullscreen') {
        this.fullScreenBtnData = 'exit-fullscreen'
        this.$refs.full_screen.requestFullscreen()
      } else {
        this.fullScreenBtnData = 'fullscreen'
        document.exitFullscreen()
      }
    },

    scaleFun() {
      setTimeout(() => {
        const fullScreen = this.$refs.full_screen
        const adapterScreen = this.$refs.adapter_screen
        let multiple = 1
        if (fullScreen.offsetWidth / 1920 < fullScreen.offsetHeight / 1080) {
          multiple = fullScreen.offsetWidth / 1920
        } else {
          multiple = fullScreen.offsetHeight / 1080
        }
        adapterScreen.style.transform = `translateX(-50%) scale(${multiple},${multiple})`
      }, 40)
    },
    exitView() {
      if (!document.fullscreenElement) {
        this.fullScreenBtnData = 'fullscreen'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .full-screen {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    // background-image: url("../bg/bg.png");
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
  background-color: rgba(1,11,27,1);
  }

  .adapter-screen {
    width: 1920px;
    height: 1080px;
    position: absolute;
    left: 50%;
    transform-origin: 50% 0 0;

    .full-screen{
      position: absolute;
      right: 60px;
      top: 55px;
    }
    .back{
      position: absolute;
      right: 140px;
      top: 55px;
    }
  }

  .full-screen-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: white;
    --size: 20px;
    width: var(--size);
    height: var(--size);
  }
</style>
