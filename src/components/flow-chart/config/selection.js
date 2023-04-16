export default {
  enabled: true, // 开启框选功能
  multiple: true, // 启用点击多选，ctrl 或 command 键点击节点实现多选
  rubberband: true, // 启用框选节点功能
  movable: true, // 拖动选框时框选的节点是否一起移动
  showNodeSelectionBox: true, // 显示节点的选择框
  // showEdgeSelectionBox: true, // 显示边的选择框
  pointerEvents: 'none', // 解决节点的事件无法响应
  className: 'selected-box' // 附加样式名
}