export const handleRectMatch = (graph, type) => {
  // 获取框选的节点
  const selectArea = []
  const selected = graph.getSelectedCells()
  if (selected.length < 2) {
    return false
  }
  selected.map(item => {
    const { position, size, id } = item.store.data
    const { x, y } = position
    const { width, height } = size
    // 拿到需要的数据 x y width height id push到一个临时数组里面
    selectArea.push({ x, y, width, height, id })
  })
  // 宽度匹配
  if (type === 'width') {
    // 拿到最长的width值
    const maxWidth = Math.max.apply(Math, selectArea.map(function(item) { return item.width }))
    // 拿到最长的width值对应数据的id
    const maxWidthId = selectArea.reduce((p, v) => p.width < v.width ? v : p).id
    const needWidthMatchList = selectArea.filter(el => { return el.id !== maxWidthId })
    selected.map(node => {
      needWidthMatchList.map(ele => {
        if (node.id === ele.id) {
          node.position(ele.x, ele.y).resize(maxWidth, ele.height)
        }
      })
    })
  }
  // 高度匹配
  if (type === 'height') {
    // 拿到最长的height值
    const maxHeight = Math.max.apply(Math, selectArea.map(function(item) { return item.height }))
    // 拿到最长的height值对应数据的id
    const maxHeightId = selectArea.reduce((p, v) => p.height < v.height ? v : p).id
    const needHeightMatchList = selectArea.filter(el => { return el.id !== maxHeightId })
    selected.map(node => {
      needHeightMatchList.map(ele => {
        if (node.id === ele.id) {
          node.position(ele.x, ele.y).resize(ele.width, maxHeight)
        }
      })
    })
  }
  // 高度匹配
  if (type === 'widthAndHeight') {
    // 拿到最长的width值
    const maxWidth = Math.max.apply(Math, selectArea.map(function(item) { return item.width }))
    // 拿到最长的height值
    const maxHeight = Math.max.apply(Math, selectArea.map(function(item) { return item.height }))
    selected.map(node => {
      const { position } = node.store.data
      const { x, y } = position
      node.position(x, y).resize(maxWidth, maxHeight)
    })
  }
}