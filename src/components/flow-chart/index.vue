<template>
  <div id="graph-container" :class="['graph-container', move && 'moving']" @click.stop="contextMenuVisible = false">
    <!-- 工具栏 -->
    <tool-bar
      v-if="showToolBar"
      :class="['tool-bar',{active:show}]"
      :selected-node-number="selectedNode.length" />
    <!-- 右侧节点、画布面板 -->
    <div v-if="showFlowModal" class="flow-modal" :class="{active:show}">
      <div v-show="show" class="flow-modal-content">
        <!-- 作用域插槽 #modal="{graph}" -->
        <slot name="modal" :graph="graph"></slot>
      </div>
      <span class="flow-modal-button" @click="show=!show">
        <i :class="show?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
      </span>
    </div>
    <!--画布容器，必须设置宽高，用于自动计算画布尺寸-->
    <div class="flow-chart-container">
      <!--流程图画布-->
      <div id="container" class="flow-chart"></div>
    </div>
    <!-- 迷你地图 -->
    <div
      v-if="showMiniMap"
      id="minimap"
      :class="['mini-map', {'expand': isDisplayMiniMap, 'fold': !isDisplayMiniMap}]"></div>
    <div @click="isDisplayMiniMap = !isDisplayMiniMap">
      <svg-icon
        v-if="showMiniMap"
        :class="['mini-map-icon', {'show_map': !isDisplayMiniMap, 'close_map': isDisplayMiniMap}]"
        :icon-class="isDisplayMiniMap ? 'close_map': 'show_map'" />
    </div>
    <!-- 右键菜单 -->
    <context-menu
      v-if="contextMenuVisible && useContextMenu"
      ref="contextMenuRef"
      :context-menu-item="contextMenuItem" />
  </div>
</template>

<script>
import { createGraph } from './common/graph'
import { initDataModel } from './event'
import contextMenu from './components/context-menu/index.vue'
import { contextMenuMixin } from '@/mixins/flowChart/contextMenu'
import ToolBar from './tool-bar'
import Data from './test-data'

export default {
  name: 'FlowChart',
  components: {
    ToolBar,
    contextMenu
  },
  mixins: [contextMenuMixin],
  provide() {
    return {
      getGraph: () => this.graph
    }
  },
  props: {
    // 节点自定义数据模型
    dataModel: {
      type: Object,
      default: () => {
        return { nodeName: '新节点' }
      }
    },
    // 业务数据
    businessData: {
      type: Object,
      default: () => { }
    },
    businessConfig: {
      type: Object,
      default: () => {
        return {
          nodeConfig: {}
        }
      }
    },
    // 显示工具栏
    showToolBar: {
      type: Boolean,
      default: () => true
    },
    // 显示右侧节点、画布面板
    showFlowModal: {
      type: Boolean,
      default: () => true
    },
    // 显示小地图
    showMiniMap: {
      type: Boolean,
      default: () => true
    },
    // 加载右键菜单
    useContextMenu: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      graph: null, // 画布对象
      show: false, // 展开收起
      move: false, // 移动状态
      isDisplayMiniMap: false, // 小地图显示状态
      selectedNode: [] // 当前画布选中的节点集合
    }
  },
  mounted() {
    initDataModel(this.dataModel)
    const el = document.getElementById('container')
    this.graph = createGraph(el, this.businessConfig, this)
    this.$emit('initGraph', this.graph)
    this.graph.centerContent() // 将画布中元素居中展示
    this.keypressEvent(el)

    if (process.env.NODE_ENV === 'development') {
      this.addTestData()
      window.graph = this.graph
    }
    this.graph.on('node:dblclick', ({ node, e }) => {
      node.addTools({
        name: 'node-editor',
        args: {
          event: e
        }
      })
    })
  },
  methods: {
    /**
     * 监听画布键盘事件
     * @param el
     */
    keypressEvent(el) {
      // 键盘按下
      el.addEventListener('keydown', event => {
        if (['Alt', 'Shift'].includes(event.key)) this.move = true
      })
      // 键盘松开
      el.addEventListener('keyup', () => this.move = false)
    },
    addTestData() {
      // 导入数据
      const graphJSON = JSON.parse(localStorage.getItem('graphJSON'))
      this.graph.fromJSON(graphJSON || Data)
    }
  }
}
</script>

