import {
  isFunc,
  isPrimitive,
  isArray,
  isUndefined,
  isString,
  isBoolean,
} from '../utils/type'

export function createNode (tag, props, ...children) {
  const $parent = this // 创建的组件
  return {
    type: typeof tag,
    tag,
    props: props ?? {},
    children,
    $parent,
  }
}

function createInstance (next) {
  const $instance = Object.create(null)
  const $parent = next.$parent
  const entries = Object.entries(next.tag)

  entries.forEach(([key, value]) => {
    if (value.bind) {
      $instance[key] = value.bind($instance)
    }
  })

  $instance.$createElement = createNode

  $instance.$config = $parent.$config
  $instance.$state = $parent.$state
  $instance.$loader = $parent.$loader
  $instance.$event = $parent.$event
  $instance.$sound = $parent.$sound
  $instance.$render = $parent.$render

  $instance.props = next.props
  $instance.$children = next.children

  $instance.onCreate?.()

  // createNode上面生成实例
  next.$instance = $instance
  next.$node = null

  renderNode(next)
}

function destoryInstance (pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.$instance.$node)
      pre.$instance.destroy?.()
    } else if (isArray(pre)) {
      while (pre.length) {
        destoryInstance(pre.pop())
      }
    } else {
      destoryInstance(pre.children)
    }
  }
}

// next
// { tag, children, }
// createNode上面更新实例

function updateInstance (pre, next) {
  next.$instance = pre.$instance
  next.$node = pre.$node
  next.$instance.props = next.props
  // pre.props = next.props;
  // pre.$instance.props = next.props;
  renderNode(next)
}

function renderNode (next) {
  const $node = next.$instance.render()
  next.$node = patchNode(next.$node, $node)
}

export function patchNode (preNode, nextNode) {
  // undefined null
  // string number
  // array
  // class component
  // div node

  if (isUndefined(nextNode) || isPrimitive(nextNode) || isBoolean(nextNode)) {
    destoryInstance(preNode)
  } else if (isArray(nextNode)) {
    if (isArray(preNode)) {
      for (let i = 0; i < nextNode.length; i++) {
        // diff array
        patchNode(preNode[i], nextNode[i])
      }
    } else {
      destoryInstance(preNode)
      for (let i = 0; i < nextNode.length; i++) {
        patchNode(null, nextNode[i])
      }
    }
  } else if (typeof nextNode.tag === 'object') {
    if (
      preNode &&
      preNode.tag === nextNode.tag &&
      preNode.props?.key === nextNode.props?.key
    ) {
      updateInstance(preNode, nextNode)
    } else {
      destoryInstance(preNode)
      createInstance(nextNode)
    }
  } else if (isString(nextNode.tag)) {
    const preNodeChildren = preNode && preNode.children
    patchNode(preNodeChildren, nextNode.children)
  }
  return nextNode
}
