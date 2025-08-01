<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-cell" style="width: 30%">排名</div>
      <div class="table-cell" style="width: 40%">省份名称</div>
      <div class="table-cell" style="width: 30%">租赁数量</div>
    </div>
    <div class="table-body">
      <div v-for="(item, index) in tableData" :key="index" class="table-row">
        <div class="table-cell" style="width: 30%">{{ index + 1 }}</div>
        <div class="table-cell" style="width: 40%">{{ item.province }}</div>
        <div class="table-cell" style="width: 30%">{{ item.rentalCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { province: '北京市', rentalCount: 2060 },
        { province: '上海市', rentalCount: 1815 },
        { province: '广东省', rentalCount: 1294 },
        { province: '江苏省', rentalCount: 1023 },
        { province: '浙江省', rentalCount: 1815 },
        { province: '山东省', rentalCount: 1294 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 100%;
}

.table-header {
  display: flex;
  margin-bottom: 3px;
  background-color: rgba(27, 59, 107, 0.5);
  border-bottom: 2px solid rgba(110, 169, 248,1);
}

.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  border: 1px solid rgba(44, 75, 119,1);
  overflow: hidden;
  margin-bottom: 3px;
}

.table-cell {
  text-align: center;
  height: 35px;
  line-height: 35px;
  // 添加文字倾斜样式
  font-style: italic;
}

// 添加奇数行和偶数行的背景颜色
.table-row:nth-child(odd) {
  background-color: rgba(23, 52, 97, 0.5);
}

.table-row:nth-child(even) {
  background-color: rgba(16, 40, 75, 0.6);
}
</style>
