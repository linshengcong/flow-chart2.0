import { FunctionExt } from '@antv/x6'
import { removeShapeEdge } from './index'
import { addTools } from './addTools'
import { setWidgetToolsHidden } from './lock'

/**
 * 事件注册中心
 * @param {*} graph 画布对象
 * @param {*} instance 根实例
 */
export function registerNodeEvent(graph, instance) {
  /**
   * -----------------------node events-------------------------
   */
  /**
   * 节点单击事件
   * 1. 禁用状态，设置选中的节点的工具消失, 移除工具集
   * 2. 非禁用状态点击节点添加工具集
   */
  graph.on('node:click', ({ node }) => {
    const disableMove = node && node.store && node.store.data && node.store.data.disableMove
    if (disableMove) {
      setWidgetToolsHidden(disableMove)
      node.removeTools()
      return false
    }
    // 清空工具集
    graph.getNodes().forEach(cell => {
      cell.removeTools()
    })
    if (node.shape !== 'lane-node') addTools(node, graph)
    // setAnimate(node.store.data.id, graph)
  })

  /**
   * @desc 节点选中事件
   * 1. 把选中的节点存到组件根实例
   */
  graph.on('node:selected', () => {
    instance.selectedNode.splice(0, instance.selectedNode.length, ...graph.getSelectedCells())
  })
  /**
   * @desc 节点取消选中事件
   * 1. 把选中的节点存到组件根实例
   */
  graph.on('node:unselected', () => {
    instance.selectedNode.splice(0, instance.selectedNode.length, ...graph.getSelectedCells())
  })

  /**
   * 节点新增后事件
   */
  graph.on('node:added', ({ node }) => {

    const nodes = graph.getNodes()
    if (node.shape === 'lane-node') {
      // 泳道置底, 添加吸附效果
      node.toBack()
      laneNodeAdsorption(nodes, node)
    }

  })
  /**
   * 节点删除后事件
   */
  graph.on('node:removed', () => {
    console.log('node:removed')
  })

  /**
   * -----------------------edge events-------------------------
   */
  /**
   * 1. 添加可拖拽箭头工具集
   */
  graph.on('edge:mouseenter', ({ cell }) => {
    cell.addTools([
      {
        name: 'source-arrowhead'
      },
      {
        name: 'target-arrowhead',
        args: {
          attrs: {
            fill: 'red'
          }
        }
      }
    ])
  })
  /**
   * 1. 删除工具集
   */
  graph.on('edge:mouseleave', ({ cell }) => {
    cell?.removeTool('source-arrowhead')
    cell?.removeTool('target-arrowhead')
  })



  /**
   * -----------------------cell events-------------------------
   */
  /**
   * 鼠标移入
   * 1. 显示连接桩
   */
  graph.on('cell:mouseenter', FunctionExt.debounce(({ node }) => {
    const ports = document.getElementById('container').querySelectorAll('.x6-port-body')
    // 锁定状态不显示连接桩
    const disableMove = node && node.store && node.store.data && node.store.data.disableMove
    showPorts(ports, !disableMove)
  }), 500)
  /**
   * 鼠标移出
   * 1. 隐藏连接桩
   */
  graph.on('cell:mouseleave', () => {
    const ports = document.getElementById('container').querySelectorAll('.x6-port-body')
    showPorts(ports, false)
  })


  /**
   * -----------------------blank events-------------------------
   */
  /**
   * 空白处点击事件
   * 1. 清空工具集
   * 2. 移除节点选择效果
   */
  graph.on('blank:click', () => {
    graph.getNodes().forEach(cell => {
      cell.removeTools()
    })
    removeShapeEdge(graph)
  })
}

/**
 * 显示连接桩
 * @param ports
 * @param show
 */
function showPorts(ports, show) {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

/**
 * 泳道吸附效果
 * @param {*} node 新节点
 * @param {*} nodes 所有节点
 */
function laneNodeAdsorption(nodes, node) {
  const lanes = nodes.filter(n => n.shape === 'lane-node' && n.id !== node.id)
  if (!lanes.length) return
  const targetPosition = { left: Infinity, right: -Infinity }
  const yAxis = lanes[0].store.data.position.y
  lanes.forEach(item => {
    const { x } = item.store.data.position
    const { width } = item.store.data.size
    const right = x + width
    if (x < targetPosition.left) targetPosition.left = x
    if (right > targetPosition.right) targetPosition.right = right
  })
  const insertLeft = node.store.data.position.x < (targetPosition.left + targetPosition.right) / 2
  const xAxis = insertLeft ? targetPosition.left - 200 : targetPosition.right
  node.position(xAxis, yAxis)
}
