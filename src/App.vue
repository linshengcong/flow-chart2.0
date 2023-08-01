<script>
import Bpmn from '@/components/bpmn/bpmn.vue'

export default {
  name: 'Flow',
  components: {
    Bpmn
  },
  methods: {
    handleSave() {
      this.$refs.bpmnRef.handleSave()
    }
  },
  render() {
    return (
      <div class="flow-chart-container">
        <div class="top-bar">
          <div class="title">流程图 Exaple</div>
          <el-button type="primary" plain onClick={() => this.handleSave()} >
            保存到本地
          </el-button>
        </div>
        <Bpmn ref="bpmnRef" />
      </div>
    )
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
