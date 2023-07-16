<script lang="jsx">
export default {
  name: 'LaneNode',
  // 通过注入方式获取 画布、节点 实例, 自定义样式
  inject: ['getGraph', 'getNode'],
  data() {
    return {
      viewable: false,
      isEditTitle: false,
      graph: null,
      businessData: {},
      styles: {},
      shape: null, // 节点基础信息
      node: {} // 节点基础信息
    }
  },
  mounted() {
    this.graph = this.getGraph()
    this.shape = this.getNode() || {}
    this.styles = this.shape.attrs.styles
    this.shape.data.nodeName = this.shape.data.nodeName || ''
    this.shape.data.isSelect = false
    this.businessData = this.shape.data
    this.node = this.shape.data || { name: 'lane-node' }
    if (window.location.href.includes('view=detail')) {
      this.viewable = true
    }
  },
  render() {
    return (
      <div class="lane-node">
        <input class="input" value={this.businessData.nodeName} onInput={e => this.businessData.nodeName = e.target.value} />
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.lane-node {
  height: 100%;
  width: 100%;
  border: 2px solid #1E86FF;

  .input {
    width: 100%;
    height: 50px;
    text-align: center;
    border-block-end: 2px solid #1E86FF;
    background: transparent;
  }
}
</style>
