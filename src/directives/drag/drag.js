export default {
  bind(el) {
    const oDiv = el // 当前元素
    // 禁止选择网页上的文字
    oDiv.onselectstart = function(e) {
      if (e.target.className !== 'el-input__inner') {
        return false
      }
    }
    oDiv.onmousedown = function(e) {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft
      const disY = e.clientY - oDiv.offsetTop
      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY
        // 移动当前元素
        oDiv.style.left = l + 'px'
        oDiv.style.top = t + 'px'
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
      // return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
      if (e.target.className !== 'el-input__inner') {
        return false
      }
    }
  }
}
