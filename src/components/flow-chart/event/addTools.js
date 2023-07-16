import { createNode, createEdge } from './index'
/**
 * description: 新增节点工具
 * @param {*} node 当前节点
 * @param {*} graph 画布对象
 */
export const addTools = (node, graph) => {
  node.addTools([
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 7,
              'stroke': '#1e86ff',
              'stroke-width': 1,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 14,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '50%',
        y: 0,
        offset: { x: 0, y: -25 },
        onClick({ cell }) {
          const width = +Math.random().toString().substring(3, 5) + 100
          const node = createNode(1, graph, cell, 'top', width)
          graph.addCell([node, createEdge(cell, node, graph, 'top')])
        }
      }
    },
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 7,
              'stroke': '#1e86ff',
              'stroke-width': 1,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 14,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '100%',
        y: '50%',
        offset: { x: 25, y: 0 },
        onClick({ cell }) {
          const width = +Math.random().toString().substring(3, 5) + 100
          const node = createNode(1, graph, cell, 'right', width)
          graph.addCell([node, createEdge(cell, node, graph, 'right')])
        }
      }
    },
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 7,
              'stroke': '#1e86ff',
              'stroke-width': 1,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 14,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '50%',
        y: '100%',
        offset: { x: 0, y: 25 },
        onClick({ cell }) {
          const width = +Math.random().toString().substring(3, 5) + 100
          const node = createNode(1, graph, cell, 'bottom', width)
          graph.addCell([node, createEdge(cell, node, graph, 'bottom')])
        }
      }
    },
    {
      name: 'button',
      rotate: true,
      args: {
        markup: [
          {
            tagName: 'circle',
            selector: 'button',
            attrs: {
              'r': 7,
              'stroke': '#1e86ff',
              'stroke-width': 1,
              'fill': 'white',
              'cursor': 'pointer'
            }
          },
          {
            tagName: 'text',
            textContent: '+',
            selector: 'icon',
            attrs: {
              'fill': '#1e86ff',
              'font-size': 14,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: 0,
        y: '50%',
        offset: { x: -25, y: 0 },
        onClick({ cell }) {
          // TODO 开始结束按加号加载节点插在中间
          const width = +Math.random().toString().substring(3, 5) + 100
          const node = createNode(1, graph, cell, 'left', width)
          graph.addCell([node, createEdge(cell, node, graph, 'left')])
        }
      }
    }
  ])
}
