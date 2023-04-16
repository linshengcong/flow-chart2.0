/**
 * name: setLevel
 * description: 设置节点图层层级
 * param {*} val  topping 置顶 bottoming 置底 up 上移一层 down 下移一层
 * return {*}
 */
export function setLevel(graph, val) {
  const selectNodeList = graph.getSelectedCells()
  const len = selectNodeList.length
  for (let index = 0; index < len; index++) {
    const cell = selectNodeList[index]
    console.log(graph.getNeighbors(cell))
    if (val === 'topping') {
      cell.toFront()
    } else if (val === 'bottoming') {
      cell.toBack()
    } else if ( val === 'up') {
      const nodeLevel = cell.getZIndex()
      console.log('nodeLevel', nodeLevel)
      cell.setZIndex(nodeLevel + 1)
    } else {
      const nodeLevel = cell.getZIndex()
      console.log('nodeLevel', nodeLevel)
      cell.setZIndex(nodeLevel - 1)
    }
  }
}