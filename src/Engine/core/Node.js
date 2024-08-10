import {
  isFunc,
  isPrimitive,
  isArray,
  isUndefined,
  isString,
  isBoolean,
  isObject,
} from "../utils/type";

export function createNode(createtor, props, ...children) {
  const $parent = this; // 创建的组件
  // class component
  // div node
  let type = typeof createtor;
  if (type === "function") {
    // <></>
    type = "string";
  }
  return {
    type: type,
    createtor,
    props,
    children,
    $parent,
  };
}

function createInstance(next) {
  // debugger;
  const $instance = Object.create(null);
  const $parent = next.$parent;
  const entries = Object.entries(next.createtor);

  entries.forEach(([key, value]) => {
    if (value.bind) {
      $instance[key] = value.bind($instance);
    }
  });

  $instance.$createElement = createNode;

  $instance.$config = $parent.$config;
  $instance.$state = $parent.$state;
  $instance.$loader = $parent.$loader;
  $instance.$event = $parent.$event;
  $instance.$sound = $parent.$sound;
  $instance.$render = $parent.$render;

  $instance.props = next.props;
  $instance.$children = next.children;

  $instance.onCreate?.();

  // createNode上面生成实例
  next.$instance = $instance;
  next.$node = null;

  renderNode(next);
}

function destoryInstance(pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre) && !isBoolean(pre)) {
    if (isObject(pre.createtor)) {
      // 组件
      destoryInstance(pre.$instance.$node);
      pre.$instance.onDestroy?.();
    } else if (isArray(pre)) {
      while (pre.length) {
        destoryInstance(pre.pop());
      }
    } else if (isString(pre.createtor)) {
      // div
      destoryInstance(pre.children);
    }
  }
}

// next
// { createtor, children, }
// createNode上面更新实例

function updateInstance(pre, next) {
  next.$instance = pre.$instance;
  next.$node = pre.$node;
  next.$instance.props = next.props;
  // pre.props = next.props;
  // pre.$instance.props = next.props;
  renderNode(next);
}

function renderNode(next) {
  const $node = next.$instance.render?.();
  next.$node = patchNode(next.$node, $node);
}

export function patchNode(preNode, nextNode) {
  // console.log("-----", preNode, nextNode);
  // undefined null
  // string number
  // array
  // class component
  // div node
  // if (nextNode.createtor !== preNode.createtor) {
  //   return;
  // }

  // debugger

  if (isUndefined(nextNode) || isPrimitive(nextNode) || isBoolean(nextNode)) {
    destoryInstance(preNode);
  } else if (isArray(nextNode)) {
    if (isArray(preNode)) {
      for (let i = 0; i < nextNode.length; i++) {
        // diff array
        patchNode(preNode[i], nextNode[i]);
      }
    } else {
      destoryInstance(preNode);
      for (let i = 0; i < nextNode.length; i++) {
        patchNode(null, nextNode[i]);
      }
    }
  } else if (isObject(nextNode.createtor)) {
    if (
      preNode &&
      preNode.createtor === nextNode.createtor &&
      preNode.props?.key === nextNode.props?.key
    ) {
      updateInstance(preNode, nextNode);
    } else {
      destoryInstance(preNode);
      createInstance(nextNode);
    }
  } else if (isString(nextNode.createtor)) {
    if (isString(preNode?.createtor)) {
      patchNode(preNode?.children, nextNode.children);
    } else {
      destoryInstance(preNode);
      patchNode(null, nextNode.children);
    }
  }
  return nextNode;
}
