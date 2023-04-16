<!-- TODO 菜单抽像成无限层级, start 激活菜单, 功能根据config 配置 -->
<script lang="jsx">
import SubMenu from './subMenu'

export default {
  name: 'ContextMenu',
  inject: ['handleMenuClick'],
  props: {
    contextMenuItem: {
      type: Object,
      default: () => {
        return {
          x: 0,
          y: 0,
          zIndex: 100,
          content: {}
        }
      }
    }
  },
  data() {
    return {
      subMenuExportVisible: false,
      subMenuMatchVisible: false,
      style: {
        width: 0,
        height: 0
      }
    }
  },
  mounted() {
    const menuDOM = document.querySelector('.context-menu')
    const width = window.getComputedStyle(menuDOM).width
    const height = window.getComputedStyle(menuDOM).height
    this.style = {
      width: Number(width.replace('px', '')),
      height: Number(height.replace('px', ''))
    }
    console.log('style', this.style)
  },
  methods: {
    handleRadioVisible(type) {
      const menuVisibleList = ['subMenuExportVisible', 'subMenuMatchVisible']
      menuVisibleList.forEach(el => {
        if (el === type) this[el] = !this[el]
        else this[el] = false
      })
    }
  },
  render() {
    return (
      <div
        class="context-menu"
        style={{
          left: this.contextMenuItem.x - 78 + 'px', 
          top: this.contextMenuItem.y - 164 + 'px', 
          'z-index': this.contextMenuItem.zIndex
        }}
      >
        {
          this.contextMenuItem.content.type === 'edge' ?
            <div
              class="item"
              vOn:click_stop={() => this.handleMenuClick('remove', this.contextMenuItem.content)}>
                    删除
            </div>
            :
            <div>
              <div
                class="item"
                vOn:click_stop={() => this.handleMenuClick('copy', this.contextMenuItem.content)}>
                    复制
              </div>
              <div
                class="item"
                vOn:click_stop={() => this.handleMenuClick('remove', this.contextMenuItem.content)}>
                    删除
              </div>
              <div class="horizontal-line" ></div>
              <div
                class="item"
                vOn:click_stop={() => this.handleMenuClick('selectAll', this.contextMenuItem.content)}>
                    全选
              </div>
              <div
                class="item"
                vOn:click_stop={() => this.handleMenuClick('lock', this.contextMenuItem.content)}>
                    锁定
              </div>
              <div
                class="item"
                vOn:click_stop={() => this.handleMenuClick('unlock', this.contextMenuItem.content)}>
                    解锁
              </div>
              <div
                class="item"
                vOn:click_stop={() => this.handleRadioVisible('subMenuMatchVisible')}>
                    匹配
                <svg-icon icon-class="arrow_right" />
              </div>
              <div class="horizontal-line" ></div>
              <div
                class="item" 
                vOn:click_stop={() => this.handleRadioVisible('subMenuExportVisible')}
              >
                    导出
                <svg-icon icon-class="arrow_right" />
              </div>
            </div>
        }
        <SubMenu
          subMenuVisible={this.subMenuExportVisible}
          on={{ 'update:subMenuVisible': visible => this.subMenuExportVisible = visible }}
          contextMenuItem={{
            ...this.contextMenuItem,
            x: this.style.width,
            y: this.style.height - 57
          }}
          subMenuOptions={[{ label: 'PNG' }, { label: 'JPEG' }]}
          action="export"
        />
        <SubMenu
          subMenuVisible={this.subMenuMatchVisible}
          on={{ 'update:subMenuVisible': visible => this.subMenuMatchVisible = visible }}
          contextMenuItem={{
            ...this.contextMenuItem,
            x: this.style.width,
            y: this.style.height - 57 - 134
          }}
          subMenuOptions={[{ label: '宽度匹配', type: 'width' }, { label: '高度匹配', type: 'height' }, { label: '宽高匹配', type: 'widthAndHeight' }]}
          action="match"
        />
      </div>
    )
  }
}
</script>


<style lang="scss" scoped>
@import "~@/components/flow-chart/components/context-menu/style.scss";
</style>
