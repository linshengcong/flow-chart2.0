class SearchNodeFun {
  constructor(graph) {
    this.graph = graph
  }

  // 获取页面node数据
  getNodes() {
    console.log('nodes', this.graph)
    const nodes = this.graph.getNodes()
    return nodes
  }
  // 加载默认的graph数据到搜索列表
  querySearch(queryString, cb) {
    const restaurants = this.getNodes()
    const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
    // 调用 callback 返回建议列表的数据
    cb(results)
  }
  // 关键字查询返回对应的数据列表
  createFilter(queryString) {
    return (restaurant) => {
      return restaurant.data.nodeName.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
    }
  }
  // 点击对应的节点进行选中并定位
  positionNode(label) {
    const graph = this.graph
    const nodes = this.getNodes()
    for (let i = 0; i < nodes.length; i++) {
      console.log(nodes[i])
      if (nodes[i].data.nodeName === label) {
      // Select the node and center the view on it
        graph.cleanSelection()
        graph.select(nodes[i])
        // const rect = nodes[i].getBBox()
        // Scroller.scrollToPoint(rect.x, rect.y, { animation: { duration: 400 } })
        graph.centerCell(nodes[i])
        break
      }
    }
  }

}

export default SearchNodeFun