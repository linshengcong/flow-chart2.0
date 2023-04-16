/**
 * 图形变换插件配置项
 */

export default {
  enabled: true, // 是否支持调整节点大小
  minWidth: 1, // 最小的调整宽度
  minHeight: 1, // 最小的调整高度
  orthogonal: false, // 是否显示中间调整点
  restricted: false, // 调整大小边界是否可以超出画布边缘
  preserveAspectRatio: false // 调整大小过程中是否保持节点的宽高比例
}