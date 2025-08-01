<template>
  <div class="Box_box">
    <div class="desc" style="cursor: pointer;">
      <div class="line" />
      <div class="left">设备接入总数</div>
      <div class="centered" />
      <div class="right">2648</div>
    </div>
    <div class="unLine">
      <div class="unLineTitle">当前设备离线数</div>
      <div class="boxContent">
        <div ref="progressBar" class="progressBar" />
        <div style=" margin-left: 8px;">266</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$refs.progressBar.style.width = (266 / 2648).toFixed(2) * 100 + '%'
    }, 0)
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.Box_box {
  width: 100%;
  height: 100%;
  padding:18px 12px 0;
  .desc {
    display: flex;
    align-items: center;
    height: 28%;
    width: 100%;
    // background-color: pink;
    margin-bottom: 14px;
    .line {
      width: 4px;
      height: 20px;
      background: linear-gradient(180deg, #2078DC 0%, #7BC3FB 100%);
      margin: 0 10px 0 10px;
    }
    .left {
      font-family: SourceHanSansCN;
      font-size: 18px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      font-feature-settings: "kern" on;
      color: #adbfcc;
    }
    .centered {
      background: #475259;
      width: 2px;
      height: 20px;
      margin: 0 auto 0 auto;
    }
    .right {
      span{
        font-size: 32px;
        letter-spacing: 0px;
        font-weight: bold;
      }
      font-size: 20px;
      line-height: normal;
      color: #ffffff;
    }
  }
  .charts {
    width: 100%;
    height: 72%;
  }
}

.unLine{
    cursor: pointer;
    margin-top: 20px;
    .unLineTitle{
      padding-left: 6px;
      font-size: 16px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: -0.35px;
      font-variation-settings: "opsz" auto;
      color: #FFFFFF;
    }
    .boxContent{
      height:30px;
      background: rgb(35, 173, 245,0.2);
      box-sizing: border-box;
      margin-top: 5px;
      font-size: 16px;
      line-height: 30px;
      padding: 0 6px;
      display: flex;
      align-items: center;
      .progressBar{
        max-width: 95%;
        width: 0px;
        height: 5px;
        border-radius: 2.5px;
        background: linear-gradient(90deg, rgba(15, 84, 153, 0.396) 0%, #73D0FF 99%);
        transition: all 1s linear
      }
    }
  }
</style>
