<script lang="jsx">
export default {
  name: 'GeneralNode',
  // 通过注入方式获取 画布、节点 实例, 自定义样式
  inject: ['getGraph', 'getNode'],
  data() {
    return {
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
    this.node = this.shape.data || { name: 'general-node' }
  },
  render() {
    return <div class="general-node" >
      <div class="title">
        {this.businessData.nodeName}
      </div>
    </div>
  }
}
</script>

<style lang="scss" scoped>
.general-node {
  height: 100%;
  width: 100%;
  border: 1px solid #DFE4E8;
  border-radius: 25px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    color: #434b5b;
  }
}
.x6-node-selected {
  .general-node {
    background: #1E86FF;
    border: none;
    box-shadow: 0px 0px 8px 0px #86beff; 
    .title {
      color: #fff;
    }
  }
}
</style>
