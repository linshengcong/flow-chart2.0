import { registerNodeEvent } from './shape'
import { registerKeyboardEvent } from './keyboard'

/**
 * 注册事件
 * @param {*} graph 画布对象
 */
export function registerEvent(graph, businessConfig, instance) {
  if (!graph) {
    console.error('画布对象为空，事件注册失败！')
    return
  }
  registerNodeEvent(graph, instance)
  registerKeyboardEvent(graph, businessConfig)
}

/**
 * description: 全屏功能
 * @param {Element} element 全屏元素
 * @param {Vue} that vue的this对象
 * @return {void}
 */
export function handleFullScreen(element, that) {
  // 判断是否已经是全屏
  // 如果是全屏，退出
  console.log(that.fullscreen)
  if (that.fullscreen) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    }
    console.log('已还原!')
  } else { // 否则，进入全屏
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen()
    }
    console.log('已全屏！')
  }
  // 改变当前全屏状态
  that.fullscreen = !that.fullscreen
  element.style.backgroundColor = '#fff'
}

/**
 * description: 创建边 连线
 * @param {Node} source 当前节点
 * @param {Node} target 目标节点
 * @param {Graph} graph 画布对象
 * @param {String} direction 当前节点连线方向
 * @return {Edge} 返回一条边
 */
export const createEdge = (source, target, graph, direction) => {
  const port1 = source.port.ports.find(res => res.group === direction).id
  const directionList = {
    'left': 'right',
    'top': 'bottom',
    'right': 'left',
    'bottom': 'top'
  }
  const port2 = target.port.ports.find(res => res.group === directionList[direction]).id
  return graph.createEdge({
    shape: 'edge',
    attrs: {
      line: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 8
        }
      }
    },
    router: {
      name: 'metro'
    },
    source: {
      cell: source.id,
      port: port1
    },
    target: {
      cell: target.id,
      port: port2
    }
  })
}

// 初始化节点自定义数据模型
let dataModel = { nodeName: '新节点' }
export const initDataModel = (object) => {
  if (!object || Object.prototype.toString.call(object) !== '[object Object]') return false
  const obj = { ...object, ...{ nodeName: '新节点' } }
  dataModel = JSON.parse(JSON.stringify(obj))
}
/**
 * description: 创建节点
 * @param {Number} type 节点类型
 * @param {!Graph} graph 画布对象
 * @param {?Node} activeNode 当前节点
 * @param {?String} direction 方向
 * @param {Number=} width 距离当前节点距离
 * @return {Node} node 返回一个节点
 */
export const createNode = (type, graph, activeNode, direction, width = 100, size = {
  'width': 160,
  'height': 92
}) => {
  let position = {}
  // 设置节点位置
  if (activeNode && direction) {
    size = activeNode.size()
    position = activeNode.position()
    if (direction === 'right') position.x = position.x + size.width + width
    else if (direction === 'left') position.x = position.x - size.width - width
    else if (direction === 'bottom') position.y = position.y + size.height + width
    else if (direction === 'top') position.y = position.y - size.height - width
  }
  const id = randomNumber()
  let node = ''
  switch (type) {
    case 1:
      node = graph.createNode({
        shape: 'custom-node',
        data: { ...dataModel },
        position,
        size
      })
      break
    case 3:
      node = graph.createNode({
        id,
        shape: 'lane-node',
        data: { nodeName: '泳道' },
        position
      })
      break

  }
  return node
}

/**
 * description: 移除节点选择效果
 * @param {*} graph 画布对象
 * @return {void}
 */
export const removeShapeEdge = (graph) => {
  graph.getEdges().forEach(item => {
    clearTimeout(item.timer)
    item.attr('round', { r: 0, atConnectionRatio: 0 })
  })
}
/**
 * description: 选择节点效果
 * @param {*} id
 * @param {*} graph 画布对象
 * @return {void}
 */
export const setAnimate = (id, graph) => {
  removeShapeEdge(graph)
  graph.getEdges().filter(item => item.source.cell === id).forEach(item => {
    item.attr('round', { r: 0 })
    const funAttr = () => {
      item.attr('round', { r: 3, atConnectionRatio: 0 })
      const options = { delay: 0, duration: 2000 }
      item.transition('attrs/round/atConnectionRatio', 1, options)
    }
    funAttr()
    item.timer = setInterval(() => {
      funAttr()
    }, 2000)
  })

}

function randomNumber() {
  return new Date().getTime() + Math.random().toString().substring(2, 8)
}
