<script lang="jsx">
export default {
  name: 'SubMenu',
  inject: ['handleMenuClick'],
  props: {
    subMenuVisible: {
      type: Boolean,
      default: false
    },
    // 子菜单的选项
    subMenuOptions: {
      type: Array,
      default: () => []
    },
    // 子菜单的坐标, 扩展信息放在content
    contextMenuItem: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
          zIndex: 100
        }
      }
    },
    action: {
      type: String,
      required: true
    }
  },
  render() {
    return (
      this.subMenuVisible && <div
        class="sub-menu"
        style={{ 
          left: this.contextMenuItem.x + 'px',
          top: this.contextMenuItem.y + 'px', 
          'z-index': this.contextMenuItem.zIndex
        }}
      >
        {
          this.subMenuOptions.map(item => {
            return (
              <div
                class="item"
                vOn:click_stop={() => this.handleMenuClick(this.action, item)}>
                {item.label}
              </div>
            )
          })
        }
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
@import "~@/components/flow-chart/components/context-menu/style.scss";
.sub-menu {
  @extend .context-menu
}
</style>
