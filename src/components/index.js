import Vue from 'vue'
import csSvgIcon from '@/components/svg-icon'// svg组件

Vue.component('SvgIcon', csSvgIcon)

const req = require.context('../assets/svgs', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