<style lang="scss">
.x6-widget-selection-box {
  border: none;
  box-shadow: none;
}
.x6-widget-transform {
  border: 1px dashed #1e86ff;
}
</style>

<style lang="scss" scoped>
$width:360px;

.graph-container {
  position: relative;
  width: 100%;
  height: 100%;

  .tool-bar {
    width: 100%;
  }

  .flow-chart-container {
    width: 100%;
    height: calc(100% - 48px);

    .flow-chart {
      box-shadow: inset 0 0 20px 4px #EEEEEE;
      cursor: auto;

      ::v-deep {
        // 连接桩样式
        circle[data-class="choice-point"]:hover {
          transition: all 0.05s;
          r: 12;
        }
        // 连线交互样式
        .x6-edge:hover path:nth-child(2) {
          stroke: #1E86FF;
          stroke-width: 2px;
        }
        .x6-edge-selected path:nth-child(2) {
          stroke: #1E86FF;
          stroke-width: 2.5px !important;
        }
      }
    }
  }

  &.moving {
    .flow-chart {
      cursor: grab;
    }
  }

  .mini-map {
    position: absolute;
    left: 16px;
    bottom: 16px;
    background-color: transparent;
    cursor: move;

    ::v-deep {
      .x6-widget-minimap {
        border-radius: 4px;
        background-color: rgba(67, 75, 91, 0.4);
      }

      .x6-widget-minimap-viewport {
        border: 2px solid #FEC036;
      }

      .x6-widget-minimap-viewport-zoom {
        border: 2px solid #FEC036;
      }
    }

    &.expand {
      ::v-deep {
        .x6-widget-minimap {
          width: 160px !important;
          padding: 48px !important;
          border-radius: 4px;
          background-color: rgba(67, 75, 91, 0.4);
          transition: all 0.6s ease-in-out;

          & > .x6-graph {
            width: 37px !important;
            transition: all 0.6s ease-in-out;
          }
        }
      }
    }

    &.fold {
      ::v-deep {
        .x6-widget-minimap {
          width: 0 !important;
          padding: 0 !important;
          border-radius: 4px;
          background-color: rgba(67, 75, 91, 0.4);
          transition: all 0.3s ease-in-out;

          & > .x6-graph {
            width: 0 !important;
            transition: all 0.3s ease-in-out;
          }
        }
      }
    }
  }

  .mini-map-icon {
    box-sizing: content-box;
    cursor: pointer;
    position: absolute;
    left: 184px;
    bottom: 16px;
    font-size: 16px;
    width: 20px;
    height: 20px;
    padding: 8px;
    background: #FFFFFF;
    border: 1px solid #EEF0F2;
    border-radius: 8px;
  }

  .show_map {
    left: 16px;
    transition: all 0.6s ease-in-out;
  }
  .close_map {
    left: 184px;
    transition: all 0.3s ease-in-out;
  }

  .flow-modal {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
    width: 0;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 1px 0 0 0 #EEF0F2 inset;
    transition: all 0.5s;
    &.active {
      width: $width;
    }
    .flow-modal-content {
      width: 100%;
      height: 100%;
    }
    .flow-modal-button {
      position: absolute;
      top: 50%;
      left: -18px;
      width: 18px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      transform: translateY(-50%);
      background: #FFFFFF;
      border: 1px solid #EEF0F2;
      border-radius: 12px 0 0 12px;
      cursor: pointer;
      i {
        font-size: 18px;
        color: #A3AFBB;
      }
      &:hover {
        background-color: #E9F3FF;
        i {
          color: #1E86FF;
        }
      }
    }
  }
}
</style>
