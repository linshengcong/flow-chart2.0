<script lang="jsx">
import { exportChartType, exportChart } from '../../../event/export.js'
export default {
  name: 'ExportChart',
  inject: ['getGraph'],
  data() {
    return {
      exportChartType,
      subMenuVisible: false,
      exportVisible: false
    }
  },
  methods: {
    hanleExport(type) {
      this.exportVisible = false
      this.subMenuVisible = false
      exportChart(this.getGraph(), type)
      this.$message.success('图片导出成功')
    },
    handleClick() {
      this.subMenuVisible = !this.subMenuVisible
    }
  },
  render() {
    return (
      <el-popover
        v-model={this.exportVisible}
        placement="bottom"
        width="200"
        trigger="hover">
        <ul class="po-menu">
          <li class="po-menu-item" onClick={() => this.handleClick()}>
            <div class="po-menu-item-box">
              <svg-icon icon-class="file_download" class="po-menu-icon" />
              <span class="text">导出为</span> 
              <svg-icon icon-class="arrow_right" class="po-menu-right-icon" />
            </div>
          </li>
          {
            this.subMenuVisible && <li class="po-menu-sub-item">
              {
                Object.keys(exportChartType).map(type => {
                  return (
                    <div class="po-menu-sub-item-box" onClick={() => this.hanleExport(type)}>
                      <i class="el-icon-picture-outline po-menu-icon"></i>
                      <span class="text">{type}</span> 
                    </div>
                  )
                })
              }
            </li>
          }
        </ul>
        <span slot="reference">
              文件
        </span>
      </el-popover>
    )
  }
}
</script>
<style lang="scss" scoped>
.exportChart {
  display: flex;
}
.po-menu{
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