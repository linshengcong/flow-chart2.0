import Vue from 'vue'
import App from './App.vue'
import VueDND from 'awe-dnd'
import './components'
import ElementUi from 'element-ui'

Vue
  .use(ElementUi, {
    size: 'medium'
  })
  .use(VueDND)

new Vue({
  render: h => h(App)
}).$mount('#vue')
