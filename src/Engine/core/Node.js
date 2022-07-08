import {
  isFunc,
  isPrimitive,
  isArray,
  isUndefined,
  isString,
  isBoolean,
} from "../utils/common";

const componentsMap = Object.create(null)

export const registryComponents = (map) => {
  Object.entries(map).forEach(([key, value]) => {
    componentsMap[key] = value
  })
}


export function createNode(tag, props = {}, ...children) {
  const $parent = this;
  tag = componentsMap[tag] || tag
  if (props?.hidden) {
    return null
  }

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

  next.$context.$state = next.$parent.$state;
  next.$context.$hook = next.$parent.$hook;

  // next.$context.$parent = next.$parent;
  next.$context.onCreate && next.$context.onCreate();
  renderNode(next);
}

function destoryInstance(pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.$context.$node);
      pre.$context.destroy && pre.$context.onDestroy();
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
