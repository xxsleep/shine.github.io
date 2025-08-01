<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-cell" style="width: 80%; text-align: left;padding-left:15px;">项目名称</div>
      <div class="table-cell" style="width: 20%">告警数量</div>
    </div>
    <div class="table-body">
      <div v-for="(item, index) in tableData" :key="index" class="table-row">
        <div class="table-cell" style="width: 80%; text-align: left;padding-left:15px;">{{ item.province }}</div>
        <div class="table-cell" style="width: 20%">{{ item.rentalCount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { province: '无锡市儿童福利院易地新建项目', rentalCount: 2060 },
        { province: '中日友好园', rentalCount: 1815 },
        { province: '龙塘岸后五巷B地块', rentalCount: 1294 },
        { province: '锡钢地区金城路南侧地块周边道路（二期）工程', rentalCount: 1023 },
        { province: '无锡市青山高级中学新建学生宿舍楼项目', rentalCount: 1815 },
        { province: '无锡市残疾人综合服务基地二期工程（A区）', rentalCount: 1466 },
        { province: '锡钢地区北侧学校项目', rentalCount: 1299 },
        { province: '梁溪河综合整治提升工程项目', rentalCount: 1211 },
        { province: 'XDG-2021-59号地块开发建设一期项目', rentalCount: 988 }
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
  margin-bottom: 5px;
}

.table-cell {
  text-align: center;
  height: 35px;
  line-height: 35px;
  // 添加文字倾斜样式
  font-style: italic;
  // padding-left: 8px;
}

// 添加奇数行和偶数行的背景颜色
.table-row:nth-child(odd) {
  background-color: rgba(23, 52, 97, 0.5);
}

.table-row:nth-child(even) {
  background-color: rgba(16, 40, 75, 0.6);
}
</style>
