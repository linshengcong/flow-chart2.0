// 锁定功能，设置选中的节点的工具消失
export function setWidgetToolsHidden(flag = false) {
  const transformNodeList = document.querySelectorAll('.x6-widget-transform')
  const selectBoxNodeList = document.querySelectorAll('.x6-widget-selection-box-node')
  const selectBoxList = document.querySelectorAll('.x6-widget-selection-box')
  transformNodeList.forEach(el => {
    el.style.visibility = flag ? 'hidden' : 'visible'
  })
  selectBoxNodeList.forEach(el => {
    el.style.visibility = flag ? 'hidden' : 'visible'
  })
  selectBoxList.forEach(el => {
    el.style.visibility = flag ? 'hidden' : 'visible'
  })
}

export const handleLock = (graph, lockType, targetNode) => {
  let selected = graph.getSelectedCells()
  
  const targetIndex = selected.findIndex(node => node.id === targetNode.id)
  if (targetIndex < 0) selected = [targetNode]
  selected.map(cell => {
    if (cell.store.data && cell.store.data.disableMove) {
      setWidgetToolsHidden(cell.store.data.disableMove)
    }
    Object.assign(cell.store.data || {}, { disableMove: lockType === 'lock' })
    lockType === 'lock' && cell.removeTools()
  })
  setWidgetToolsHidden(lockType === 'lock')
  graph.lockSelectdList = selected
}
