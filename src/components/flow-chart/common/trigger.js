const State = {
  offset: 30,
  useLocalStorage: true
}

// copy + paste
export function onPaste(graph, targetNode) {
  const cells = graph.getSelectedCells()
  const targetIndex = cells.findIndex(node => node.id === targetNode.id)
  if (targetIndex < 0) graph.copy([targetNode], State)
  else if (cells && cells.length) graph.copy(cells, State)
  if (!graph.isClipboardEmpty()) {
    const cells = graph.paste(State)
    graph.cleanSelection()
    graph.select(cells)
  }
}

// 全选
export function selectAll(graph) {
  const cells = graph.getCells()
  if (cells.length) {
    graph.select(cells)
  }
}

export function deleteCells(graph, targetNode) {
  const cells = graph.getSelectedCells()
  if (!cells.length) return
  const targetIndex = cells.findIndex(node => node.id === targetNode.id)
  if (targetIndex < 0) return graph.removeNode(targetNode)
  // 删除前移除所有包含工具
  cells.forEach(cell => cell.removeTools())
  graph.removeCells(cells)
}

// 画布缩放
// absolute 为 true 时，表示将画布缩放到 factor 代表的值，
// 否则 factor 表示放大/缩小的因子，当 factor 为正数时表示画布放大画布，
// 当 factor 为负数时表示缩小画布
export function zoom(factor = 1, absolute = false, graph) {
  graph.zoom(factor, {
    absolute,
    minScale: 0.25,
    maxScale: 2
  })
}
// 链接类型
export function renewConnector(graph, type, that) {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    cells.forEach(item => {
      item.setConnector && item.setConnector(type)
    })
  } else {
    that.$message.warning('请先选中连接线')
  }
}

/**
 * description: 当历史队列改变时触发
 * @param {*} graph 画布对象
 * @param {Function} callback 回调函数
 */
export const historyChange = (graph, callback) => {
  graph.on('history:change', ({ cmds }) => {
    typeof callback === 'function' && callback(cmds)
  })
}

/**
 * description: 当选中节点
 * @param {*} graph 画布对象
 * @param {Function} callback 回调函数
 */
export const selectedChange = (graph, callback) => {
  graph.on('node:selected', (cmds) => {
    typeof callback === 'function' && callback(cmds)
  })
}
/**
 * description: 取消选中节点
 * @param {*} graph 画布对象
 * @param {Function} callback 回调函数
 */
export const unSelectedChange = (graph, callback) => {
  graph.on('node:unselected', (cmds) => {
    typeof callback === 'function' && callback(cmds)
  })
}