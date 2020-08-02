import Alert from '../Alert/alert.vue'
const components = {
  Alert
}

// 注册全局组件
const plugins = {
  install(Vue) {
    Object.keys(components).forEach(key =>
      Vue.component(`${key}`, components[key])
    )
  }
}

export default plugins
