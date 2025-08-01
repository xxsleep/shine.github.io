<template>
  <div class="device_container">
    <div class="module-row">
      <div class="module one">
        <div class="module-title">设备总数</div>
        <div class="module-number">7860</div>
      </div>
      <div class="module two">
        <div class="module-title">库存数量</div>
        <div class="module-number">1285</div>
      </div>
    </div>
    <div class="module-row">
      <div class="module three">
        <div class="module-title">在线数量</div>
        <div class="module-number">5120</div>
      </div>
      <div class="module four">
        <div class="module-title">离线数量</div>
        <div class="module-number">1455</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeviceComponent',
  data() {
    return {
      // 这里可以添加动态数据
    }
  }
}
</script>

<style lang="scss" scoped>
.device_container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

.module-row {
  display: flex;
  gap: 20px;

  .one {
    background-image: url('../../img/sbzs_icon.png');
  }

  .two {
    background-image: url('../../img/kc_icon.png');
  }

  .three {
    background-image: url('../../img/onlin_icon.png');
  }

  .four {
    background-image: url('../../img/lx_icon.png');
  }
}

.module {
  flex: 1;
  text-align: center;
  width: 194px;
  height: 93px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 24px 0 0 70px;
  line-height: 30px;
}

.module-number {
  font-size: 26px;
  font-weight: bold;
}

.module-title {
  font-style: italic; // 添加此样式让文字倾斜
}
</style>
