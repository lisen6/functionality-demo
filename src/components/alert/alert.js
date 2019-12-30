import Alert from './alert.vue'

const MESSAGE = {
  duration: 3000, // 显示的时间 ms
  animateTime: 300, // 动画时间,表示这个组件切换show的动画时间
  install(Vue) {
    function msg(type, text, callBack) {
      let msg
      let duration = MESSAGE.duration
      if (typeof text === 'string') {
        msg = text
      } else if (text instanceof Object) {
        msg = text.text || ''
        if (text.duration) {
          duration = text.duration
        }
      }

      const VueMessage = Vue.extend({
        data() {
          return {
            show: false
          }
        }, // 创建一个构造器
        render(h) {
          const props = {
            type,
            text: msg,
            show: this.show
          }
          return h(Alert, { props })
        }
      })

      const newMessage = new VueMessage()
      let vm = newMessage.$mount() // $mount 方法对组件进行了手动渲染

      const el = vm.$el
      document.body.appendChild(el)

      vm.show = true

      const t1 = setTimeout(() => {
        clearTimeout(t1)
        vm.show = false // 隐藏提示组件，此时会有300ms的动画效果，等动画效果过了再从body中移除dom

        const t2 = setTimeout(() => {
          clearTimeout(t2)
          document.body.removeChild(el) // 从body中移除dom
          newMessage.$destroy()
          vm = null // 设置为null，好让js垃圾回收算法回收，释放内存

          callBack && (typeof callBack === 'function') && callBack()
        }, MESSAGE.animateTime)
      }, duration)
    }

    Vue.prototype.$message = {
      info(text, callBack) {
        if (!text) return
        msg('info', text, callBack)
      },
      success(text, callBack) {
        if (!text) return
        msg('success', text, callBack)
      },
      error(text, callBack) {
        if (!text) return
        msg('error', text, callBack)
      },
      warning(text, callBack) {
        if (!text) return
        msg('warning', text, callBack)
      }
    }
  }
}

export default MESSAGE
