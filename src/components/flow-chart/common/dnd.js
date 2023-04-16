import { Dnd } from '@antv/x6-plugin-dnd'
export function registerDnd(graph, dndContainer) {
  const dnd = new Dnd({
    target: graph, // 目标画布
    scaled: false,
    validateNode: () => {
      // (droppingNode: Node, options: ValidateNodeOptions) => boolean | Promins<boolean>
      return true
    }, // 拖拽结束时，验证节点是否可以放置到目标画布中。
    dndContainer: dndContainer // 在 dndContainer 上放开鼠标不会放置节点
  })

  return dnd
}