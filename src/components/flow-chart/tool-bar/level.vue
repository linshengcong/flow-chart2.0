<template>
  <el-dropdown @command="commandChange">
    <span class="el-dropdown-link">
      图层排列<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="topping">
        置于顶层
      </el-dropdown-item>
      <el-dropdown-item command="bottoming">
        置于底层
      </el-dropdown-item>
      <el-dropdown-item command="up">
        上移一层
      </el-dropdown-item>
      <el-dropdown-item command="down">
        下移一层
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { setLevel } from '../event/level'
export default {
  inject: ['getGraph'],
  methods: {
    /**
     * @name: commandChange
     * @description: 设置层级
     * @param {*} val topping 置顶 bottoming 置底 up 上移一层 down 下移一层
     * @return {*}
     */
    commandChange(val) {
      setLevel(this.getGraph(), val)
    }
  }
}
</script>

<style>

</style>