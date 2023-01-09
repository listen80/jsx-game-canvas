import {
  isFunc,
  isPrimitive,
  isArray,
  isUndefined,
  isString,
  isBoolean,
} from "../utils/type";


export function createNode(tag, props = {}, ...children) {
  const $parent = this; // 创建的组件
  
  return {
    tag,
    props,
    children,
    $parent,
  };
}

function createInstance(next) {
  const Class = next.tag;
  next.$context = new Class(next);

  next.$context.$config = next.$parent.$config;
  next.$context.$state = next.$parent.$state;
  next.$context.$loader = next.$parent.$loader;
  next.$context.$event = next.$parent.$event;
  next.$context.$sound = next.$parent.$sound;

  next.$context.onCreate?.();
  renderNode(next);
}

function destoryInstance(pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.$context.$node);
      pre.$context.destroy?.();
    } else if (isArray(pre)) {
      while (pre.length) {
        destoryInstance(pre.pop());
      }
    } else {
      destoryInstance(pre.children);
    }
  }
}

function updateInstance(pre, next) {
  next.$context = pre.$context;
  next.$context.props = next.props;
  renderNode(next);
}

function renderNode(next) {
  next.$context.$node = patchNode(next.$context.$node, next.$context.render());
}

export function patchNode(pre, next) {
  // undefined null
  // string number
  // array
  // class component
  // div node
  if (isUndefined(next) || isPrimitive(next) || isBoolean(next)) {
    destoryInstance(pre);
  } else if (isArray(next)) {
    if (isArray(pre)) {
      for (let i = 0; i < next.length; i++) {
        // diff array
        patchNode(pre[i], next[i]);
      }
    } else {
      destoryInstance(pre);
      for (let i = 0; i < next.length; i++) {
        patchNode(null, next[i]);
      }
    }
  } else if (isFunc(next.tag)) {
    if (pre && pre.tag === next.tag && pre.props?.key === next.props?.key) {
      updateInstance(pre, next);
    } else {
      destoryInstance(pre);
      createInstance(next);
    }
  } else if (isString(next.tag)) {
    const preChildren = pre && pre.children;
    patchNode(preChildren, next.children);
  }
  return next;
}
