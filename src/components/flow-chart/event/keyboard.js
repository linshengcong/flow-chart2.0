import { zoom } from '../common/trigger'
/**
 * 注册快捷键事件
 * param {*} graph 画布对象
 */
export function registerKeyboardEvent(graph) {
  // 复制
  graph.bindKey(['ctrl+c', 'command+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略。
    return false
  })
  // 粘贴
  graph.bindKey(['ctrl+v', 'command+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  // 全选
  graph.bindKey(['ctrl+a', 'command+a'], () => {
    const cells = graph.getCells()
    if (cells.length) {
      graph.select(cells)
    }
    return false
  })
  // 删除
  graph.bindKey(['delete', 'backspace'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      // 删除前移除所有包含工具
      cells.forEach(currentCell => {
        currentCell.removeTools()
      })
      graph.removeCells(cells)
    }
    return false
  }, 'keydown')
  // 撤销
  graph.bindKey(['ctrl+z', 'command+z'], () => {
    graph.undo()
    return false
  })
  // 重做
  graph.bindKey(['ctrl+y', 'shift+command+z'], () => {
    graph.redo()
    return false
  })
  // Esc 取消所有选中单元 & 关闭提示
  graph.bindKey('esc', () => {
    graph.cleanSelection()
    return false
  })
  
  // 居中
  graph.bindKey(['alt+f', 'option+f'], () => {
    // 多选之后在居中会产生框选偏移bug  x6-plugin-transform插件本身bug  先清空在返回指定的节点
    const cls = graph.getSelectedCells()
    graph.cleanSelection() // 清空所有
    graph.centerContent()
    graph.resetSelection(cls) // 返回之前选中指定的节点
    return false
  })

  // 放大
  graph.bindKey(['alt++', 'alt+=', 'command++', 'command+='], () => {
    zoom(0.1)
    return false
  })
  // 缩小
  graph.bindKey(['alt+-', 'command+-'], () => {
    zoom(-0.1)
    return false
  })
}