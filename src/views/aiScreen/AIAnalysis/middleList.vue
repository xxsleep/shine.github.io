<template>
  <div class="AIcontainer" style="color: white; position: relative">
    <div class="Box_center">
      <div class="Box_title">
        <span>实时预警</span>
        <span class="checkDetail">查看更多 ></span>
      </div>

      <div class="Box_box">
        <div class="Box_Pic">
          <div class="Box_left">
            <div v-for="e in picList" :key="e.id" class="pic">
              <img :src="e.picture" alt="" @click="showImage(e)">
            </div>
          </div>
          <div class="Box_middle">
            <img :src="alarmDetail.picture" alt="">
          </div>
          <div class="Box_right">
            <div class="rigth_title">
              {{ alarmDetail.projectName }}
            </div>
            <div class="content">
              <div class="title">总承包：</div>
              <div class="name">{{ alarmDetail.generalUnit }}</div>
            </div>
            <div class="content">
              <div class="title">所属企业：</div>
              <div class="name">{{ alarmDetail.company }}</div>
            </div>
            <div class="content">
              <div class="title">告警内容：</div>
              <div class="name">{{ alarmDetail.eventName }}</div>
            </div>
            <div class="content">
              <div class="title">告警时间：</div>
              <div class="name">{{ alarmDetail.eventTime }}</div>
            </div>
            <div class="policeBtn" @click="remove(alarmDetail.id)" />
          </div>
        </div>
      </div>
    </div>

    <div class="Box_bottom">
      <div class="Box_title">
        <span>AI视频监控识别记录</span>
        <span class="checkDetail">查看更多 ></span>
      </div>

      <div class="AIVideo_center">
        <videoInfo />
      </div>
    </div>
  </div>
</template>

<script>
import videoInfo from './videoInfo.vue'
export default {
  components: {
    videoInfo
  },
  data() {
    return {
      picList: [],
      alarmDetail: {}
    }
  },
  created() {
    this.getDetailData()
  },
  methods: {
    getDetailData() {
      this.picList = [
        {
          id: '68464223ab4b7c4279baa30c',
          eventType: 11004,
          eventTime: '2025-06-09 10:08:34',
          projectName: '防建项目1',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg',
          eventName: '脚手架搭建',
          dirId: 100002,
          appId: 18,
          company: '城投建设',
          generalUnit: '无锡城投建设有限公司',
          alarmType: '未佩戴安全帽'
        },
        {
          id: '684641d8ab4b7c4279baa30b',
          eventType: 11004,
          eventTime: '2025-06-09 10:07:20',
          projectName: '防建项目2',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/AF4100561/AF4100561/01/11004/c64be007-8143-4a20-b2fb-e8175d5ff397.jpg',
          eventName: '脚手架搭建',
          dirId: 100002,
          appId: 18,
          company: '城投建设',
          generalUnit: '无锡城投建设有限公司',
          alarmType: '未佩戴安全帽'
        },
        {
          id: '68463b7aab4b7c4279baa244',
          eventType: 11004,
          eventTime: '2025-06-09 09:40:09',
          projectName: '防建项目3',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/205e9ac0-b742-49e1-bce2-e069042fe55b.jpg',
          eventName: '脚手架搭建',
          dirId: 100002,
          appId: 18,
          company: '城投建设',
          generalUnit: '无锡城投建设有限公司',
          alarmType: '未佩戴安全帽'
        },
        {
          id: '6846388aab4b7c4279baa20b',
          eventType: 11004,
          eventTime: '2025-06-09 09:27:37',
          projectName: '防建项目4',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/7a7ab93e-6883-46b6-8c5a-b2a098e8061c.jpg',
          eventName: '脚手架搭建',
          dirId: 100002,
          appId: 18,
          company: '城投建设',
          generalUnit: '无锡城投建设有限公司',
          alarmType: '未佩戴安全帽'
        },
        {
          id: '6846365cab4b7c4279baa1f6',
          eventType: 11004,
          eventTime: '2025-06-09 09:18:20',
          projectName: '防建项目5',
          picture:
            'https://itts-middle.oss-cn-shanghai.aliyuncs.com/AF4100561/AF4100561/01/11004/53179d36-1fd1-4252-ab69-b8696abdc90b.jpg',
          eventName: '脚手架搭建',
          dirId: 100002,
          appId: 18,
          company: '城投建设',
          generalUnit: '无锡城投建设有限公司',
          alarmType: '未佩戴安全帽'
        }
      ]
      this.alarmDetail = {
        id: '68464223ab4b7c4279baa30c',
        eventType: 11004,
        eventTime: '2025-06-09 10:08:34',
        projectName:
          '无锡市儿童福利院易地新建项目',
        picture:
          'https://itts-middle.oss-cn-shanghai.aliyuncs.com/FH2832366/FH2832366/01/11004/85b4f085-6fb6-438a-97b7-49d1f87204ef.jpg',
        eventName: '未穿着反光背心',
        dirId: 100002,
        appId: 18,
        company: '无锡市社会福利中心',
        generalUnit: '无锡市亨利富建设发展有限公司'
      }
    },
    showImage() {},
    remove() {},
    tableRowClassName({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return 'twoRow'
      }
      return 'oneRow'
    }
  }
}
</script>

