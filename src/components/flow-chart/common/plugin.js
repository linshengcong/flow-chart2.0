import { Snapline } from '@antv/x6-plugin-snapline'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { History } from '@antv/x6-plugin-history'
import { MiniMap } from '@antv/x6-plugin-minimap'
import { Export } from '@antv/x6-plugin-export'
import { Transform } from '@antv/x6-plugin-transform'
import SelectionOpts from '../config/selection'
import reszieOpts from '../config/resize'


/**
 * 注册插件
 * param {*} graph 画布对象
 */
export function registerPlugin(graph) {
  if (!graph) return
  // 对齐线
  graph.use(new Snapline({ enabled: true }))
  // 复制粘贴
  graph.use(new Clipboard({ enabled: true }))
  // 快捷键
  graph.use(new Keyboard({ enabled: true }))
  // 框选
  graph.use(new Selection(SelectionOpts))
  // 撤销重做
  graph.use(new History({ enabled: true }))
  // 小地图
  graph.use(new MiniMap({
    container: document.getElementById('minimap'),
    width: 160, height: 120, padding: 48
  }))
  // 图形变换
  graph.use( new Transform({ resizing: reszieOpts }))
  // 导出
  graph.use(new Export())
}
