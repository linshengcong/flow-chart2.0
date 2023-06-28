<template>
  <div class="edgeConfig">
    <div class="desc">
      <div class="txt">
        描述:
      </div>
      <el-input v-model="edgeName" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EdgeConfig',
  props: {
    label: {
      type: String,
      default: ''
    },
    edgeInstance: {
      default: () => null
    }
  },
  computed: {
    edgeName: {
      get() {
        return this.label
      },
      set(value) {
        this.$emit('modifyEdgeName', { edge: this.edgeInstance, label: value })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edgeConfig::v-deep{
  width: 360px;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 10px;
  .desc {
    display: flex;
    align-items: center;
    .txt {
      width: 40px;
    }
  }
}
</style>