<style lang="scss" scoped>
.checkDetail {
  font-family: SourceHanSansCN-Regular;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  text-align: right;
  color: rgba(207, 218, 230, 0.7);
  cursor: pointer;
}
.Box_center {
  height: 422px;
  border: 2px solid rgba(110, 158, 255, 0.27);
  background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
  // background-color: yellow;
  margin-bottom: 16px;
}
.Box_bottom {
  height: 482px;
  // background-color: yellow;
  border: 2px solid rgba(110, 158, 255, 0.27);
  background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
  .AIVideo_center {
    padding-left: 6px;
  }
}
.Box_title {
  height: 45px;
  position: relative;
  background: url("./img/弹窗002.png") no-repeat;
  background-size: 100% 100% !important;
  margin-bottom: 5px;
  padding-right: 13px;
  padding-left: 45px;
  display: flex;
  justify-content: space-between;
  font-family: PingFang;
  font-size: 18px;
  display: flex;
  align-items: center;
  color: #ffffff;
}
.Box_box {
  width: 100%;
  // height: calc(100% - 50px);
  // background-color: rgba(#000000, 0.6);
  // border: 1px solid #3b4b55;
  border-radius: 2px;
  padding-left: 8px;
  // padding: 2px 3px 2px;
  // background: linear-gradient(
  //     0deg,
  //     rgba(17, 47, 53, 0.5),
  //     rgba(17, 47, 53, 0.5)
  //   ),
  //   linear-gradient(
  //     180deg,
  //     rgba(18, 26, 31, 0.1249) -5%,
  //     rgba(34, 59, 77, 0.5) 128%
  //   );
  box-sizing: border-box;
  // border: 1px solid #435059;
  display: flex;
  flex-direction: column;
  // background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);
}

.Box_Pic {
  height: 345px;
  width: 100%;
  display: flex;
  // background: linear-gradient(0deg, #0D141A, #0D141A), linear-gradient(180deg, rgba(18, 26, 31, 0.2498) -5%, #223B4D 128%);
  box-sizing: border-box;
  // border: 1px solid #435059;
  // margin-top: 26px;
  // margin-bottom: 14px;
  .Box_left {
    padding-right: 8px;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 162px;
    .pic {
      width: 152px;
      height: 92px;
      margin-bottom: 20px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    .pic::before {
      display: block;
      content: "";
      width: 152px;
      height: 92px;
      border: 1px solid #cfdae6;
      position: absolute;
      right: -4px;
      bottom: -7px;
      z-index: -1;
      opacity: 0.18;
    }
  }
  .Box_left::-webkit-scrollbar {
    width: 2px;
  }
  .Box_left::-webkit-scrollbar-track-piece {
    background: #304150;
  }
  .Box_left::-webkit-scrollbar-thumb {
    background: #2f6ca5;
  }

  .Box_middle {
    padding: 12px 12px 12px 20px;
    width: calc(100% - 404px);
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .Box_right {
    margin: 12px 12px 12px 0;
    box-sizing: border-box;
    width: 242px;
    // background: url('./img/infobg.png');
    // background: linear-gradient(
    //   90deg,
    //   rgba(12, 72, 91, 0.4) 0%,
    //   rgba(11, 40, 48, 0.8) 100%
    // );
    // background: linear-gradient(90deg, rgba(0, 183, 255, 0.18) 0%, rgba(0, 183, 255, 0) 100%);
    padding: 12px 8px 0;
    position: relative;
    background: linear-gradient(to bottom, /* 等同于 180deg */ #07204d, #030f24);

    .rigth_title {
      font-family: Source Han Sans;
      font-size: 12px;
      font-weight: bold;
      line-height: 18px;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #a7cfeb;
      margin-bottom: 15px;
      position: relative;
    }
    .rigth_title::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: -8px;
      width: 2px;
      height: 100%;
      opacity: 1;
      background: linear-gradient(180deg, #368ad9 0%, #00f6ff 100%);
      box-shadow: 1px 0px 3px 0px #003e44;
      margin-bottom: 15px;
    }
    .content {
      display: flex;
      margin-bottom: 10px;
      font-family: PingFang SC;
      font-size: 12px;
      font-weight: normal;
      line-height: 14px;
      letter-spacing: 0em;
      color: #ccd2da;
      .title {
        white-space: nowrap;
      }
    }
    .policeBtn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 22px;
      width: 200px;
      height: 30px;
      opacity: 1;
      background: url("./img/xiaojing.png");
      background-size: 100% 100%;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }
}

// 456
::v-deep .oneRow {
  height: 56px;
  background-color: rgba(31, 57, 87, 0.32) !important;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}
::v-deep .dialog_box {
  .el-dialog {
    background-color: rgba(18, 62, 73, 0.8) !important;
  }
}

::v-deep.twoRow {
  background-color: rgba(8, 26, 48, 0.8) !important;
  height: 56px;
}
::v-deep .el-table td {
  border-bottom: none;
  border: none;
  // border-bottom: 1px solid #2384DD;
  // box-shadow: inset 0px -1px 1px 0px #2384DD;
}

::v-deep .el-table th.is-leaf {
  // border-top: 1px solid #256ba0;
  border-bottom: none;
  font-size: 14px;
  background: rgba(35, 132, 221, 0.3);
}
::v-deep .el-table tr th {
  background: #071d45 !important;
  color: #fff;
  // background: linear-gradient(0deg, #116D8C -22%, #1C2C38 84%) !important;
}

::v-deep .el-table {
  color: #fff;
  // border: 1px solid #129BFF;
  // border-bottom:none
  /* 定义滚动容器的滚动条样式 */
}
::v-deep .el-dialog__headerbtn {
  font-size: 20px !important;
}
.imgPosition {
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
  cursor: pointer;
}

::v-deep .el-table::before {
  height: 0 !important;
}

.el-table ::v-deep .oneRow {
  border-bottom: none !important;
  border-top: none !important;
  height: 48px !important;
  background: #0c244c !important;
}

.el-table ::v-deep .twoRow {
  border-bottom: none !important;
  border-top: none !important;
  background: #081c3d !important;
  height: 48px !important;
}
</style>
