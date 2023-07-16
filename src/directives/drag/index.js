import drag from './drag'

const install = function(Vue) {
  Vue.directive('drag', drag)
}

if (window.Vue) {
  window['drag'] = drag
  Vue.use(install); // eslint-disable-line
}

drag.install = install
export default drag
