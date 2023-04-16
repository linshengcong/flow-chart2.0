<template>
  <e-popover
    popper-class="view"
    placement="bottom"
    width="200"
    trigger="hover">
    <ul class="po-menu">
      <!-- <li class="po-menu-item" @click="zoom(0.1,false)">
        <div class="po-menu-item-box">
          <svg-icon icon-class="zoomin" class="po-menu-icon" />
          <span class="text">放大</span> 
          <span class="po-menu-hotkey">Alt+(+)</span>
        </div>
      </li>
      <li class="po-menu-item" @click="zoom(-0.1,false)">
        <div class="po-menu-item-box">
          <svg-icon icon-class="zoomout" class="po-menu-icon" />
          <span class="text">缩小</span> 
          <span class="po-menu-hotkey">Alt+(-)</span>
        </div>
      </li> -->
      <li class="po-menu-item" @click="zoomToFit">
        <div class="po-menu-item-box">
          <span class="text">全览</span> 
        </div>
      </li>
      <!-- <li class="po-menu-item" @click="zoomToRect">
        <div class="po-menu-item-box">
          <span class="text">缩放至选区</span> 
        </div>
      </li> -->
      <li class="devider"></li>
      <li
        v-for="item of liData"
        :key="item.value"
        class="po-menu-item"
        :class="{active:liTide===item.value}"
        @click="zoom(item.value)">
        <div class="po-menu-item-box">
          <span class="text">{{ item.label }}</span>
        </div>
      </li>
      <li class="devider"></li>
      <li class="po-menu-item" @click="zoom(1)">
        <div class="po-menu-item-box">
          <span class="text">重置缩放</span>
        </div>
      </li>
    </ul>
    <span slot="reference">
      <el-input-number
        v-model="number"
        :min="25"
        :max="200"
        class="input-number"
        :step="1"
        @change="handleChange" />
    </span>
  </e-popover>
</template>
<script>
import { zoom } from '../common/trigger'
import { Popover as EPopover } from 'element-ui'
export default {
  components: {
    EPopover
  },
  inject: ['getGraph'],
  data() {
    return {
      number: 100, // 缩放 计算公式 zoom/100
      liTide: 1, // 选中值
      liData: [{
        value: 0.25,
        label: '25%'
      }, {
        value: 0.5,
        label: '50%'
      }, {
        value: 0.75,
        label: '75%'
      }, {
        value: 1,
        label: '100%'
      }, {
        value: 1.5,
        label: '150%'
      }, {
        value: 2,
        label: '200%'
      }]
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getGraph().on('scale', ({ sx }) => { 
        this.number = parseInt(sx * 100)
        this.liTide = sx
      })
    })
  },
  methods: {
    /**
     * @description: 放大缩小
     * @param {Number} number 放大/缩小的因子
     * @param {Boolean} absolute 为 true 时，表示将画布缩放到 factor 代表的值,否则 factor 表示放大/缩小的因子
     * @return {void}
     */    
    zoom(number, absolute = true) {
      const graph = this.getGraph()
      zoom(number, absolute, graph)
    },
    /**
     * @description: 绑定值被改变时触发
     * @param {Number} value
     */
    handleChange(value, absolute = true) {
      const number = value / 100
      const graph = this.getGraph()
      zoom(number, absolute, graph)
    },
    // 缩放和平移画布，使 rect 表示的矩形区域（相对于画布坐标）充满视口。
    zoomToRect(){
      const ele = document.querySelector('.x6-widget-selection-inner')
      if (ele) {
        const { top, left, width, height } = ele.style
        const graph = this.getGraph()
        graph.zoomToRect({
          x: parseInt(left),
          y: parseInt(top),
          width: parseInt(width),
          height: parseInt(height)
        }, {
          minScale: 0.25,
          maxScale: 2
        })
      } else {
        console.log(1)
      }
    },
    // 缩放画布内容，使画布内容充满视口
    zoomToFit(){
      const graph = this.getGraph()
      graph.zoomToFit({
        minScale: 0.25,
        maxScale: 2
      })
    }
  }
}
</script>
<style lang="scss" scoped>
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
    padding: 0 4px;
    position: relative;
    margin-bottom: 2px;
    &.active::after{
      content: '\e6da';
      font-family: element-icons!important;
      position: absolute;
      top: 50%;
      right: 22px;
      transform: translateY(-50%);
      font-size: 18px;
      color: #1E86FF;
    }
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
    }
  }
}
.input-number::v-deep{
  margin: 0 4px;
  width: 120px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #eef0f2;
  border-radius: 8px;
  .el-input-number__increase,.el-input-number__decrease{
    background: #ffffff;
    &.is-disabled{
      background: #ffffff;
    }
  }
}
</style>