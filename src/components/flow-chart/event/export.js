import { jsPDF } from 'jspdf'

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

export const exportChart = (graph, type, fileName = 'chart') => {
  graph.zoom(1, {
    absolute: true,
    minScale: 0.25,
    maxScale: 2
  })
  graph[exportChartType[type]['method']](`${fileName}${exportChartType[type]['suffix']}`)
}

export const exportPDF = graph => {
  graph.zoom(1, {
    absolute: true,
    minScale: 0.25,
    maxScale: 2
  })
  graph.toPNG((dataUri) => {
    // a4纸的尺寸[595.28,841.89]
    const pdf = new jsPDF('', 'pt', 'a4')
    const { width, height } = graph.getContentBBox()
    // 根据pdf 一页的尺寸, 计算出流程图占满一页所需的高度
    const pageHeight = width / 592.28 * 841.89
    // 流程图本身的高度
    let graphHeight = height
    // 页面向上的偏移量
    let offsetTop = 0
    // 流程图占满一页的宽度
    const imgWidth = 595.28
    // 流程图占满pdf 宽度, 计算出流程图在pdf 中对应比例的高度
    const imgHeight = 592.28 / width * height
    // 当内容未超过pdf一页显示的范围，无需分页
    if (graphHeight < pageHeight) {
      pdf.addImage(dataUri, 'PNG', 0, 0, imgWidth, imgHeight)
    } else {
      while (graphHeight > 0) {
        pdf.addImage(dataUri, 'PNG', 0, offsetTop, imgWidth, imgHeight)
        graphHeight -= pageHeight
        offsetTop -= 841.89
        // 避免添加空白页
        if (graphHeight > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.save('flowChart.pdf')

  }, { padding: 20 })
}

export const exportJSON = graph => {
  const link = document.createElement('a')
  link.download = 'flowChart.json'
  link.setAttribute('style', 'display: none')
  const blob = new Blob([JSON.stringify(graph.toJSON())], { type: 'text/json' })
  link.href = window.URL.createObjectURL(blob)
  link.dataset.downloadurl = ['text/json', link.download, link.href].join(':')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const importJSON = graph => {
  let input = document.createElement('input')
  input.type = 'file'

  // 绑定onchange事件
  input.onchange = e => {
    const files = e.target.files
    if (!files || !files.length) {
      input = null
      throw new Error('没有文件')
    }
    const reader = new FileReader()
    reader.onload = e => {
      try {
        const result = e.target.result
        console.log('导入的文件内容:', result)
        graph.clearCells()
        graph.fromJSON(JSON.parse(result))
        graph.zoom(1, {
          absolute: true,
          minScale: 0.25,
          maxScale: 2
        })
        graph.centerContent()
        return result
      } catch (e) {
        throw new Error(e + '文件导入失败, 请检查文件格式是否是JSON')
      }
    }
    reader.readAsText(files[0])
  }

  // 触发上传文件
  input.click()
}
