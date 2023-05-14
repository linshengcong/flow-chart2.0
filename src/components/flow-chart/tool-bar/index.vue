<template>
  <div>
    <!-- 头部导航栏 -->
    <div class="toolbar-container" draggable>
      <div class="toolbar-container-left">
        <span
          class="icon"
          :data-type="1"
          title="节点"
          @mousedown.stop="startDrag">
          <svg-icon icon-class="bar-1" />
        </span>

        <span class="devider"></span>

        <span
          v-for="(icon, key) in tools.Tools1"
          :key="key"
          class="icon"
          :title="icon.title"
          @click="handleTrigger(icon.svg)">
          <svg-icon
            :class="icon.disabled ? 'disabled' : 'enabled'"
            :icon-class="icon.svg" />
        </span>

        <span class="devider"></span>

        <el-popover
          width="252"
          placement="bottom-start"
          trigger="hover">
          <span slot="reference">
            <svg-icon icon-class="bar-11" style="width: 20px; height: 20px;" title="快捷键" />
          </span>
          <div class="tips-container">
            <div class="tips-container-title">
              快捷键
            </div>
            <div v-for="(item,key) of tipsContent" :key="key" class="tips-container-item">
              <div class="tips-container-item-left">
                {{ item.label }}
              </div>
              <div class="tips-container-item-right">
                <div class="right-1">
                  {{ item.value1 }}
                </div>
                <div v-if="item.value2" class="right-2">
                  +
                </div>
                <div v-if="item.value2" class="right-1">
                  {{ item.value2 }}
                </div>
              </div>
            </div>
          </div>
        </el-popover>

        <el-popover
          placement="bottom-start"
          trigger="hover">
          <span slot="reference" class="icon">
            <svg-icon icon-class="layout_horizontal" style="width: 20px; height: 20px;" title="层次布局" />
          </span>
          <div class="layout-container">
            <div class="item" @click="horizontalLayout">
              <svg-icon icon-class="layout_horizontal" />
              <span class="label">横向层次布局</span>
            </div>
            <div class="item" @click="verticalLayout">
              <svg-icon icon-class="layout_vertical" />
              <span class="label">纵向层次布局</span>
            </div>
          </div>
        </el-popover>
      </div>

      <div class="toolbar-container-content">
        <span
          v-for="(icon, key) in tools.Tools2"
          :key="key"
          class="icon"
          :title="icon.title"
          @click="handleTrigger(icon.svg)">
          <svg-icon
            :class="selectedNodeNumber <= 1 ? 'disabled' : 'enabled'"
            :icon-class="icon.svg" />
        </span>

        <span class="devider"></span>

        <span
          v-for="(icon, key) in tools.Tools3"
          :key="key"
          class="icon"
          :title="icon.title"
          @click="handleTrigger(icon.action)">
          <svg-icon
            :class="selectedNodeNumber <= 1 ? 'disabled' : 'enabled'"
            :icon-class="icon.svg" />
        </span>

        <span class="devider"></span>

        <span
          v-for="(icon, key) in tools.Tools4"
          :key="key"
          class="icon"
          :title="icon.title"
          @click="handleTrigger(icon.action)">
          <svg-icon
            :class="selectedNodeNumber <= 2 ? 'disabled' : 'enabled'"
            :icon-class="icon.svg" />
        </span>

        <span class="devider"></span>

        <el-popover
          width="160"
          :disabled="!selectedNodeNumber"
          placement="bottom-start"
          trigger="hover">
          <span slot="reference" title="图层">
            <svg-icon
              style="width: 20px; height: 20px;"
              :class="!selectedNodeNumber ? 'disabled' : 'enabled'"
              :icon-class="tools.Tools5['bar-10'].svg" />
          </span>
          <div class="tips-container">
            <div
              v-for="(item,key) of levelList"
              :key="key"
              class="tips-container-item"
              style="cursor: pointer;"
              @click="setLevel(item.value)">
              {{ item.label }}
            </div>
          </div>
        </el-popover>
      </div>

      <div class="toolbar-container-right">
        <el-autocomplete
          ref="myAutocomplete"
          v-model="keyword"
          :style="{width:'200px'}"
          :fetch-suggestions="querySearch"
          prefix-icon="el-icon-search"
          placeholder="搜索"
          @select="handleSelect">
          <template slot-scope="{ item }">
            <div class="name">
              {{ item.data.nodeName }}
            </div>
          </template>
        </el-autocomplete>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <div v-drag class="footer-container" @click="handleTrigger('focus')">
      <div class="icon-button" title="居中">
        <svg-icon icon-class="focus" />
      </div>
      <view-button />
      <div class="icon-button" :title="!fullscreen ?'全屏':'退出全屏'" @click="handleTrigger('flex-1')">
        <svg-icon :icon-class="!fullscreen ?'flex-1':'flex-2'" />
      </div>
    </div>
  </div>
</template>

<script>
import { historyChange } from '../common/trigger'
import { Tools, TipsContent, levelList } from '../config/config'
import { handleFullScreen, createNode } from '../event'
import { handleNodeSpacing } from '../event/handleNodeSpacing'
import { registerDnd } from '../common/dnd'
import { setLevel } from '../event/level'
import { handleAlign } from '../event/align'
import { handleVerticalAlign } from '../event/verticalAlign'
import searchNode from '../event/search'
import ViewButton from './view.vue'
import { Message } from 'element-ui'
import { horizontalLayout, verticalLayout } from '../event/layout'

