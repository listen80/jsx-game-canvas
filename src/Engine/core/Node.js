import {
  isFunc,
  isPrimitive,
  isArray,
  isUndefined,
  isString,
  isBoolean,
} from "../utils/type";

export function createNode(tag, props, ...children) {
  const $parent = this; // 创建的组件
  const type = typeof tag;
  if (type === "string") {
    return {
      type,
      tag,
      attrs: props ?? {},
      children,
      $parent,
    };
  }

  return {
    type,
    tag,
    props: props ?? {},
    children,
    $parent,
  };
}

function createInstance(next) {
  const $instance = { ...next.tag };
  const $parent = next.$parent;
  const entries = Object.entries($instance);

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

  $instance.props = next.props;

  $instance.onCreate?.();
  next.$instance = $instance;

  renderNode(next);
}

function destoryInstance(pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.$instance.$node);
      pre.$instance.destroy?.();
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
  next.$instance = pre.$instance;
  next.$instance.props = next.props;
  renderNode(next);
}

// const com = new Component({})

function renderNode(next) {
  next.$node = patchNode(next.$node, next.$instance.render());
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
  } else if (typeof next.tag === "object") {
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
