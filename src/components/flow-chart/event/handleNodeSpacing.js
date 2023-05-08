export const handleNodeSpacing = (graph, type) => {
  // 获取框选的节点
  const selected = graph.getSelectedCells()
  if (selected.length < 3) return
  if (type === 'vertical') {

    selected.sort((a, b) => a.store.data.position.y - b.store.data.position.y)
    const topEdge = selected[0].store.data.position.y
    const lastNode = selected[selected.length - 1]
    const bottomEdge = lastNode.store.data.position.y + lastNode.store.data.size.height
    let heightSum = 0 // 所有节点高度总和
    const nodeMap = {}
    // 数据组装成map, 计算出节点高度总和
    selected.forEach(item => {

      const { position, size, id } = item.store.data
      const { x, y } = position
      const { height } = size
      heightSum += height
      nodeMap[id] = { x, y, height, id }
    })
    // 计算出间隙
    const space = (bottomEdge - topEdge - heightSum) / (selected.length - 1)
    let yAxis = 0
    // 缓存上一个节点高度
    let cachePrevNodeHeight = 0
    // 重新设置节点位置
    selected.forEach((node, index) => {

      const nodeInfo = nodeMap[node.store.data.id]
      if (index === 0) {
        yAxis = nodeInfo.y
      } else {
        yAxis += space + cachePrevNodeHeight
      }
      cachePrevNodeHeight = nodeInfo['height']
      node.position(nodeInfo.x, yAxis)
    })
  }
  else if (type === 'horizontal') {
    
    selected.sort((a, b) => a.store.data.position.x - b.store.data.position.x)
    const leftEdge = selected[0].store.data.position.x
    const lastNode = selected[selected.length - 1]
    const rightEdge = lastNode.store.data.position.x + lastNode.store.data.size.width
    let widthSum = 0
    const nodeMap = {}

    selected.forEach(item => {

      const { position, size, id } = item.store.data
      const { x, y } = position
      const { width } = size
      widthSum += width
      nodeMap[id] = { x, y, width, id }
    })

    const space = (rightEdge - leftEdge - widthSum) / (selected.length - 1)
    let xAxis = 0
    let cachePrevNodeWidth = 0

    selected.forEach((node, index) => {

      const nodeInfo = nodeMap[node.store.data.id]
      if (index === 0) {
        xAxis = nodeInfo.x
      } else {
        xAxis += space + cachePrevNodeWidth
      }
      cachePrevNodeWidth = nodeInfo['width']
      node.position(xAxis, nodeInfo.y)
    })
  }
}
