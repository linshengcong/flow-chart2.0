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
  graph[exportChartType[type]['method']](`${fileName}${exportChartType[type]['suffix']}`, { padding: 40 })
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
    // 是否需要缩放图片(图片宽度大于PDF 宽度, 图片需要按比例缩放)
    const isZoomPicture = width > 595.28
    // PDF一页的高度
    const pageHeight = isZoomPicture ? width / 592.28 * 841.89 : 841.89
    // 流程图本身的高度
    let graphHeight = height
    // 分页情况下, 页面向上的偏移量
    let offsetTop = 0
    // 图片的宽度
    const imgWidth = isZoomPicture ? 595.28 : width
    // 图片的高度
    const imgHeight = isZoomPicture ? 592.28 / width * height : height
    // 非分页情况下, 图片居中展示
    const offsetLeft = isZoomPicture ? 0 : (595.28 - width) / 2
    // 图片的高度未超过pdf一页显示的高度，无需分页
    if (graphHeight < pageHeight) {
      pdf.addImage(dataUri, 'PNG', offsetLeft, 0, imgWidth, imgHeight)
    } else {
      while (graphHeight > 0) {
        pdf.addImage(dataUri, 'PNG', offsetLeft, offsetTop, imgWidth, imgHeight)
        graphHeight -= pageHeight
        offsetTop -= 841.89
        if (graphHeight > 0) {
          pdf.addPage()
        }
      }
    }
    pdf.save('flowChart.pdf')
  }, { padding: 40 })
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
