<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-cell" style="width: 20%">告警项目</div>
      <div class="table-cell" style="width: 20%">告警级别</div>
      <div class="table-cell" style="width: 30%; text-align: left">告警内容</div>
      <div class="table-cell" style="width: 30%">告警时间</div>
    </div>
    <div class="table-body">
      <div v-for="(item, index) in tableData" :key="index" class="table-row">
        <div class="table-cell" style="width: 20%">{{ item.alarmProject }}</div>
        <div class="table-cell" style="width: 20%; color: lightgreen">{{ item.alarmLevel }}</div>
        <div class="table-cell" style="width: 30%; text-align: left">{{ item.alarmContent }}</div>
        <div class="table-cell" style="width: 30%">{{ item.alarmTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { alarmProject: '无锡市儿童福利院易地新建项目', alarmLevel: '一般告警', alarmContent: 'XYN23090218 产生右倾斜报警', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '无锡市儿童福利院易地新建项目', alarmLevel: '一般告警', alarmContent: '反光背心监测', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '无锡市儿童福利院易地新建项目', alarmLevel: '一般告警', alarmContent: '反光背心监测', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '龙塘岸后五巷B地块', alarmLevel: '一般告警', alarmContent: '塔式起重机 32FK-T01275# 吊高超出阈值最小值 0,告警级别:紧急,当前值为-6.49', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '龙塘岸后五巷B地块', alarmLevel: '一般告警', alarmContent: '塔式起重机 32FK-T01275# 吊高超出阈值最小值 0,告警级别:紧急,当前值为-6.49', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '锡钢地区北侧幼儿园项目', alarmLevel: '一般告警', alarmContent: '反光背心监测', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '锡钢地区北侧幼儿园项目', alarmLevel: '一般告警', alarmContent: '反光背心监测', alarmTime: '2025-05-26 14:06:04' },
        { alarmProject: '锡钢地区北侧幼儿园项目', alarmLevel: '一般告警', alarmContent: '安全帽监测', alarmTime: '2025-05-26 14:06:04' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  width: 100%;
  height: 100%;
}

.table-header {
  height: 35px;
  display: flex;
  margin-bottom: 3px;
  background-color: rgba(27, 59, 107, 0.5);
  border-bottom: 2px solid rgba(110, 169, 248,1);
}

.table-body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 410px;
}

.table-row {
  display: flex;
  border: 1px solid rgba(44, 75, 119,1);
  overflow: hidden;
  margin-bottom: 3px;
}

.table-cell {
  // 实现内容水平垂直居中
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.5;
  font-style: normal;
  font-size: 14px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 让告警内容左对齐
.table-cell:nth-child(3) {
  justify-content: flex-start;
}

// 添加奇数行和偶数行的背景颜色
.table-row:nth-child(odd) {
  background-color: rgba(23, 52, 97, 0.5);
}

.table-row:nth-child(even) {
  background-color: rgba(16, 40, 75, 0.6);
}

// 修改滚动条样式
.table-body::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-body::-webkit-scrollbar-thumb {
  background-color: rgba(110, 169, 248, 0.5);
  border-radius: 4px;
}

.table-body::-webkit-scrollbar-thumb:hover {
  background-color: rgba(110, 169, 248, 0.8);
}

.table-body::-webkit-scrollbar-track {
  background-color: rgba(23, 52, 97, 0.5);
  border-radius: 4px;
}
</style>
