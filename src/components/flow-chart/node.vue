<script lang="jsx">
export default {
  name: 'CustomNode',
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
  computed: {
    borderColor() {
      if (this.businessData.isError) return '#f56c6c'
      if (!this.businessData.status) return '#DFE4E8'
      const statusColorMap = {
        '未开始': '#DFE4E8',
        '进行中': '#54A3FF',
        '已完成': '#7BD251'
      }
      return statusColorMap[this.businessData.status]
    }
  },
  mounted() {
    this.graph = this.getGraph()
    this.graph.on('node:selected', ({ node }) => { 
      node.data.isSelect = true
    })
    this.graph.on('node:unselected', ({ node }) => {
      node.data.isSelect = false
      this.isEditTitle = false
    })
    this.graph.on('blank:click', () => {
      this.isEditTitle = false
    })
    this.shape = this.getNode() || {}
    this.styles = this.shape.attrs.styles
    this.shape.data.nodeName = this.shape.data.nodeName || ''
    this.shape.data.isError = false
    this.shape.data.isSelect = false
    this.businessData = this.shape.data
    this.node = this.shape.data || { name: 'custom-node' }

    const el = document.getElementById('container')
    el.addEventListener('keydown', event => {
      const selected = this.graph.getSelectedCells()
      if (selected.length !== 1 || selected[0].id !== this.shape.id) return
      if (!this.isEditTitle) {
        this.isEditTitle = true
      } else if (event.key === 'Enter' && this.isEditTitle) {
        // TODO 获取input 框焦点切换后会失去焦点
        this.isEditTitle = false
      }
    })
  },
  render() {
    return <div class="custom-node" style={{ 'border-color': this.borderColor }} >
      {this.businessData.isKcp ? <svg-icon class="kcp" icon-class="kcp" /> : ''}
      {this.businessData.childrenCount ? <svg-icon class="sub_process" icon-class="sub_process" /> : ''}
      {(() => {
        if (this.businessData.nodeName && !this.isEditTitle) {
          return <div class="title">
            {this.businessData.status === 'overdue' && <svg-icon class="overdue" icon-class="gantt-overdue" />}
            {this.businessData.nodeName}
          </div>
        } else if (this.isEditTitle) {
          return <el-input value={this.businessData.nodeName} onInput={e => this.businessData.nodeName = e} placeholder="请输入流程节点名称"></el-input>
        }
      })()}
      {
        !this.isEditTitle && this.businessData.fullName &&
          <div class="row">
            <svg-icon class="icon" icon-class={this.businessData.isSelect ? 'user_white' : 'user_grey'} />
            <div class="content">
              {this.businessData.fullName}
            </div>
          </div>
      }
      {
        !this.isEditTitle && this.businessData.finishDate &&
          <div class="row">
            <svg-icon class="icon" icon-class={this.businessData.isSelect ? 'calendar_white' : 'calendar_grey'} />
            <div class="content">
              {this.businessData.finishDate}
            </div>
          </div>
      }
    </div>
  }
}
</script>

<style lang="scss" scoped>
.custom-node {
  box-sizing: border-box;
  padding: 16px 20px;
  height: 100%;
  width: 100%;
  border: 1px solid #DFE4E8;
  border-radius: 8px;
  background-color: #FFFFFF;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
    height: 16px;
    font-size: 12px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    color: #434b5b;
    line-height: 16px;
  }
  .kcp {
    position: absolute;
    top: -10px;
    left: -6px;
    width: 36px;
    height: 20px;
  }
  .overdue {
    margin-right: 4px;
    width: 16px;
    height: 16px;
  }
  .sub_process {
    position: absolute;
    width: 20px;
    height: 20px;
    right: -1px;
    bottom: -1px;
  }
  .row {
    display: flex;
    height: 16px;
    line-height: 16px;
    margin-top: 4px;

    .icon {
      width: 16px;
      height: 16px;
      margin-right: 6px;
    }

    .content {
      font-size: 12px;
      font-family: PingFang SC, PingFang SC-Regular;
      color: #8c97a4;
      line-height: 16px;
    }
  }
}
.x6-node-selected {
  .custom-node {
    background: #1E86FF;
    border: none;
    box-shadow: 0px 0px 8px 0px #86beff; 
    .title {
      color: #fff;
    }
    .content {
      color: #fff;
    }
  }
}
</style>
