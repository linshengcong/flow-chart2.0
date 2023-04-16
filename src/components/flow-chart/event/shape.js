import { FunctionExt } from '@antv/x6'
import { setAnimate, removeShapeEdge } from './index'
import { addTools } from './addTools'
import { setWidgetToolsHidden } from './lock'
/**
 * 注册节点事件
 * param {*} graph 画布对象
 */
export function registerNodeEvent(graph) {
  // 节点单击事件
  graph.on('node:click', ({ node }) => {
    // console.log('node-click: ', node)
    const disableMove = node && node.store && node.store.data && node.store.data.disableMove
    if (disableMove) {
      setWidgetToolsHidden(disableMove)
      node.removeTools()
      return false
    }
    setAnimate(node.store.data.id, graph)
  })

  // 节点鼠标进入
  graph.on('node:mousedown', ({ node }) => {
    graph.getNodes().forEach(cell => {
      cell.removeTools()
    })
    // 锁定状态不添加工具框
    const disableMove = node && node.store && node.store.data && node.store.data.disableMove
    if (!disableMove) {
      addTools(node, graph)
    }
  })

  // 画布空白区域
  graph.on('blank:click', () => {
    graph.getNodes().forEach(cell => {
      cell.removeTools()
    })
    removeShapeEdge(graph)
  })

  // 鼠标移入 显示连接桩
  graph.on('cell:mouseenter', FunctionExt.debounce(({ node }) => {
    const ports = document.getElementById('container').querySelectorAll('.x6-port-body')
    // 锁定状态不显示连接桩
    const disableMove = node && node.store && node.store.data && node.store.data.disableMove
    showPorts(ports, !disableMove)
  }), 500)
  // 鼠标移出 隐藏连接桩
  graph.on('cell:mouseleave', () => {
    const ports = document.getElementById('container').querySelectorAll('.x6-port-body')
    showPorts(ports, false)
  })

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

  graph.on('edge:mouseleave', ({ cell }) => {
    cell.removeTools()
  })
}

function showPorts(ports, show) {
  for (let i = 0, len = ports.length; i < len; i = i + 1) {
    ports[i].style.visibility = show ? 'visible' : 'hidden'
  }
}

