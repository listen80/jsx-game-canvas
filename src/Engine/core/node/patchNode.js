import { isFunc, isPrimitive, isArray, isUndefined, isString } from '../../utils/common'

function createInstance (next) {
  const Class = next.tag
  next.instance = new Class(next)
  next.instance.$images = next.$parent.$images
  next.instance.$sound = next.$parent.$sound
  next.instance.$data = next.$parent.$data
  next.instance.$font = next.$parent.$font

  next.instance.create && next.instance.create()
  renderNode(next)
}

function destoryInstance (pre) {
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.instance.$node)
      pre.instance.destroy && pre.instance.destroy()
    } else if (isArray(pre)) {
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
  next.instance.props = next.props
  renderNode(next)
}

function renderNode (next) {
  next.instance.$node = patchNode(next.instance.$node, next.instance.render())
}

export function patchNode (pre, next) {
  // undefined null
  // string number
  // array
  // class component
  // div node
  if (isUndefined(next) || isPrimitive(next)) {
    destoryInstance(pre)
  } else if (isArray(next)) {
    if (isArray(pre)) {
      for (let i = 0; i < next.length; i++) {
        // diff array
        patchNode(pre[i], next[i])
      }
    } else {
      destoryInstance(pre)
      for (let i = 0; i < next.length; i++) {
        patchNode(null, next[i])
      }
    }
  } else if (isFunc(next.tag)) {
    if (pre && pre.tag === next.tag && pre.props?.key === next.props?.key) {
      updateInstance(pre, next)
    } else {
      destoryInstance(pre)
      createInstance(next)
    }
  } else if (isString(next.tag)) {
    const preChildren = pre && pre.children
    patchNode(preChildren, next.children)
  }
  return next
}
