<template>
  <!-- 搜索 -->
  <div class="icon">
    <span
      v-show="!freeze"
      class="icon"
      @click="handleSearchHover">
      <svg-icon
        :class="{ light: showTips }"
        style="width:16px;height:16px;cursor:pointer"
        icon-class="b_search"
        title="提示" />
    </span>
    <transition name="fade">
      <!-- 文案提示容器 -->
      <div
        v-show="showSearch"
        class="search-container"
        @mouseleave="handleSearchLeave">
        <div>
          <el-autocomplete
            ref="myAutocomplete"
            v-model="keyword"
            popper-class="my-autocomplete"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
            <template slot-scope="{ item }">
              <div class="name">
                {{ item.data.name }}
              </div>
            </template>
          </el-autocomplete>
        </div>  
      </div>
    </transition>
  </div>
</template>

<script>
import searchNode from '../event/search'
export default {
  inject: ['getGraph'],
  data() {
    return {
      freeze: false,
      timeId: null,
      showTips: false,
      keyword: '',
      showSearch: false,
      searchNode: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.searchNode = new searchNode(this.getGraph())
    })
  },
  methods: {
    // 点击显示搜索框
    handleSearchHover() {
      this.showSearch = !this.showSearch 
      clearTimeout(this.timeId)
    },
    // 离开隐藏搜索框
    handleSearchLeave(delay = 500) {
      this.timeId = setTimeout(() => {
        this.showSearch = false
        this.timeId = null
      }, delay)
    },
    // 搜索节点点击
    handleSelect(item) {
      this.searchNode.positionNode(item.data.name)
      this.showSearch = false
    },
    // 查询节点列表
    querySearch(queryString, cb) {
      this.searchNode.querySearch(queryString, cb)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-container {
    position: absolute;
    top: 45px;
    right: 160px;
    z-index: 999;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    background-color: #fff;
  }
</style>