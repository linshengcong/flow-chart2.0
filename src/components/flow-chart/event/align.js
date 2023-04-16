export const handleAlign = (graph, bar) => {
  const alignMap = {
    'bar-2': 'left',
    'bar-3': 'mid',
    'bar-4': 'right'
  }
  const alignType = alignMap[bar]
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
  // 左对齐
  if (alignType === 'left') {
    // 拿到最小的x值
    const minX = Math.min.apply(Math, selectArea.map(function(item) { return item.x }))
    // 拿到最小的x值对应数据的id
    const minId = selectArea.reduce((p, v) => p.x > v.x ? v : p).id
    // 需要左对齐的
    const needAlignLeftList = selectArea.filter(el => { return el.id !== minId })
    // 设置左对齐
    selected.map(node => {
      needAlignLeftList.map(ele => {
        if (node.id === ele.id) {
          node.position(minX, ele.y).resize(ele.width, ele.height)
        }
      })
    })
  }
  if (alignType === 'mid' || alignType === 'right') {
    // 拿到最长的width值
    const maxWidth = Math.max.apply(Math, selectArea.map(function(item) { return item.width }))
    // 拿到最长的width值对应数据的id
    const maxWidthId = selectArea.reduce((p, v) => p.width < v.width ? v : p).id
    // 拿到最长的width值对应数据的x
    const maxWidthX = (selectArea.find(el => { return el.id === maxWidthId }) || {}).x
    // 需要右或者居中对齐的
    const needAlignList = selectArea.filter(el => { return el.id !== maxWidthId })
    // 设置右或者居中对齐
    selected.map(node => {
      needAlignList.map(ele => {
        if (node.id === ele.id) {
          const positionX = alignType === 'right' ? maxWidthX + maxWidth - ele.width :
            alignType === 'mid' ? maxWidthX + (maxWidth - ele.width) / 2 :
              ele.x
          node.position(positionX, ele.y).resize(ele.width, ele.height)
        }
      })
    })
  }
}