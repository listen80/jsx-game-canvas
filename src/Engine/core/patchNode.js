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
      pre.instance.destory && pre.instance.destory()
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
  next.node = pre.node
  next.instance.props = next.props
  renderNode(next)
}

function renderNode (next) {
  const instance = next.instance
  next.node = patchNode(next.node, instance.render())
}

export function patchNodeBak (pre, next) {
  if (isPrimitive(next) || isUndefined(pre)) {
    destoryInstance(pre)
  } else if (this) {
    //
  }
}

export function patchNode (pre, next) {
  if (pre) {
    if (next) {
      if (isFunc(next.tag)) {
        if (pre.tag === next.tag && (pre.props?.key === next.props?.key)) {
          updateInstance(pre, next)
        } else {
          destoryInstance(pre)
          createInstance(next)
        }
      }
    } else {
      destoryInstance(pre)
    }
  } else {
    if (next) {
      if (isFunc(next.tag)) {
        createInstance(next)
      }
    }
  }

  const preChildren = (pre || {}).children || []
  const nextChildren = (next || {}).children || []
  const length = Math.max(preChildren.length, nextChildren.length)
  for (let i = 0; i < length; i++) {
    patchNode(preChildren[i], nextChildren[i])
  }

  return next
}
