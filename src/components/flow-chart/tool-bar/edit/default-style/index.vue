<script lang="jsx">
export default {
  name: 'DefaultStyle',
  inject: ['handleResetStyle', 'handleSetDefaultStyle'],
  props: {
    editMenuVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      disabled: false,
      subMenuVisible: false
    }
  },
  methods: {
    setDefaultStyle() {
      const selected = window.graph.getSelectedCells()
      if (!selected.length) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      if (this.disabled) return this.$message.warning('请先选中节点')
      this.$emit('update:editMenuVisible', false)
      this.handleSetDefaultStyle()
      this.$message.success('默认样式已设置成功')
    },
    resetStyle() {
      const selected = window.graph.getSelectedCells()
      if (!selected.length) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      if (this.disabled) return this.$message.warning('请先选中节点')
      this.$emit('update:editMenuVisible', false)
      this.handleResetStyle()
      this.$message.success('默认样式已清除成功')
    }
  },
  render() {
    return (
      <ul class="po-menu">
        <li class="po-menu-item">
          <div class={['po-menu-item-box']}>
            <svg-icon icon-class="cooperation" class="po-menu-icon" onClick={() => this.setDefaultStyle()} />
            <span class="text" onClick={() => this.setDefaultStyle()}>默认样式</span>
            <div class="po-menu-hotkey" onClick={() => this.resetStyle()}>
          清除样式
            </div>
          </div>
        </li>
      </ul>
    )
  }
}
</script>

<style lang="scss" scoped>

.disabled {
  cursor: not-allowed;
  color: #d4d6d7;
}
.po-menu {
  background: #fff;
  border: #e9edf2;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  padding-top: 4px;
  padding-bottom: 2px;
  color: #212930;
  font-size: 14px;
  margin: -12px;

  .devider{
    height: 0;
    border-top: 1px solid #e9edf2;
    margin: 4px;
  }

  &-item{
    width: 198px;
    box-sizing: border-box;
    padding: 0 4px;
    position: relative;
    margin-bottom: 2px;

    &-box{
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      cursor: pointer;
      padding-left: 36px;
      padding-right: 8px;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &:hover{
        background-color: #f3f5f9;
      }
      .po-menu-icon{
        position: absolute;
        left: 8px;
        width: 18px;
        height: 18px;
      }
     .po-menu-hotkey {
        padding-left: 32px;
        color: #a6b9cd;
        font-size: 12px;
      }
      .po-menu-right-icon {
        position: absolute;
        right: 8px;
        width: 18px;
        height: 18px;
      }
    }
  }

  &-sub-item {
    background: #fff;
    border: #e9edf2;
    box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
    border-radius: 4px;
    padding-top: 4px;
    padding-bottom: 2px;
    color: #212930;
    font-size: 14px;
    margin: -12px;
  
    position: absolute;
    top: 12px;
    left: 210px;
    width: 198px;
    box-sizing: border-box;
    padding: 0 4px;
    margin-bottom: 2px;
    &-box{
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      cursor: pointer;
      padding-left: 36px;
      padding-right: 8px;
      white-space: nowrap;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      &:hover{
        background-color: #f3f5f9;
      }
      .po-menu-icon{
        position: absolute;
        left: 8px;
        width: 18px;
        height: 18px;
      }
     .po-menu-hotkey {
        padding-left: 32px;
        color: #a6b9cd;
        font-size: 12px;
      }
      .po-menu-right-icon {
        position: absolute;
        right: 8px;
        width: 18px;
        height: 18px;
      }
    }
  }
}
</style>
