import { DagreLayout, GridLayout } from '@antv/layout'

/**
 * 横向层次布局
 * @param model 数据
 * @param options 布局额外配置
 * @returns {Model} 排版后数据
 */
export function horizontalLayout(model, options = {}) {
  // 加工数据
  const newModel = {
    nodes: [],
    edges: []
  }
  model.cells.forEach(cell => {
    if (cell.shape === 'edge') {
      delete cell.router
      newModel.edges.push(cell)
    } else {
      newModel.nodes.push(cell)
    }
  })
  // 使用布局插件重新排版
  const dagreLayout = new DagreLayout({
    type: 'dagre',
    begin: [0, 0],
    rankdir: 'LR',
    nodesep: 8,
    ranksep: 32,
    controlPoints: true,
    ...options
  })
  return dagreLayout.layout(newModel)
}

/**
 * 纵向层次布局
 * @param model 数据
 * @param options 布局额外配置
 * @returns {Model} 排版后数据
 */
export function verticalLayout(model, options = {}) {
  // 加工数据
  const newModel = {
    nodes: [],
    edges: []
  }
  model.cells.forEach(cell => {
    if (cell.shape === 'edge') {
      delete cell.router
      newModel.edges.push(cell)
    } else {
      newModel.nodes.push(cell)
    }
  })
  // 使用布局插件重新排版
  const dagreLayout = new DagreLayout({
    rankdir: 'TB', // 竖直方向
    nodesep: 32,
    ranksep: 16,
    ...options
  })
  return dagreLayout.layout(newModel)
}

/**
 * 网格布局
 * @param model 数据
 * @param options 布局额外配置
 * @returns {Model} 排版后数据
 */
export function gridLayout(model, options = {}) {
  // 加工数据
  const newModel = {
    nodes: [],
    edges: []
  }
  model.cells.forEach(cell => {
    if (cell.shape === 'edge') {
      delete cell.router
      newModel.edges.push(cell)
    } else {
      newModel.nodes.push(cell)
    }
  })
  const gridLayout = new GridLayout({
    type: 'grid',
    ...options
  })
  return gridLayout.layout(newModel)
}
