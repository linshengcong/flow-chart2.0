import drag from './drag'
// 公共指令
const directives = {}

directives.install = (Vue) => {
  drag.install(Vue)
  // 数字指令
  Vue.directive('number', (el) => {
    el.onkeypress = (event) => {
      if (!/[\d]/.test(String.fromCharCode(event.keyCode))) {
        return event.preventDefault()
      }
    }
  })
  // 正数字指令
  Vue.directive('isnumber', (el) => {
    el.onkeypress = (event) => {
      if (!/^(0*?[1-9][0-9]*)/.test(String.fromCharCode(event.keyCode))) {
        return event.preventDefault()
      }
    }
  })
  // 输入两位小数的数值
  Vue.directive('number2', (el, binding, vnode) => {
    el.oninput = (event) => {
      if (!/^\d+(\.\d{0,2})?$/.test(event.target.value)) {
        const str = event.target.value.slice(0, -1)
        vnode.child.$emit('input', str)
      }
    }
  })
  // 输入两位小数的数值
  Vue.directive('limit', (el, binding, vnode) => {
    const obj = {
      '1': /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, // 中英文数字
      '2': /^[xX0-9]+$/, // 身份证
      '3': /^(\d+)$/, // 数字
      '4': /^\d+(\.\d{0,2})?$/ // 带小数正数
    }
    const expr = obj[binding.expression] || '1'
    el.oninput = (event) => {
      if (!expr.test(event.target.value)) {
        const str = event.target.value.slice(0, -1)
        vnode.child.$emit('input', str)
      }
    }
  })
  // 按钮权限校验指令
  Vue.directive('permission', {
    inserted: (el, binding) => {
      const { value } = binding
      if (process.env.VUE_APP_CHECK_PERMISSION.bool() && !value) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    },
    update: (el, binding) => {
      const { value } = binding
      if (process.env.VUE_APP_CHECK_PERMISSION.bool() && !value) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}

export { directives }
