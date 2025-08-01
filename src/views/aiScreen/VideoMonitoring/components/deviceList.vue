<template>
  <div class="device_list">
    <div class="deviceContent">
      <el-input
        v-model="searchValue"
        placeholder="请输入项目名称"
        size="mini"
        suffix-icon="el-icon-search"
        style="height: 38px;"
      />
      <div v-if="deviceTreeData && deviceTreeData.length > 0" class="listStyle">
        <ul>
          <!-- 使用 node.id 作为 key -->
          <TreeNode
            v-for="node in deviceTreeData"
            :key="node.id"
            :node="node"
            :level="1"
            :expanded-ids="expandedIds"
            :selected-id="selectedId"
            :max-level="4"
            @toggle-expand="handleToggleExpand"
            @select-node="handleSelectNode"
          />
        </ul>
      </div>
      <div v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue'

export default {
  components: {
    TreeNode
  },
  data() {
    return {
      searchValue: '',
      // 示例数据添加 id 属性
      deviceTreeData: [
        {
          id: 1,
          name: '江苏省',
          children: [
            {
              id: 2,
              name: '南京市',
              children: [
                {
                  id: 3,
                  name: '锡钢地区北侧幼儿园项目',
                  children: [
                    { id: 4, name: '吊篮1', children: [], status: 1 },
                    { id: 5, name: '吊篮2', children: [], status: 0 }
                  ]
                }
              ]
            },
            {
              id: 6,
              name: '无锡市',
              children: [
                {
                  id: 7,
                  name: '无锡市儿童福利院易地新建项目',
                  children: [
                    { id: 8, name: '吊篮3', children: [], status: 1 },
                    { id: 9, name: '吊篮4', children: [], status: 0 }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 10,
          name: '浙江省',
          children: [
            {
              id: 11,
              name: '杭州市',
              children: [
                {
                  id: 12,
                  name: '项目',
                  children: [
                    { id: 13, name: '设备5', children: [], status: 1 },
                    { id: 14, name: '设备6', children: [], status: 0 }
                  ]
                }
              ]
            },
            {
              id: 15,
              name: '湖州市',
              children: [
                {
                  id: 16,
                  name: '项目',
                  children: [
                    { id: 17, name: '设备7', children: [], status: 1 },
                    { id: 18, name: '设备8', children: [], status: 0 }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 30,
          name: '安徽省'
        },
        {
          id: 31,
          name: '山东省',
          children: [
            {
              id: 32,
              name: '青岛市',
              children: [
                {
                  id: 33,
                  name: '项目',
                  children: [
                    { id: 36, name: '设备5', children: [], status: 1 },
                    { id: 37, name: '设备6', children: [], status: 0 }
                  ]
                }
              ]
            },
            {
              id: 34,
              name: '淄博市',
              children: [
                {
                  id: 35,
                  name: '项目',
                  children: [
                    { id: 38, name: '设备7', children: [], status: 1 },
                    { id: 39, name: '设备8', children: [], status: 0 }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 41,
          name: '四川省'
        },
        {
          id: 51,
          name: '河北省'
        },
        {
          id: 61,
          name: '广东省'
        },
        {
          id: 71,
          name: '湖北省'
        },
        {
          id: 81,
          name: '湖南省'
        },
        {
          id: 91,
          name: '甘肃省'
        },
        {
          id: 100,
          name: '山西省'
        }

      ],
      expandedIds: [],
      selectedId: null
    }
  },
  methods: {
    handleToggleExpand(id) {
      this.expandedIds = id
    },
    handleSelectNode(id) {
      this.selectedId = id
    }
  }
}
</script>

<style lang="scss" scoped>
.device_list {
  opacity: 1;
  box-sizing: border-box;
  padding: 5px 5px 0;
  .deviceContent {
    height: 100%;
    opacity: 1;

    /* 自动布局 */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 8px;

    background: rgba(7, 47, 83, 0.48);

    box-sizing: border-box;
    border: 1px solid #162C40;
  }
}

.listStyle {
  width: 100%;
  height: 570px;
  overflow-y: auto;
  overflow-x: hidden;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}

/* 兼容 Vue 3 的样式穿透 */
::v-deep .el-input__inner {
  height: 38px;
  opacity: 1;
  background: rgba(0, 0, 0, 0.11);
  color: #fff;
  box-sizing: border-box;
  border: 1px solid #194560;
  margin-bottom: 8px;
}

::-webkit-scrollbar {
    display: none;
}
</style>
