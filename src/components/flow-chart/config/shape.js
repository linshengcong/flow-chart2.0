import { ObjectExt } from '@antv/x6'
import Ports from './port'

// 自定义矩形配置
export const Rect = {
  width: 100,
  height: 50,
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'text',
      selector: 'label'
    }
  ],
  ports: Ports,
  attrs: {
    body: {
      fill: '#ffffff',
      stroke: '#1E86FF',
      strokeWidth: 1,
      rx: 6,
      ry: 6
    },
    label: {
      fontSize: 14,
      fill: '#333333',
      refX: '50%',
      refY: '50%',
      textAnchor: 'middle',
      textVerticalAnchor: 'middle'
    }
  },
  // 通过钩子将节点自定义属性应用到 'attrs/text/text' 属性上
  propHooks(metadata) {
    const { label, ...others } = metadata
    if (label) {
      ObjectExt.setByPath(others, 'attrs/text/text', label)
    }
    return others
  }
}

// 自定义边配置
export const Edge = {
  markup: [
    {
      tagName: 'circle',
      selector: 'round'
    },
    {
      tagName: 'path',
      selector: 'line',
      attrs: {
        fill: 'none',
        cursor: 'pointer'
      }
    }
  ],
  // 定制样式
  attrs: {
    // 代表透明的 <path> 元素，用于响应交互
    wrap: {
      connection: true,
      strokeWidth: 10,
      strokeLinejoin: 'round'
    },
    line: {
      connection: true,
      stroke: '#1E86FF', // path 元素的填充色
      strokeWidth: 1 // path 元素的 宽度
    },
    round: {
      r: 0,
      stroke: '#1E86FF',
      fill: '#1E86FF',
      atConnectionRatio: 0,
      cursor: 'pointer',
      animation: 'inherit',
      dur: '2s'
    }
  }
}
