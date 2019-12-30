
// 向上找到最近的指定组件——findComponentUpward
function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || !componentName.includes(name))) {
    parent = parent.$parent
    if (parent) {
      name = parent.$options.name
    }
  }
  return parent
}

// 向上找到所有的指定组件——findComponentUpward
function findComponentsUpward(context, componentName) {
  const parent = context.$parent
  const name = parent.$options.name

  const parents = []

  if (parent) {
    if (name === componentName) parents.push(parent)
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

// 向下找到最近的指定组件——findComponentDownward
function findComponentDownward(context, componentName) {
  const childrens = context.$children
  let children = []

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name
      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) {
          break
        }
      }
    }
  }
  return children
}

// 向下找到所有的指定组件——findComponentsDownward
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}

// 找到指定组件的兄弟组件——findBrothersComponents
function findBrothersComponents(context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })

  const index = res.findIndex(item => {
    return item._uid === context._uid
  })

  if (exceptMe) {
    res.splice(index, 1)
  }
  return res
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents
}
