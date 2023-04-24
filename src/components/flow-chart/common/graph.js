import { Graph } from '@antv/x6'
import Options from '../config/graph'
import { registerNode } from './shape'
import { registerEvent } from '../event'
import { registerPlugin } from './plugin'

/**
 * 创建流程图画布容器
 * @param element 画布容器
 * @returns {Graph} 画布对象
 */
export function createGraph(element, businessConfig = {}) {
  // 实例化画布对象
  const graph = new Graph({
    container: element, // 画布的dom容器
    ...Options
  })
  registerNode(businessConfig)
  registerPlugin(graph, businessConfig)
  registerEvent(graph, businessConfig)

  return graph
}
