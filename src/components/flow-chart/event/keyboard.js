import { zoom } from '../common/trigger'

/**
 * 复制
 */
const keyboardCopyEvent = graph => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    graph.copy(cells)
  }
  // 判断一个键盘事件是否应该被处理，返回 false 时对应的键盘事件被忽略。
  return false
}
/**
 * 粘贴
 */
const keyboardPasteEvent = graph => {
  if (!graph.isClipboardEmpty()) {
    const id = new Date().getTime() + Math.random().toString().substring(2, 8)
    const cells = graph.paste({
      offset: 32,
      nodeProps: { id, data: { id, isCopy: true } } // 重写节点额外属性
    })
    graph.cleanSelection()
    graph.select(cells)
  }
  return false
}
/**
 * 全选
 */
const keyboardSelectAllEvent = graph => {
  const cells = graph.getCells()
  if (cells.length) {
    graph.select(cells)
  }
  return false
}
/**
 * 删除
 */
const keyboardDeleteEvent = graph => {
  const cells = graph.getSelectedCells()
  if (cells.length) {
    // 删除前移除所有包含工具
    cells.forEach(currentCell => {
      currentCell.removeTools()
    })
    graph.removeCells(cells)
  }
  return false
}
/**
 * 撤销
 */
const keyboardUndoEvent = graph => {
  graph.undo()
  return false
}
/**
 * 重作
 */
const keyboardRedoEvent = graph => {
  graph.redo()
  return false
}

/**
 * 居中
 */
const keyboardCenterEvent = graph => {
  // 多选之后在居中会产生框选偏移bug  x6-plugin-transform插件本身bug  先清空在返回指定的节点
  const cls = graph.getSelectedCells()
  graph.cleanSelection() // 清空所有
  graph.centerContent()
  graph.resetSelection(cls) // 返回之前选中指定的节点
  return false
}

/**
 * 放大
 */
const keyboardZoomInEvent = () => {
  zoom(0.1)
  return false
}

/**
 * 缩小
 */
const keyboardZoomOutEvent = () => {
  zoom(-0.1)
  return false
}

/**
 * @description 注册快捷键事件
 * @param {*} graph 画布对象
 * @param {*} businessConfig 业务自定义配置
 */
export function registerKeyboardEvent(graph, businessConfig) {
  const customEventStack = businessConfig.customEventStack || {}
  /**
   * 事件总栈
   */
  const EventStack = {
    keyboardCopyEvent,
    keyboardPasteEvent,
    keyboardSelectAllEvent,
    keyboardDeleteEvent,
    keyboardUndoEvent,
    keyboardRedoEvent,
    keyboardCenterEvent,
    keyboardZoomInEvent,
    keyboardZoomOutEvent
  }
  /**
   * 自定义事件重写(事件命名需要统一)
   */
  Object.assign(EventStack, customEventStack)

  graph.bindKey(['ctrl+c', 'command+c'], () => {
    EventStack.keyboardCopyEvent(graph)
  })
  // 粘贴
  graph.bindKey(['ctrl+v', 'command+v'], () => {
    EventStack.keyboardPasteEvent(graph)
  })
  // 全选
  graph.bindKey(['ctrl+a', 'command+a'], () => {
    EventStack.keyboardSelectAllEvent(graph)
  })
  // 删除
  graph.bindKey(['delete', 'backspace'], () => {
    EventStack.keyboardDeleteEvent(graph)
  }, 'keydown')
  // 撤销
  graph.bindKey(['ctrl+z', 'command+z'], () => {
    EventStack.keyboardDeleteEvent(graph)
  })
  // 重做
  graph.bindKey(['ctrl+y', 'shift+command+z'], () => {
    EventStack.keyboardRedoEvent(graph)
  })
  // Esc 取消所有选中单元 & 关闭提示
  graph.bindKey('esc', () => {
    graph.cleanSelection()
    return false
  })
  // 居中
  graph.bindKey(['alt+f', 'option+f'], () => {
    EventStack.keyboardRedoEvent(graph)
  })
  // 放大
  graph.bindKey(['alt++', 'alt+=', 'command++', 'command+='], () => {
    EventStack.keyboardZoomInEvent(graph)
  })
  // 缩小
  graph.bindKey(['alt+-', 'command+-'], () => {
    EventStack.keyboardZoomOutEvent(graph)
    return false
  })
}
