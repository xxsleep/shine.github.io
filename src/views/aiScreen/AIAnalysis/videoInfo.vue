<template>
  <div class="table-container">
    <div class="table-header">
      <div class="table-cell" style="width: 22%">项目名称</div>
      <div class="table-cell" style="width: 18%">区域名称</div>
      <div class="table-cell" style="width: 20%">告警类型</div>
      <div class="table-cell" style="width: 20%">预警时间</div>
      <div class="table-cell" style="width: 20%">预警图片</div>
    </div>
    <div class="table-body">
      <div v-for="(item, index) in tableData" :key="index" class="table-row">
        <div class="table-cell" style="width: 22%">{{ item.alarmProject }}</div>
        <div class="table-cell" style="width: 20%">{{ item.alarmContent }}</div>
        <div class="table-cell" style="width: 18%; color: lightgreen">
          {{ item.alarmLevel }}
        </div>
        <div class="table-cell" style="width: 20%">{{ item.alarmTime }}</div>
        <div class="table-cell" style="width: 20%;display: flex;align-items: center;">
          <img
            :src="item.picture"
            alt=""
            @click="bigImage(item.picture)"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          alarmProject: '无锡市儿童福利院易地新建项目',
          alarmLevel: '安全帽未佩戴',
          alarmContent: '1#脚手架搭建',
          alarmTime: '2025-05-26 14:34:05',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        },
        {
          alarmProject: '无锡市儿童福利院易地新建项目',
          alarmLevel: '安全帽未佩戴',
          alarmContent: '1#脚手架搭建',
          alarmTime: '2025-05-26 14:33:44',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        },
        {
          alarmProject: '无锡市儿童福利院易地新建项目',
          alarmLevel: '反光背心',
          alarmContent: '1#脚手架搭建',
          alarmTime: '2025-05-26 14:21:04',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        },
        {
          alarmProject: '无锡市儿童福利院易地新建项目',
          alarmLevel: '安全帽未佩戴',
          alarmContent: '1#脚手架搭建',
          alarmTime: '2025-05-26 14:14:44',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        },
        {
          alarmProject: '龙塘岸后五巷B地块',
          alarmLevel: '反光背心',
          alarmContent: '1#车辆进出',
          alarmTime: '2025-05-26 14:14:32',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        },
        {
          alarmProject: '龙塘岸后五巷B地块',
          alarmLevel: '反光背心',
          alarmContent: '1#车辆进出',
          alarmTime: '2025-05-26 14:11:00',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        },
        {
          alarmProject: '龙塘岸后五巷B地块',
          alarmLevel: '反光背心',
          alarmContent: '1#车辆进出',
          alarmTime: '2025-05-26 14:06:04',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg'
        }
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
  height: 49px;
  line-height: 49px;
  display: flex;
  margin-bottom: 3px;
  background-color: rgba(27, 59, 107, 0.5);
  border-bottom: 2px solid rgba(110, 169, 248, 1);
}

.table-body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 410px;
}

.table-row {
  display: flex;
  border: 1px solid rgba(44, 75, 119, 1);
  overflow: hidden;
  margin-bottom: 3px;
}

.table-cell {
  // 实现内容水平垂直居中
  display: flex;
  align-items: center;
  justify-content: center;
  // flex-direction: column;
  text-align: center;
  // line-height: 1.5;
  font-style: normal;
  font-size: 14px;
  // padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 49px;
  line-height: 49px;
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
img {
  width: 50px;
  height: 33px;
}
</style>
