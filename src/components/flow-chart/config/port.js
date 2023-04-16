export default {
  groups: {
    top: {
      position: 'top',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    right: {
      position: 'right',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    bottom: {
      position: 'bottom',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    },
    left: {
      position: 'left',
      zIndex: 20,
      attrs: {
        circle: {
          dataClass: 'choice-point',
          r: 4,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden'
          }
        }
      }
    }
  },
  items: [
    {
      id: 'port1',
      group: 'top'
    },
    {
      id: 'port2',
      group: 'right'
    },
    {
      id: 'port3',
      group: 'bottom'
    },
    {
      id: 'port4',
      group: 'left'
    }
  ]
}