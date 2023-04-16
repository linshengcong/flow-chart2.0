import { Shape } from '@antv/x6'
import { register } from '@antv/x6-vue-shape'
import defaultNode from '../node'
import { Rect, Edge } from '../config/shape'
import Ports from '../config/port'

// 修改图形默认配置
Shape.Rect.config(Rect)
Shape.Edge.config(Edge)

/**
 * 注册自定义节点
 */
export function registerNode({ nodeConfig }) {
  let Node = null
  try {
    Node = require('../business/node.vue').default
    // Node = require.context('../business/node', true, /.vue$/)
    // console.log(Node)
  } catch (error) {
    Node = defaultNode
  }
  // console.log('Node', Node)
  register({
    shape: 'custom-node',
    width: nodeConfig.width,
    height: nodeConfig.height,
    component: Node,
    attrs: {},
    ports: Ports
  })
  // TODO
  Node = require('../business/general-node.vue').default
  register({
    shape: 'general-node',
    width: 80,
    height: 48,
    component: Node,
    attrs: {},
    ports: Ports
  })
}
