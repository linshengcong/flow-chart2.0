export default {
  nodes: [
    {
      'position': {
        'x': 100,
        'y': 100
      },
      'size': {
        'width': 160,
        'height': 92
      },
      'view': 'vue-shape-view',
      'shape': 'custom-node',
      'id': 'node-001',
      'data': { nodeName: '测试流程1', fullName: 'admin', finishDate: '2023-04-12' },
      'zIndex': 1
    },
    {
      'position': {
        'x': 100,
        'y': 300
      },
      'size': {
        'width': 160,
        'height': 92
      },
      'view': 'vue-shape-view',
      'shape': 'custom-node',
      'id': 'node-002',
      'data': { nodeName: '测试流程2', fullName: 'editor', finishDate: '2023-04-12' },
      'zIndex': 2
    },
    {
      'position': {
        'x': 100,
        'y': 500
      },
      'size': {
        'width': 160,
        'height': 92
      },
      'view': 'vue-shape-view',
      'shape': 'custom-node',
      'id': 'node-003',
      'data': { nodeName: '测试流程3', fullName: 'tester', finishDate: '2023-04-12' },
      'zIndex': 3
    }
  ],
  edges: [
    {
      'shape': 'edge',
      'id': '99e42853-9d00-48f9-a753-0421e12ffe25',
      'source': {
        'cell': 'node-001',
        'port': 'port3'
      },
      'target': {
        'cell': 'node-002',
        'port': 'port1'
      },
      'zIndex': 5
    },
    {
      'shape': 'edge',
      'id': '6d439d25-a9fa-462a-973e-11409ebb1d92',
      'source': {
        'cell': 'node-001',
        'port': 'port3'
      },
      'target': {
        'cell': 'node-003',
        'port': 'port1'
      },
      'zIndex': 6
    }
  ]
}