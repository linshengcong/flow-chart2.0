export const handleNodeSpacing = (graph, type) => {
  // 获取框选的节点
  const selected = graph.getSelectedCells()
  if (selected.length < 3) return
  if (type === 'horizontal') {
    selected.sort((a, b) => a.store.data.position.y - b.store.data.position.y)
    const nodeMap = {}
    selected.forEach(item => {

      const { position, size, id } = item.store.data
      const { x, y } = position
      const { width, height } = size
      const bottomPos = y + height
      const rightPos = x + width
      nodeMap[id] = { x, y, width, height, id, bottomPos, rightPos }
    })
    // 最大空隙
    let maxSpacing = -Infinity
    // 缓存当前节点底部坐标
    let cacheBottomPos = -Infinity
    selected.forEach((item, index) => {
      const nodeInfo = nodeMap[item.store.data.id]
      if (!nodeInfo) return console.log('没有这个节点')
      if (index === 0) return cacheBottomPos = nodeInfo.bottomPos
      const spacing = nodeInfo.y - cacheBottomPos
      maxSpacing < spacing && (maxSpacing = spacing)
      cacheBottomPos = nodeInfo.bottomPos
    })

    let accumulator = 0
    // 批量设置节点坐标
    selected.forEach((node, index) => {
      const nodeInfo = nodeMap[node.store.data.id]
      if (index === 0) {
        accumulator = nodeInfo.y
      } else {
        accumulator += maxSpacing + nodeInfo['height']
      }
      node.position(nodeInfo.x, accumulator)
    })
  }
  else if (type === 'vertical') {
    selected.sort((a, b) => a.store.data.position.x - b.store.data.position.x)
    const nodeMap = {}
    selected.forEach(item => {

      const { position, size, id } = item.store.data
      const { x, y } = position
      const { width, height } = size
      const bottomPos = y + height
      const rightPos = x + width
      nodeMap[id] = { x, y, width, height, id, bottomPos, rightPos }
    })
    // 最大空隙
    let maxSpacing = -Infinity
    // 缓存当前节点底部坐标
    let cacheBottomPos = -Infinity
    selected.forEach((item, index) => {
      const nodeInfo = nodeMap[item.store.data.id]
      if (!nodeInfo) return console.log('没有这个节点')
      if (index === 0) return cacheBottomPos = nodeInfo.rightPos
      const spacing = nodeInfo.x - cacheBottomPos
      maxSpacing < spacing && (maxSpacing = spacing)
      cacheBottomPos = nodeInfo.rightPos
    })

    let accumulator = 0
    // 批量设置节点坐标
    selected.forEach((node, index) => {
      const nodeInfo = nodeMap[node.store.data.id]
      if (index === 0) {
        accumulator = nodeInfo.x
      } else {
        accumulator += maxSpacing + nodeInfo['width']
      }
      node.position(accumulator, nodeInfo.y)
    })
  }
}
