<template>
  <div class="flow-chart-container">
    <div class="top-bar">
      <div class="title">
        流程图 Exaple
      </div>
      <el-button type="primary" plain @click="handleSave">
        保存到本地
      </el-button>
    </div>
    <!-- 流程图 -->
    <div class="flow-content">
      <flow-chart
        ref="flowChart"
        :business-config="businessConfig"
        :show-flow-modal="true"
        :breadcrumb="false"
        :use-context-menu="true"
        @initGraph="initGraph">
        <template #modal>
          <node-config
            v-show="!isEdgeConfig"
            ref="nodeConfigRef"
            :is-edge-config.sync="isEdgeConfig"
            v-bind.sync="nodeInfo"
            :graph="graph"
            @modifyEdgeName="modifyEdgeName" />

          <edge-config
            v-show="isEdgeConfig"
            ref="edgeConfigRef"
            v-bind.sync="edgeConfig"
            :graph="graph"
            @modifyEdgeName="modifyEdgeName" />
        </template>
      </flow-chart>
    </div>
  </div>
</template>
<script>
import FlowChart from '@/components/flow-chart'
import EdgeConfig from '@/components/flow-chart/business/components/edge-config.vue'
import NodeConfig from '@/components/flow-chart/business/components/node-config.vue'
import businessConfig from './businessConfig'

export default {
  name: 'Flow',
  components: {
    FlowChart,
    EdgeConfig,
    NodeConfig
  },
  data() {
    return {
      graph: null,
      selectedEdge: {},
      isEdgeConfig: false,
      edgeConfig: {
        label: '',
        edgeInstance: null
      },
      nodeInfo: {},
      businessConfig
    }
  },
  methods: {
    initGraph(graph) {
      this.graph = graph
      this.initEvents(graph)
    },
    showSlider(val = true) {
      console.log('va;', val)
      this.$refs['flowChart'].show = val
    },
    initEvents(graph) {
      graph.on('edge:click', ({ edge }) => {
        this.isEdgeConfig = true
        if (edge.store.changed?.tools?.items?.find(e => e.name === 'button')) {
          this.edgeConfig.label = edge.store.changed.tools.items.find(e => e.name === 'button').args.markup[1].textContent
        } else this.edgeConfig.label = ''
        this.edgeConfig.edgeInstance = edge
        this.showSlider()
      })
      graph.on('node:click', ({ node }) => {
        console.log(node)
        this.isEdgeConfig = false
        this.nodeInfo = node.data
        this.showSlider()
      })
      // 删除节点操作
      graph.on('node:removed', () => {})

      // 拖拽节点添加
      graph.on('node:added', () => {})

      // 节点双击操作
      graph.on('cell:dblclick', () => {})

      graph.on('blank:click', () => {
        this.showSlider(false)
      })
    },
    handleSave() {
      const graphJSON = this.$refs.flowChart.graph.toJSON()
      localStorage.setItem('graphJSON', JSON.stringify(graphJSON))
      this.$message.success('保存成功')
    },
    modifyEdgeName({ edge, label }) {
      this.edgeConfig.label = label
      edge.hasTool('button') && edge.removeTool('button')
      edge.addTools({
        name: 'button',
        args: {
          markup: [
            {
              tagName: 'rect',
              selector: 'button',
              attrs: {
                r: 18,
                cursor: 'pointer'
              }
            },
            {
              tagName: 'text',
              textContent: label,
              selector: 'icon',
              attrs: {
                fill: '#434B5B',
                fontSize: 14,
                textAnchor: 'middle',
                pointerEvents: 'none',
                y: '0.3em'
              }
            }
          ],
          distance: '50%'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-chart-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .top-bar {
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  .flow-content {
    height: calc(100vh - 40px);
  }
}
</style>
