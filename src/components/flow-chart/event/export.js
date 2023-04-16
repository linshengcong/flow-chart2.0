export const exportChartType = {
  'PNG': {
    method: 'exportPNG',
    suffix: '.png'
  },
  'JPEG': {
    method: 'exportJPEG',
    suffix: '.jpeg'
  },
  'SVG': {
    method: 'exportSVG',
    suffix: '.svg'
  }
}

export const exportChart = (graph, type, fileName = 'chart') => 
  graph[exportChartType[type]['method']](`${fileName}${exportChartType[type]['suffix']}`)

