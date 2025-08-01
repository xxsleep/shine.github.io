<template>
  <li
    class="li_style"
  >
    <div
      :style="{
        paddingLeft:level === 1 ? '0' : (level - 1) * 20 + 'px',
        paddingRight:'10px',
        height: '45px',
        display: 'flex',
        justifyContent: 'space-between',
        lineHeight: '45px',
        cursor: node.children && node.children.length > 0 ? 'pointer' : 'default',
        borderBottom: '1px solid #479EDE', // 添加下边框样式
        backgroundColor: selectedId == node.id ? '#479EDE' : shouldHaveGreenBg ? 'rgba(20,127,221,0.4)' :'transparent', // 添加背景颜色样式
        cursor: 'pointer'
      }"
      @click="handleClick"
    >
      <!-- 只有当节点有子节点时才显示箭头 -->
      <div style="display: flex;">
        <div v-if="node.children && node.children.length > 0 " :style="{ fontSize: isExpanded ? '12px' : '8px', verticalAlign: 'top',color:isExpanded?'#fff':'#40A0EB',width: '33px',textAlign: 'center' }">
          {{ isExpanded ? '▼' : '▶' }}
        </div>
        <div v-else style="width: 33px;" />
        <div>
          {{ node.name }}
        </div>
      </div>
      <!-- 最后一级节点显示状态实心圆 -->
      <div v-if="(!node.children || node.children.length === 0) && level === maxLevel" :style="{ color: node.status === 1 ? 'rgba(0, 252, 84, 1)' : 'rgba(255, 255, 255, 0.6)', marginLeft: '5px' }">
        ●
      </div>
    </div>
    <ul v-if="isExpanded && node.children && node.children.length > 0">
      <!-- 使用 child.id 作为 key -->
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        :expanded-ids="expandedIds"
        :selected-id="selectedId"
        :max-level="maxLevel"
        @toggle-expand="handleChildToggleExpand"
        @select-node="handleSelectNode"
      />
    </ul>
  </li>
</template>

<script>

export default {
  // 添加 name 选项
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    expandedIds: {
      type: Array,
      default: () => []
    },
    selectedId: {
      type: Number,
      default: null
    },
    maxLevel: {
      type: Number,
      default: 4
    }
  },
  computed: {
    isExpanded() {
      return this.expandedIds.includes(this.node.id)
    },
    shouldHaveGreenBg() {
      if (this.level === 1) {
        return this.isExpanded
      }
      // 查找当前节点的 level 为 1 的祖先节点
      let parentNode = this.$parent
      while (parentNode && parentNode.$options.name === 'TreeNode') {
        if (parentNode.level === 1) {
          return parentNode.isExpanded
        }
        parentNode = parentNode.$parent
      }
      return false
    }
  },
  methods: {
    handleClick() {
      if ((!this.node.children || this.node.children.length === 0) && this.level === this.maxLevel) {
        this.$emit('select-node', this.node.id)
        console.log(this.selectedId, this.node.id)
      } else {
        this.toggleExpand()
      }
    },
    toggleExpand() {
      console.log(this.level)
      let newExpandedIds = [...this.expandedIds]
      if (this.level === 1) {
        // 当 level 为 1 时，先关闭其他所有 level 为 1 的节点
        if (this.isExpanded) {
          newExpandedIds = newExpandedIds.filter(id => id !== this.node.id)
        } else {
          newExpandedIds = newExpandedIds.filter(id => {
            // 这里需要确保只有 level 为 1 的节点被关闭
            // 假设父组件能正确传递 level 信息，这里简单处理
            return false
          })
          newExpandedIds.push(this.node.id)
        }
      } else {
        if (this.isExpanded) {
          newExpandedIds = newExpandedIds.filter(id => id !== this.node.id)
        } else {
          newExpandedIds.push(this.node.id)
        }
      }
      this.$emit('toggle-expand', newExpandedIds)
    },
    handleChildToggleExpand(newExpandedIds) {
      this.$emit('toggle-expand', newExpandedIds)
    },
    handleSelectNode(id) {
      this.$emit('select-node', id)
    }
  }
}
</script>

<style scoped>
ul,
li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
