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
export function registerNode(businessConfig) {
  let node = null
  const nodeConfig = businessConfig.nodeConfig || {}
  try {
    node = require(`@/components/flow-chart/business/custom-node/${nodeConfig.customNodeName}.vue`).default
  } catch (error) {
    node = defaultNode
  }

  register({
    shape: 'custom-node',
    width: nodeConfig.width || 100,
    height: nodeConfig.height || 50,
    component: node,
    attrs: {},
    ports: Ports
  })

  node = require('@/components/flow-chart/business/custom-node/general-node.vue').default
  register({
    shape: 'general-node',
    width: 80,
    height: 48,
    component: node,
    attrs: {},
    ports: Ports
  })
}