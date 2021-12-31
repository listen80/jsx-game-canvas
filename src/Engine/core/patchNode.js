import { isFunc, isPrimitive, isArray, isUndefined } from '../utils/common'

function createInstance (next) {
  const Class = next.tag
  next.instance = new Class(next)
  next.instance.create && next.instance.create()
  renderNode(next)
}

function destoryInstance (pre) {
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.node)
      pre.instance.destroy && pre.instance.destroy()
    } else if (Array.isArray(pre)) {
      while (pre.length) {
        destoryInstance(pre.pop())
      }
    } else {
      destoryInstance(pre.children)
    }
  }
}

function updateInstance (pre, next) {
  next.instance = pre.instance
  if (!next.instance) {
    debugger
    return
  }
  next.node = pre.node
  next.instance.props = next.props
  renderNode(next)
}

function renderNode (next) {
  const instance = next.instance
  next.node = patchNode(next.node, instance.render())
}

export function patchNode (pre, next) {
  if (isPrimitive(next) || isUndefined(next)) {
    destoryInstance(pre)
  } else if (isFunc(next.tag)) {
    if (pre) {
      if (pre.tag === next.tag && pre.props?.key === next.props?.key) {
        updateInstance(pre, next)
      } else {
        destoryInstance(pre)
        createInstance(next)
      }
    } else {
      createInstance(next)
    }
  } else if (isArray(next.children)) {
    const preChildren = pre?.children || []
    const nextChildren = next.children
    // todo diff algorithm
    for (let i = 0; i < next.children.length; i++) {
      patchNode(preChildren[i], nextChildren[i])
    }
  }

  return next
}
