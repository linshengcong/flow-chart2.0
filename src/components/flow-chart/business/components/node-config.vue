<template>
  <div class="edgeConfig">
    <div class="desc">
      <div class="txt">
        节点:
      </div>
      <el-input v-model="name" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EdgeConfig',
  props: {
    nodeName: {
      type: String,
      default: ''
    }
  },
  computed: {
    name: {
      get() {
        return this.nodeName
      },
      set(value) {
        this.$emit('update:nodeName', value)
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
