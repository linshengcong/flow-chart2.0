export const handleVerticalAlign = (graph, type) => {
  const selected = graph.getSelectedCells()
  if (selected.length < 2) return
  if (type === 'alignTopEdge') {
    selected.sort((a, b) => a.store.data.position.y - b.store.data.position.y)
    // 最高的边
    let topEdge
    selected.forEach((node, index) => {
      if (index === 0) return topEdge = node.store.data.position.y
      const x = node.store.data.position.x
      node.position(x, topEdge)
    })
  }
  else if (type === 'alignBottomEdge') {
    selected.sort((a, b) => {
      return b.store.data.position.y + b.store.data.size.height - (a.store.data.position.y + a.store.data.size.height)
    })

    // 最低的边
    let bottomEdge
    selected.forEach((node, index) => {
      const { x, y } = node.store.data.position
      const height = node.store.data.size.height
      if (index === 0) return bottomEdge = y + height
      const yAxis = bottomEdge - height
      node.position(x, yAxis)
    })
  }
  else if (type === 'verticalCenter') {
    // TODO y-axis 上为负, 下为正, 待修复
    const nodeMap = {}
    // 最高的边
    let cacheTopEdge = +Infinity
    // 最低的边
    let cacheBottomEdge = -Infinity
    selected.forEach(node => {

      const { position, size, id } = node.store.data
      const { x, y } = position
      const { height } = size
      const bottomPos = y + height
      if (cacheTopEdge > y) cacheTopEdge = y
      if (cacheBottomEdge < bottomPos) cacheBottomEdge = bottomPos
      nodeMap[id] = { x, height }
    })
    const centerLine = (cacheTopEdge + cacheBottomEdge) / 2
    selected.forEach((node) => {

      const { x, height } = nodeMap[node.id]
      const yAxis = centerLine - height / 2
      node.position(x, yAxis)
    })
    // const nodeMap = {}
    // // 最高的边
    // let cacheTopEdge = -Infinity
    // // 最低的边
    // let cacheBottomEdge = +Infinity
    // selected.forEach(node => {

    //   const { position, size, id } = node.store.data
    //   const { x, y } = position
    //   const { height } = size
    //   const bottomPos = y - height
    //   if (cacheTopEdge < y) cacheTopEdge = y
    //   if (cacheBottomEdge > bottomPos) cacheBottomEdge = bottomPos
    //   nodeMap[id] = { x, height }
    // })
    // const centerLine = (cacheTopEdge + cacheBottomEdge) / 2
    // selected.forEach((node) => {

    //   const { x, height } = nodeMap[node.id]
    //   const yAxis = centerLine + height / 2
    //   node.position(x, yAxis)
    // })
  }
}