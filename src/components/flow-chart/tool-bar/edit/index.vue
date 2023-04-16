<script lang="jsx">
import FormatBrush from './format-brush/index.vue'
import DefaultStyle from './default-style/index.vue'

export default {
  name: 'EditBar',
  components: {
    FormatBrush,
    DefaultStyle
  },
  data() {
    return {
      editMenuVisible: false
    }
  },
  render() {
    return (
      <el-popover
        v-model={this.editMenuVisible}
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <FormatBrush on={{ 'update:editMenuVisible': boolean => this.editMenuVisible = boolean }} editMenuVisible={this.editMenuVisible} />
        <DefaultStyle on={{ 'update:editMenuVisible': boolean => this.editMenuVisible = boolean }} editMenuVisible={this.editMenuVisible} />
        <span slot="reference">编辑</span>
      </el-popover>
    )
  }
}
</script>
