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
      <flow-chart ref="flowChart" />
    </div>
  </div>
</template>
<script>
import FlowChart from '@/components/flow-chart'

export default {
  name: 'Flow',
  components: {
    FlowChart
  },
  methods: {
    handleSave() {
      const graphJSON = this.$refs.flowChart.graph.toJSON()
      localStorage.setItem('graphJSON', JSON.stringify(graphJSON))
      this.$message.success('保存成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.flow-chart-container {
  height: 100%;
  box-sizing: border-box;
  padding: 20px 20px 0;

  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin-right: 40px;
  }

  .flow-content {
    height: calc(100vh - 80px);
  }
}
</style>