export default {
  components: {
    ViewButton
  },
  inject: ['getGraph'],
  props: {
    selectedNodeNumber: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fullscreen: false, // 全屏
      keyword: '', // 搜索关键字
      searchNode: '', // 搜索节点类
      tools: Tools, // 配置项
      levelList, // 图层
      // 引导文案
      tipsContent: TipsContent,
      dnd: '' // 拖拽交互往画布中添加节点
    }
  },
  mounted() {
    // 监听是否可操作撤销重做
    setTimeout(() => {
      const graph = this.getGraph()
      historyChange(graph, () => {
        this.tools.Tools1.undo.disabled = graph.canUndo()
        this.tools.Tools1.redo.disabled = graph.canRedo()
      })

      this.searchNode = new searchNode(this.getGraph())
      // 拖拽交互往画布中添加节点
      this.dnd = registerDnd(graph, document.querySelector('.toolbar-container'))
    }, 1000)
  },
  methods: {
    // 设置节点图层
    setLevel(value) {
      setLevel(this.getGraph(), value)
    },
    /**
     * 横向布局
     */
    horizontalLayout() {
      const graph = this.getGraph()
      const newModel = horizontalLayout(graph.toJSON())
      graph.fromJSON(newModel)
      graph.centerContent()
    },
    /**
     * 纵向布局
     */
    verticalLayout() {
      const graph = this.getGraph()
      const newModel = verticalLayout(graph.toJSON())
      graph.fromJSON(newModel)
      graph.centerContent()
    },
    handleTrigger(name) {
      const graph = this.getGraph()
      const cls = graph.getSelectedCells()
      switch (name) {
        // 撤销/重做
        case 'undo':
        case 'redo':
          if (this.tools.Tools1[name].disabled) graph[name]()
          break
        // 居中
        case 'focus':
          // 多选之后在居中会产生框选偏移bug  x6-plugin-transform插件本身bug  先清空在返回指定的节点
          graph.cleanSelection() // 清空所有
          graph.centerContent()
          graph.resetSelection(cls) // 返回之前选中指定的节点
          break
        // 全屏
        case 'flex-1':
          handleFullScreen(document.getElementById('graph-container'), this)
          break
        case 'horizontalEqualSpacing':
          handleNodeSpacing(graph, 'horizontal')
          break
        case 'verticalEqualSpacing':
          handleNodeSpacing(graph, 'vertical')
          break
        // 对齐
        case 'bar-2':
        case 'bar-3':
        case 'bar-4':
          handleAlign(graph, name)
          break
        case 'alignTopEdge':
          handleVerticalAlign(graph, name)
          break
        case 'verticalCenter':
          handleVerticalAlign(graph, name)
          break
        case 'alignBottomEdge':
          handleVerticalAlign(graph, name)
          break
        default:
          break
      }
    },
    // 添加节点
    startDrag(e) {
      const graph = this.getGraph()
      const target = e.currentTarget
      const type = Number(target.getAttribute('data-type') || 1)
      const node = createNode(type, graph)
      if (node) {
        this.dnd.start(node, e)
      } else {
        Message.error('添加失败')
      }
    },
    // 搜索节点点击
    handleSelect(item) {
      this.keyword = item.data.nodeName
      this.searchNode.positionNode(item.data.nodeName)
    },
    // 查询节点列表
    querySearch(queryString, cb) {
      this.searchNode.querySearch(queryString, cb)
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar-container {
  padding: 0 24px 0 32px;
  width: 100%;
  height: 48px;
  background: #FFFFFF;
  box-shadow: 0 -1px 0 0 #EEF0F2 inset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #EEF0F2;
  .devider {
    margin: 0 8px;
    width: 1px;
    height: 16px;
    background: #DFE4E8;
  }
  &-left {
    display: flex;
    align-items: center;
    margin-left: -8px;
  }
  &-content {
    display: flex;
    align-items: center;
  }
  &-right::v-deep {
    .el-autocomplete {
      .el-input input {
        background: #F8F9FA;
      }
    }
  }
  .icon {
    margin: 0 8px;
    cursor: pointer;
    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }
  .enabled {
    cursor: pointer;
    transition: all 0.2s;
    opacity: 1;
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  .disabled {
    cursor: not-allowed;
    transition: none;
    opacity: 0.5;
  }
}
.footer-container {
  position: fixed;
  right: 12px;
  bottom: 16px;
  z-index: 999;
  display: flex;
  .icon-button {
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    border: 1px solid #EEF0F2;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    cursor: pointer;
    .svg-icon {
      width: 20px;
      height: 20px;
    }
  }
  ::v-deep .input-number {
    border: none;
    .el-input-number__decrease,
    .el-input-number__increase {
      border-color: #EEF0F2;
    }
    .el-input-number__decrease {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    .el-input-number__increase {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .el-input {
      .el-input__inner {
        border-color: #EEF0F2;
        border-radius: 8px;
      }
    }
  }
}
</style>
<style lang="scss">
.tips-container {
  padding: 8px;
  &-title {
    font-family: PingFang SC, PingFang SC-Semibold, sans-serif;
    font-weight: bold;
    color: #434B5B;
  }
  &-item {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EEF0F2;
    &-left {
      font-size: 12px;
      color: #434B5B;
    }
    &-right {
      font-size: 12px;
      color: #747E8C;
      display: flex;
      align-items: center;
      .right-1 {
        padding: 2px 8px;
        background: #EEF0F2;
        border-radius: 4px;
      }
      .right-2 {
        padding: 0 4px;
      }
    }
  }
}
.layout-container {
  padding: 8px;
  .item {
    cursor: pointer;
    .svg-icon {
      width: 20px;
      height: 20px;
    }
    .label {
      padding-left: 8px;
    }
  }
  .item + .item {
    margin-top: 16px;
  }
}
</style>
