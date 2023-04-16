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
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
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
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '50%',
        y: 0,
        offset: { x: 0, y: -20 },
        onClick({ cell }) {
          const node = createNode(1, graph, cell, 'top')
          graph.addCell([node, createEdge(cell, node, graph, 'top')])
          node.removeTools()
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
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
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
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '100%',
        y: '50%',
        offset: { x: 20, y: 0 },
        onClick({ cell }) {
          const node = createNode(1, graph, cell, 'right')
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
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
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
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: '50%',
        y: '100%',
        offset: { x: 0, y: 20 },
        onClick({ cell }) {
          const node = createNode(1, graph, cell, 'bottom')
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
              'r': 10,
              'stroke': '#1e86ff',
              'stroke-width': 2,
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
              'font-size': 20,
              'font-weight': 'bold',
              'text-anchor': 'middle',
              'pointer-events': 'none',
              'y': '0.3em'
            }
          }
        ],
        x: 0,
        y: '50%',
        offset: { x: -20, y: 0 },
        onClick({ cell }) {
          const node = createNode(1, graph, cell, 'left')
          graph.addCell([node, createEdge(cell, node, graph, 'left')])
        }
      }
    }
  ])
}