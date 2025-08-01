<template>
  <div class="container">
    <div class="left">
      <LeftList ref="left" />
    </div>
    <div class="middle">
      <middleList ref="middle" />
    </div>
    <div class="right">
      <rightList ref="right" />
    </div>
  </div>
</template>
<script>
import LeftList from './leftList.vue'
import RightList from './rightList.vue'
import MiddleList from './middleList.vue'
export default {
  name: 'AIAnalysis',
  components: { LeftList, RightList, MiddleList },
}
</script>
<style lang="scss" scoped>
/*内容布局*/
  .container {
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    pointer-events: auto;
    justify-content: space-between;
    padding: 0 10px !important;
  }

  .middle {
    width: calc(100% - 916px);
    height: 100%;
    margin-top: 14px; // 下移
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgba(0,0,0,0.2);
  }

  .left {
    margin-top: 14px; // 下移
    width: 440px;
    height: 100%;
    // background-color: skyblue;
  }

  .right {
    margin-top: 14px; // 下移
    width: 440px;
    height: 100%;
    // background-color: skyblue;
  }

  .bg{
    margin-top: 20px;
    width: 92%;
    height: 94%;
    margin-left: 60px;
    border: 3px solid #204A7A;
    border-radius: 5px;

    .content{
      width: 100%;
      height: calc(100% - 65px);
      display: flex;
    }
  }
</style>
