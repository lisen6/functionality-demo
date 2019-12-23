// 自行实现 dispatch 和 broadcast 方法
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if(name === componentName) {
      child.$emit.apply(child, [eventName, params])
    } else {
      broadcast.call(child, componentName, eventName, params)
    }
  })
}

export default {
  name: 'emitter',
  methods: {
    // 向上派发
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while(parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if(parent) {
          name = parent.$options.name;
        }
      }
      if(parent) {
        parent.$emit.apply(parent, [eventName, params])
      }
    },
    // 向下派发
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
}