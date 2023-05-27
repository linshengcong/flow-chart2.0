import { exportChart, exportPDF } from '@/components/flow-chart/event/export.js'
import { onPaste, selectAll, deleteCells } from '@/components/flow-chart/common/trigger.js'
import { handleRectMatch } from '@/components/flow-chart/event/widthAndHeightMatch.js'
import { handleLock } from '@/components/flow-chart/event/lock.js'

export const contextMenuMixin = {
  provide() {
    return {
      handleMenuClick: this.contextMenuFn
    }
  },
  data() {
    return {
      contextMenuItem: {
        x: 0,
        y: 0,
        content: {}
      },
      contextMenuVisible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.graph.on('edge:contextmenu', ({ e, edge }) => {
        this.contextMenuItem = {
          x: e.clientX,
          y: e.clientY,
          content: { type: 'edge', item: edge }
        }
        this.contextMenuVisible = true
      })

      this.graph.on('node:contextmenu', ({ e, node }) => {
        this.contextMenuItem = {
          x: e.clientX,
          y: e.clientY,
          content: { type: 'node', item: node }
        }
        this.contextMenuVisible = true
      })

      this.graph.bindKey('esc', () => {
        this.contextMenuVisible = false
      })
    })
  },
  methods: {
    /**
     * 右键菜单点击回调
     * @param {*} type 功能类型
     * @param {*} args 回调参数, 自行定义
     */
    contextMenuFn(type, args) {
      const contextMenuState = {
        'remove': () => {
          const targetNode = args.item
          deleteCells(this.graph, targetNode)
        },
        'copy': () => {
          const targetNode = args.item
          onPaste(this.graph, targetNode)
        },
        'selectAll': () => {
          selectAll(this.graph)
        },
        'lock': () => {
          const targetNode = args.item
          handleLock(this.graph, 'lock', targetNode)
        },
        'unlock': () => {
          const targetNode = args.item
          handleLock(this.graph, 'unlock', targetNode)
        },
        'match': () => {
          const matchType = args.type
          handleRectMatch(this.graph, matchType)
        },
        'export': () => {
          const exportType = args.label
          if (exportType === 'PDF') exportPDF(this.graph)
          else exportChart(this.graph, exportType)
        }
      }
      contextMenuState[type]()
      this.contextMenuVisible = false
    }
  }
}
