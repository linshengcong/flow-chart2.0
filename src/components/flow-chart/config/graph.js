export default {
  background: '#dfe4e8',
  // 缩放级别
  scaling: {
    min: 0.1,
    max: 16
  },
  // 监听容器大小改变，并自动更新画布大小
  autoResize: true,
  // 画布拖拽平移
  panning: {
    enabled: true,
    modifiers: ['alt', 'shift'], // 修饰键：按下修饰键并点击鼠标触发
    eventTypes: 'leftMouseDown' // 触发画布平移的交互方式
  },
  // 鼠标滚轮缩放
  mousewheel: {
    enabled: true,
    modifiers: ['ctrl', 'meta'],
    minScale: 0.5,
    maxScale: 2
  },
  // 网格
  grid: {
    visible: true, // 渲染网格背景
    type: 'doubleMesh',
    size: 10, // 网格大小 10px
    args: [
      {
        color: '#eee', // 主网格线颜色
        thickness: 1 // 主网格线宽度
      },
      {
        color: '#ddd', // 次网格线颜色
        thickness: 1, // 次网格线宽度
        factor: 4 // 主次网格线间隔
      }
    ]
  },
  // 连线选项
  connecting: {
    snap: true,
    allowBlank: false, // 禁止连接到画布空白位置
    allowMulti: false, // 起始和终止节点之间可以创建多条边，但必须要要链接在不同的链接桩上
    allowLoop: false, // 禁止创建循环连线
    highlight: true, // 拖动边时，是否高亮显示所有可用的连接桩或节点
    router: 'metro', // 路由样式（连线路径样式）
    // 连接器样式
    // connector: 'jumpover', // 跳线连接器
    InteractionMap: {
      vertexDeletable: true // 边的路径点可以被删除
    },
    validateMagnet({ magnet }) {
      return !['top', 'left'].includes(magnet.getAttribute('port-group'))
    },
    // 在移动边的时候判断连接是否有效，如果返回false，当鼠标放开的时候，不会连接到当前元素
    validateConnection(params) {
      const { sourceView, targetView, sourceMagnet, targetMagnet } = params
      if (sourceView === targetView) {
        return false
      }
      // 只能从输出连接桩创建连接
      if (!sourceMagnet || ['top', 'left'].includes(sourceMagnet.getAttribute('port-group'))) {
        return false
      }
      // 只能连接到输入连接桩
      if (!targetMagnet || !['top', 'left'].includes(targetMagnet.getAttribute('port-group'))) {
        return false
      }
      return true
    }
  },
  // 高亮选项
  highlighting: {
    // 当链接桩可以被链接时，在链接桩外围渲染一个矩形框
    magnetAvailable: {
      name: 'stroke',
      args: {
        padding: 4,
        attrs: {
          strokeWidth: 8,
          stroke: 'rgba(30,134,255,1)'
        }
      }
    },
    // 连线过程中，自动吸附到链接桩时被使用
    magnetAdsorbed: {
      name: 'stroke',
      args: {
        padding: 4,
        attrs: {
          strokeWidth: 8,
          stroke: '#1E86FF'
        }
      }
    }
  },
  // 只渲染可视区域内容
  virtual: true,

  // 限制节点移动  disableMove设置节点的不能拖动 disableDefaultMove默认的不能拖动（开始、结束）
  interacting: (view) => {
    const cell = view && view.cell
    const disableMove = cell && (cell.store.data.disableMove || cell.store.data.disableDefaultMove)
    if (cell && disableMove) {
      return { nodeMovable: false }
    }
    return true
  }
}
