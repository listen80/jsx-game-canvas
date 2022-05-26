function checkFont(name, size = 16) {
  return document.fonts.check(`${size}px ${name}`);
}
const fontsIos = ['娃娃体-简', '兰亭黑-简', '凌慧体-简', '翩翩体-简', '魏碑体-简', '雅痞体-简', '苹方-简', '楷体-简', '黑体-简', '宋体-简'];
const fontsMS = ['楷体', '仿宋', '微软雅黑', '黑体', '宋体'];
const fontsAndroid = ['Roboto', 'Noto Sans', 'Droid'];
const fontFamily = [...fontsMS, ...fontsIos, ...fontsAndroid].find(checkFont);
const baseStyle = {
  direction: 'ltr',
  fillStyle: '#fff',
  // filter: 'grayscale(.9)',
  // filter: 'none',
  font: '16px ' + fontFamily,
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  // imageSmoothingEnabled: true,
  // imageSmoothingQuality: 'low',
  imageSmoothingEnabled: false,
  lineCap: 'butt',
  lineDashOffset: 0,
  lineJoin: 'miter',
  lineWidth: 1,
  miterLimit: 10,
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  strokeStyle: 'white',
  textAlign: 'start',
  // textBaseline: "alphabetic",
  textBaseline: 'top'
};

const isPrimitive = value => {
  const type = typeof value;
  return type === 'string' || type === 'number';
};
const isFunc = f => typeof f === 'function';
const isArray = a => Array.isArray(a);
const isUndefined = o => o === undefined || o === null;
const isString = o => typeof o === 'string';
const isBoolean = o => typeof o === 'boolean';

const mouseEvents = ["ContextMenu", "Click", "Wheel", "MouseDown", "MouseUp", "MouseMove"];
const keyEvents = ["KeyDown", "KeyUp"];
const size = 32;
class Render {
  constructor($state) {
    this.initCanvas();
    this.bindEvents();
    this.$state = $state; // this.$images = game.$images
  }

  getImage(src) {
    const image = this.$state.image[src];
    return image;
  }

  initCanvas(screen = {}) {
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    const {
      el,
      width = size * (13 + 5),
      height = size * 13
    } = screen;
    this.screen = screen;
    this.canvas.width = width;
    this.canvas.height = height;
    const dom = document.querySelector(el) || document.body;
    dom && dom.appendChild(this.canvas);
    this.mergeStyle(baseStyle);
    window.addEventListener("onresize", this.getCanvasRenderRect);
    this.getCanvasRenderRect();
  }

  getCanvasRenderRect() {
    const canvas = this.canvas;
    this.canvas.$offsetWidth = canvas.offsetWidth;
    this.canvas.$offsetHeight = canvas.offsetHeight;
  }

  restoreEvents() {
    // mosue
    this.mouseEventsCollectionKeyframe = []; // key

    this.keyEventsCollectionKeyframe = [];
  }

  bindEvents() {
    this.restoreEvents();
    const canvas = this.canvas;
    const {
      $offsetWidth,
      $offsetHeight,
      width,
      height
    } = canvas;
    mouseEvents.forEach(name => {
      this.canvas.addEventListener(name.toLowerCase(), e => {
        e.name = `on${name}`;
        e.canvasX = e.offsetX / $offsetWidth * width;
        e.canvasY = e.offsetY / $offsetHeight * height;
        e.gameX = e.canvasX / size | 0;
        e.gameY = e.canvasY / size | 0;
        this.mouseEventsCollectionKeyframe.push(e);
        e.preventDefault();
      }, {
        passive: false
      });
    });
    keyEvents.forEach(name => {
      document.addEventListener(name.toLowerCase(), e => {
        e.name = `on${name}`;
        e.$key = this.$state.config.control[e.code];
        this.keyEventsCollectionKeyframe.push(e);
      });
    });
  }

  runEvents() {
    this.mouseEventsCollectionKeyframe.forEach(event => {
      const {
        $node,
        name
      } = event; // console.log($node)

      if ($node && $node.props[name]) {
        $node.props[name](event, $node);
      }
    });
    this.keyEventsCollectionKeyframe.forEach(event => {
      const {
        $context,
        name
      } = event;
      $context && $context[name] && $context[name](event);
    });
    this.restoreEvents();
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }

  mergeStyle = style => {
    if (style) {
      const {
        fontSize,
        fontFamily,
        font,
        textAlign,
        textBaseline,
        color,
        globalAlpha,
        fillStyle
      } = style;

      if (globalAlpha) {
        this.context.globalAlpha = globalAlpha;
      }

      if (textAlign) {
        this.context.textAlign = textAlign;
      }

      if (textBaseline) {
        this.context.textBaseline = textBaseline;
      }

      if (color || fillStyle) {
        this.context.fillStyle = color || fillStyle;
      }

      if (font) {
        this.context.font = font;
      }

      if (fontSize) {
        this.context.font = this.context.font.replace(/\d+px/, `${fontSize}px`);
      }

      if (fontFamily) {
        this.context.font = this.context.font.replace(/[\u4e00-\u9fa5]+/, fontFamily);
      }
    }
  };

  clearRect() {
    const {
      context,
      canvas
    } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawText(node, offsetX, offsetY, offsetParent) {
    const {
      style,
      text
    } = node;
    const {
      context
    } = this;
    const {
      x = 0,
      y = 0
    } = style;
    context.fillText(text, offsetX + x, offsetY + y);
  }

  drawImage(node, offsetX, offsetY, offsetParent) {
    const {
      props
    } = node;

    if (props) {
      const {
        style = {}
      } = props;

      if (style) {
        const {
          sx = 0,
          sy = 0,
          width = 1,
          height = 1,
          swidth,
          sheight
        } = style;
        const {
          context
        } = this;
        const image = this.getImage(props.src);

        if (!image) ; else context.drawImage(image, sx * size, sy * size, (swidth || width) * size, (sheight || height) * size, offsetX * size, offsetY * size, width * size, height * size);
      }
    }
  }

  getStyle(key, value, offsetParent) {
    if (typeof value === "number") {
      return value;
    }

    if (typeof value === "string") {
      return value * offsetParent.props.style[key];
    }
  }

  drawBack(node, offsetX, offsetY, offsetParent) {
    const {
      context
    } = this;
    const {
      backgroundImage,
      backgroundColor,
      height,
      width
    } = node.props.style; // let width = 0
    // if (typeof _ !== "number") {
    //   width = _ * offsetParent.props.style.width
    //   console.log(this.getStyle('width', width, offsetParent) === width)
    //   debugger
    // } else {
    //   width = _
    // }

    if (backgroundColor) {
      context.save();
      context.beginPath();
      context.rect(offsetX * size, offsetY * size, width * size, height * size);
      context.fillStyle = backgroundColor;
      context.fill();
      context.closePath();
      context.restore();
    }

    if (backgroundImage) {
      context.save();
      context.beginPath();
      context.rect(offsetX * size, offsetY * size, width * size, height * size);
      context.fillStyle = context.createPattern(this.getImage(backgroundImage), "repeat");
      context.fill();
      context.closePath();
      context.restore();
    }
  }

  drawBorder(node, offsetX, offsetY) {
    const {
      context
    } = this;
    const {
      borderWidth,
      borderColor,
      height,
      width
    } = node.props.style;

    if (borderWidth) {
      context.save();
      context.lineWidth = borderWidth;
      context.beginPath();
      context.rect(offsetX * size, offsetY * size, width * size, height * size);

      if (borderColor) {
        context.strokeStyle = borderColor;
      }

      context.stroke();
      context.closePath();
      context.restore();
    }
  }

  translate(box) {
    const {
      context
    } = this;
    const {
      style
    } = box;
    const {
      x = 0,
      y = 0
    } = style;
    context.translate(x, y);
  }

  transform(box) {
    const {
      context
    } = this;
    const {
      rotate,
      scale
    } = box;

    if (rotate) {
      const {
        angle = 0,
        x = 0,
        y = 0
      } = rotate;
      context.translate(x, y);
      context.rotate(angle * Math.PI / 180);
      context.translate(-x, -y);
    }

    if (scale) {
      const {
        x = 0,
        y = 0,
        scaleX = 1,
        scaleY = 1
      } = scale;
      context.translate(x, y);
      context.scale(scaleX, scaleY);
      context.translate(-x, -y);
    }
  }

  drawCircle(node, offsetX, offsetY) {
    const {
      context
    } = this;
    context.save();
    context.beginPath();
    const {
      cx,
      cy,
      r,
      sAngle,
      eAngle,
      counterclockwise = false,
      stroke,
      strokeWidth
    } = node.props;
    context.arc(cx + offsetX, cy + offsetY, r, sAngle / 180 * Math.PI, eAngle / 180 * Math.PI, counterclockwise);
    context.strokeStyle = stroke;
    context.lineWidth = strokeWidth;
    context.stroke();
    context.closePath();
    context.restore();
  }

  drawLine(node) {
    const {
      context
    } = this;
    const {
      x1 = 0,
      y1 = 0,
      x2 = 200,
      y2 = 200
    } = node.props;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  drawNode(node, offsetX, offsetY, offsetParent) {
    const {
      context
    } = this;
    context.save();
    const {
      props,
      tag
    } = node;

    if (props) {
      const {
        style
      } = props;
      this.mergeStyle(style);

      if (style) {
        this.drawBack(node, offsetX, offsetY, offsetParent);
        this.drawBorder(node, offsetX, offsetY, offsetParent);
      }
    }

    if (tag === "img") {
      this.drawImage(node, offsetX, offsetY);
    } else if (tag === "circle") {
      this.drawCircle(node, offsetX, offsetY);
    } else if (tag === "line") {
      this.drawLine(node, offsetX, offsetX);
    } else if (tag !== "div" && tag !== "view") {
      console.error(`drawNode not support, check jsx <${tag} ....`, node);
    }

    this.renderAnything(node.children, offsetX, offsetY, node);
    context.restore();
  }

  drawPrimitive(text, offsetX, offsetY, parent) {
    var _parent$props;

    const {
      context
    } = this;
    const {
      textAlign,
      textBaseline
    } = context;
    const {
      width = 0,
      height = 0
    } = (parent === null || parent === void 0 ? void 0 : (_parent$props = parent.props) === null || _parent$props === void 0 ? void 0 : _parent$props.style) || {};
    const x = {
      start: 0,
      left: 0,
      center: 0.5,
      right: 1,
      end: 0
    };
    const y = {
      alphabetic: 0,
      hanging: 0,
      ideographic: 0,
      top: 0,
      middle: 0.5,
      bottom: 1
    }; // start 默认。文本在指定的位置开始。
    // end 文本在指定的位置结束。
    // center 文本的中心被放置在指定的位置。
    // left 文本在指定的位置开始。
    // right 文本在指定的位置结束。
    // alphabetic 默认。文本基线是普通的字母基线。
    // top 文本基线是 em 方框的顶端。
    // hanging 文本基线是悬挂基线。
    // middle 文本基线是 em 方框的正中。
    // ideographic 文本基线是表意基线。
    // bottom 文本基线是 em 方框的底端。

    context.fillText(text, (offsetX + width * x[textAlign]) * size, (offsetY + height * y[textBaseline]) * size);
  }

  renderAnything(createdNode, offsetX, offsetY, offsetParent) {
    // undefined null
    // string number
    // array
    // class component
    // div node
    if (!isUndefined(createdNode) && !isBoolean(createdNode)) {
      if (isPrimitive(createdNode)) {
        this.drawPrimitive(createdNode, offsetX, offsetY, offsetParent);
      } else if (isArray(createdNode)) {
        createdNode.forEach(child => this.renderAnything(child, offsetX, offsetY, offsetParent));
      } else if (isFunc(createdNode.tag)) {
        // events of keyboard
        this.keyEventsCollectionKeyframe.forEach(event => {
          const $context = createdNode.$context;

          if (keyEvents.some(name => $context[`on${name}`])) {
            event.$context = $context;
          }
        }); // tag 是 function

        this.renderAnything(createdNode.$context.$node, offsetX, offsetY, offsetParent);
      } else if (isString(createdNode.tag)) {
        // div node
        this.calcNode(createdNode, offsetX, offsetY, offsetParent);
      } else {
        this.drawPrimitive(JSON.stringify(createdNode), offsetX, offsetY, offsetParent);
      }
    }
  }

  calcNode(node, offsetX, offsetY, offsetParent) {
    var _node$props;

    // 非class component
    // div node
    const {
      context
    } = this;
    context.save();
    const style = node === null || node === void 0 ? void 0 : (_node$props = node.props) === null || _node$props === void 0 ? void 0 : _node$props.style;

    if (style) {
      const {
        x = 0,
        y = 0
      } = style;
      offsetX += x;
      offsetY += y; // events of mouse

      this.mouseEventsCollectionKeyframe.forEach(event => {
        const {
          canvasX,
          canvasY
        } = event;

        if (canvasX >= offsetX * size && canvasX < (style.width + offsetX) * size && canvasY >= offsetY * size && canvasY < (style.height + offsetY) * size) {
          event.$node = node;
        }
      });

      if (style && style.overflow) {
        // context.rect(0, 0, 33, 30)
        context.clip();
      }
    }

    this.drawNode(node, offsetX, offsetY, offsetParent);
    context.restore();
  }

  render(createdNode) {
    this.clearRect();
    this.renderAnything(createdNode, 0, 0, this.canvas);
    this.runEvents();
  }

}

function convertPropertyStr(str) {
  const arr = str.split('.');

  if (arr.length === 1) {
    arr.unshift('');
  }

  const [key, propertyStr] = arr;
  const properties = propertyStr.split(';').map(v => v.split(':'));
  return [key, properties];
}
const formatText = data => {
  const o = [];
  data = data.split(/\r?\n/);
  const keys = data.shift().split(',');
  data.forEach((row, index) => {
    if (!row.trim()) {
      return;
    }

    const properties = row.split(',');
    const [id] = properties;
    const item = {
      sy: index
    };
    keys.forEach((key, index) => {
      const value = properties[index];

      if (!value) {
        return;
      }

      if (key === 'property') {
        item[key] = convertPropertyStr(value);
      } else if (['id', 'name', 'type'].includes(key)) {
        item[key] = value;
      } else {
        item[key] = isNaN(value) ? value : Number(value);
      }
    });
    o[id] = item;
    o.push(item);
    return data;
  });
  return o;
};

const loadImage = (src, callback) => {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.addEventListener("load", () => {
      callback && callback(src, img);
      resolve(img);
    });
    img.addEventListener("error", () => reject(img));
    img.src = src;
  });
};
function loadJSON(url) {
  return fetch(url).then(data => data.json());
}
function loadText(url) {
  return fetch(url).then(data => data.text()).then(data => formatText(data));
}

class Resource {
  constructor($state) {
    this.loaded = 0;
    this.total = 0;
    this.loading = false;
    this.$state = $state;
    this.loadMapping();
    this.loadImage();
    this.loadSprite();
  }

  checkStatus() {
    if (this.loaded === this.total) {
      const timer = setTimeout(() => {
        this.loading = false;
        clearTimeout(timer);
      }, 16);
    }
  }

  loadMapping() {
    this.$state.config.mapping.map(v => {
      this.total++;
      loadText(`Data/${v}`).then(data => {
        this.loaded++;
        this.$state.mapping = data;
      });
    });
  }

  loadImage() {
    this.$state.config.images.map(v => {
      this.total++;
      loadImage(`Image/${v}`).then(data => {
        this.$state.image[v] = data;
        this.loaded++;
        this.checkStatus();
      });
    });
  }

  loadSprite() {
    this.$state.config.sprites.map(v => {
      this.total++;
      loadImage(`Sprite/${v}.png`).then(data => {
        this.$state.image[v] = data;
        this.loaded++;
        this.checkStatus();
      });
      this.total++;
      loadText(`Sprite/${v}.dat`).then(data => {
        this.$state[v] = data;
        this.loaded++;
        this.checkStatus();
      });
    });
  }

  loadMap(id) {
    this.total++;
    loadJSON(`Maps/${id}.json`).then(data => {
      this.$state.map = data;
      this.loaded++;
      this.checkStatus();
    });
  }

}

function createNode(tag, props = {}, ...children) {
  const $parent = this;
  return {
    tag,
    props,
    children,
    $parent
  };
}

function createInstance(next) {
  const Class = next.tag;
  next.$context = new Class(next);
  next.$context.$res = next.$parent.$res;
  next.$context.$state = next.$parent.$state;
  next.$context.$event = next.$parent.$event;
  next.$context.$parent = next.$parent;
  next.$context.create && next.$context.create();
  renderNode(next);
}

function destoryInstance(pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.$context.$node);
      pre.$context.destroy && pre.$context.destroy();
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

function patchNode(pre, next) {
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
    var _pre$props, _next$props;

    if (pre && pre.tag === next.tag && ((_pre$props = pre.props) === null || _pre$props === void 0 ? void 0 : _pre$props.key) === ((_next$props = next.props) === null || _next$props === void 0 ? void 0 : _next$props.key)) {
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

class Component {
  constructor({
    props,
    children
  }) {
    this.props = props;
    this.$node = null;
    this.$children = children;

    this.$sound.play = () => {
      return {
        pause() {}

      };
    };

    this.$sound.pause = () => {};
  }

  $c() {
    return createNode.apply(this, arguments);
  }

  $sound() {}

}

class Animate extends Component {
  interval = -1;
  tick = 0;

  render() {
    const {
      src,
      x = 0,
      y = 0,
      width = 1,
      height = 1,
      maxTick = 1,
      maxInterval = 10,
      center = false,
      sy = 0
    } = this.props.data;
    this.interval++;

    if (this.interval === maxInterval) {
      this.interval = 0;
      this.tick++;

      if (this.tick === maxTick) {
        this.tick = 0;
      }
    }

    return this.$c("img", {
      src: src,
      style: {
        x: x + (center ? -width / 2 : 0),
        y: y + (center ? -height / 2 : 0),
        sx: this.tick * width,
        sy: height * sy,
        width: width,
        height: height
      }
    });
  }

}

class Select extends Component {
  styles = {
    select: {
      fontSize: 24,
      textAlign: "center",
      width: 3,
      backgroundColor: "red"
    }
  };

  create() {
    const {
      style,
      activeIndex = 0
    } = this.props;
    this.activeIndex = activeIndex || 0;
    Object.assign(this.styles.select, style);
    this.styles.select.height = this.props.options.length;
  }

  onKeyDown({
    code
  }) {
    if (code === "ArrowDown") {
      this.activeIndex++;

      if (this.activeIndex === this.props.options.length) {
        this.activeIndex = 0;
      }

      this.props.onChange && this.props.onChange(this.activeIndex, this.props.options[this.activeIndex]);
    } else if (code === "ArrowUp") {
      this.activeIndex--;

      if (this.activeIndex === -1) {
        this.activeIndex += this.props.options.length;
      }

      this.props.onChange && this.props.onChange(this.activeIndex, this.props.options[this.activeIndex]);
    } else if (code === "Space") {
      this.props.onConfirm && this.props.onConfirm(this.activeIndex, this.props.options[this.activeIndex]);
    }
  }

  onMouseDown = index => {
    this.activeIndex = index;
    this.props.onConfirm && this.props.onConfirm(this.activeIndex, this.props.options[this.activeIndex]);
  };

  setActiveIndex(index) {
    this.activeIndex = index;
  }

  render() {
    return this.$c("div", {
      style: this.styles.select
    }, this.props.options.map(({
      text
    }, index) => {
      return this.$c("div", {
        style: {
          y: index,
          height: 1,
          width: this.styles.select.width,
          borderWidth: this.activeIndex === index ? 2 : 0,
          borderColor: "#ddd"
        },
        onMouseDown: this.onMouseDown.bind(this, index),
        onMouseMove: this.setActiveIndex.bind(this, index)
      }, text);
    }));
  }

}

class Table extends Component {
  render() {
    const {
      dataSource,
      columns,
      data
    } = this.props;
    let x = 0;
    return columns.map((column, index) => {
      const {
        title,
        dataIndex,
        width = 1,
        render
      } = column;
      const rowEle = this.$c("div", {
        style: {
          x: 0,
          y: 0,
          textAlign: 'start'
        }
      }, this.$c("div", {
        style: {
          x: x,
          width: width * 1,
          height: 1
        }
      }, title), dataSource.map((rowData, rowIndex) => {
        return this.$c("div", {
          style: {
            x: x,
            y: (rowIndex + 1) * 1,
            width: width * 1,
            height: 1
          }
        }, render ? render.call(this, rowData, data, rowIndex, index) : rowData[dataIndex]);
      }));
      x += width * 1;
      return rowEle;
    });
  }

}

const directions = [{
  code: 'ArrowRight',
  x: 1.5,
  y: 0,
  title: '右'
}, {
  code: 'ArrowUp',
  x: 0.75,
  y: -0.75,
  title: '上'
}, {
  code: 'ArrowLeft',
  x: 0,
  y: 0,
  title: '左'
}, {
  code: 'ArrowDown',
  x: 0.75,
  y: 0.75,
  title: '下'
}];
const controls = [{
  code: 'KeyS',
  x: -1,
  y: -0.75
}, {
  code: 'KeyL',
  x: -2.5,
  y: -0.75
}, {
  code: 'Escape',
  x: -2.5,
  y: 0.5
}, {
  code: 'Space',
  x: -1,
  y: 0.5
}, {
  code: 'KeyB',
  x: -1,
  y: 1.75
}, {
  code: 'KeyX',
  x: -2.5,
  y: 1.75
}];

function createElement(array, root) {
  root = document.querySelector(root);
  array.forEach((item, index) => {
    const {
      x,
      y,
      code,
      title
    } = item;
    const el = document.createElement('div');
    el.classList.add('btn');
    el.textContent = title || code;
    el.style.transform = `translate(${x * 100}%, ${y * 100}%)`;

    el.onmousedown = function (e) {
      var event = document.createEvent('Event'); // var event = new Event('keydown');

      event.code = code; // Define that the event name is 'build'.

      event.initEvent('keydown', true, true); // The form element listens for the custom "awesome" event and then consoles the output of the passed text() method

      document.dispatchEvent(event);
      e.preventDefault();
      e.stopPropagation();
    };

    root.appendChild(el);
  });
}

createElement(directions, '.direction');
createElement(controls, '.control');

function setStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function getStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

function saveGame(save) {
  return setStorage('game', save);
}
function loadGame() {
  return getStorage('game');
}

class Engine {
  constructor($gameJSX) {
    this.$gameJSX = $gameJSX;

    if (this.checkChromeVersion()) {
      loadJSON("game.json").then(game => {
        this.init(game);
      });
    }
  }

  init(config) {
    document.title = config.title;
    this.$state = {
      config,
      save: { ...config.save
      },
      image: {},
      sound: {}
    };
    this.$res = new Resource(this.$state);

    this.$event = async (key, data) => {
      if (typeof key === typeof null) {
        data = key.data;
        key = key.type;
      }

      switch (key) {
        case "startGame":
          Object.assign(this.$state.save, this.$state.config.save);
          this.$res.loadMap(this.$state.save.mapId); // this.map = loadMap(this.$state.save.mapId);
          // this.$state.randMapKey = `${this.$state.save.mapId} ${new Date()}`;

          break;

        case "loadGame":
          Object.assign(this.$state.save, loadGame());
          this.$res.loadMap(this.$state.save.mapId);
          break;

        case "saveGame":
          saveGame(this.$state.save);
          break;

        case "toTitle":
          this.$state.map = null;
          break;

        case "loadMap":
          this.$state.save.mapId = data;
          this.$res.loadMap(this.$state.save.mapId);
          break;

        case "message":
          this.$state.message = data;
          break;

        case "messageClose":
          this.$state.message = null;
          break;
      }
    };

    this.$render = new Render(this.$state);
    this.$node = null;
    this.gameStart();
  }

  checkChromeVersion() {
    if (location.protocol === "file:") {
      alert("不能直接运行index.html"); // } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 86) {
      // alert('需要chrome最新浏览器')
    } else {
      return true;
    }
  }

  gameStop() {
    cancelAnimationFrame(this.ident);
    this.ident = -1;
  }

  gameStart() {
    const frame = () => {
      this.keyFrame();
      this.ident = requestAnimationFrame(frame);
    };

    frame();
  }

  keyFrame() {
    this.$node = patchNode(this.$node, createNode.call(this, this.$gameJSX, null));
    this.$render.render(this.$node);
  }

}

const getTime = () => performance.now();

class FPS extends Component {
  styles = {
    fps: {
      fontSize: 32,
      textAlign: 'left',
      textBaseline: 'top'
    }
  };
  timeStamp = getTime();

  render() {
    const timeStamp = getTime();
    const fps = 1000 / (timeStamp - this.timeStamp);
    this.timeStamp = timeStamp;
    return this.$c("div", {
      style: this.styles.fps
    }, `${fps.toFixed()}fps`);
  }

}

class Loading extends Component {
  render() {
    const x = 6;
    const width = 1 * (18 - 2 * x);
    return this.$c("div", null, this.$c("div", {
      style: {
        y: 2,
        width: 18,
        color: 'rebeccapurple',
        textAlign: 'center',
        fontSize: 64
      }
    }, "\u6E38\u620F\u5F15\u64CE"), this.$c("div", {
      style: {
        x: x,
        y: 5,
        width: width * this.props.rate || 0,
        height: 0.2,
        backgroundColor: '#666'
      }
    }));
  }

}

class Title extends Component {
  styles = {
    gameName: {
      y: 2,
      textAlign: "center",
      width: 18,
      height: 4,
      fontSize: 128
    },
    select: {
      x: 8,
      y: 8,
      width: 3
    }
  };

  create() {
    this.activeIndex = 0;
    this.options = [{
      text: "开始",
      event: "startGame"
    }, {
      text: "继续",
      event: "loadGame"
    }];
    this.$event('loadGame');
  }

  onConfirm = index => {
    this.$event(this.options[index].event);
  };

  render() {
    return this.$c("div", null, this.$c("div", {
      style: this.styles.gameName
    }, this.$state.config.title), this.$c(Select, {
      options: this.options,
      style: this.styles.select,
      onConfirm: this.onConfirm
    }));
  }

} // <Animate
// data={{
//   src: "stand.png",
//   maxTick: 4,
//   sy: 4,
//   x: 208,
//   y: 100,
//   width: 632 / 4,
//   height: 768 / 8,
// }}
// ></Animate>
// <Animate
// data={{
//   src: "skill.png",
//   maxTick: 6,
//   sy: 4,
//   width: 912 / 6,
//   height: 800 / 8,
//   x: 308,
//   y: 200,
// }}
// ></Animate>
// <Animate
// data={{
//   src: "run.png",
//   maxTick: 6,
//   width: 996 / 6,
//   height: 824 / 8,
//   sy: 4,
//   x: 108,
//   y: 200,
// }}
// ></Animate>

class Shop extends Component {
  create() {
    this.shop = JSON.parse(JSON.stringify(this.$state.shop[this.props.shopid]));
    this.shop.choices.push({
      text: '离开'
    });
  }

  onConfirm = index => {
    if (index === this.shop.choices.length - 1) {
      this.props.onClose();
    } else {
      const {
        need,
        effect
      } = this.shop.choices[index];
      this.props.onShopEvent(need, effect);
    }
  };

  render() {
    return this.$c("img", {
      src: "shop.webp",
      style: {
        x: 3 * 1,
        y: 2 * 1,
        width: 1 * 7,
        height: 1 * 8,
        borderWidth: 4,
        borderColor: '#deb887',
        swidth: 500,
        sheight: 701
      }
    }, this.$c("div", {
      style: {
        y: 1 / 4 * 3,
        width: 1 * 7,
        fontSize: 24
      }
    }, this.shop.title), this.$c("div", {
      style: {
        x: 0,
        y: 48,
        fontSize: 14
      }
    }, this.shop.text.split(/\n/).map((text, index) => this.$c("div", {
      style: {
        x: 1 / 2 * 7,
        y: index * 1 / 2
      }
    }, text))), this.$c(Select, {
      options: this.shop.choices,
      onConfirm: this.onConfirm,
      style: {
        x: 1 * 1,
        y: 1 / 2 * 7,
        width: 1 * 5,
        fontSize: 16
      },
      onClose: this.props.onClose
    }));
  }

}

class Battle extends Component {
  tick = 0;
  styles = {
    battle: {
      x: 1,
      y: 1,
      width: 1 * 16,
      height: 1 * 11,
      fontSize: 20,
      borderWidth: 3,
      borderColor: '#deb887',
      swidth: 640,
      sheight: 320
    },
    enemy: {
      x: 1 * 1,
      y: 1 * 1
    },
    hero: {
      x: 1 * 10,
      y: 1 * 1
    }
  };

  create() {
    this.enemy = JSON.parse(JSON.stringify(this.props.enemy));
    this.hero = this.props.hero;
  }

  onKeyDown({
    code
  }) {
    if (code === 'Space') {
      if (this.battleMsg) {
        this.props.onClose && this.props.onClose();
      }
    }
  }

  onClick() {
    if (this.battleMsg) {
      this.props.onClose && this.props.onClose();
    }
  }

  render() {
    const enemy = this.enemy;
    const hero = this.hero;
    const isDev = location.hostname === 'localhost';
    const tick = isDev ? 3 : 3;

    if (enemy.hp > 0) {
      this.tick++;

      if (this.tick === tick) {
        // isDev || this.$sound.play('se', 'attack.mp3')
        if (this.turn) {
          const atk = enemy.atk - hero.def;

          if (atk > 0) {
            hero.hp -= atk;
          }
        } else {
          const atk = hero.atk - enemy.def;

          if (atk > 0) {
            enemy.hp -= atk;
          }

          if (enemy.hp <= 0) {
            enemy.hp = 0;
            const {
              exp,
              money
            } = enemy;
            hero.exp += exp;
            this.$state.save.money += money;
            this.battleMsg = `战斗胜利，获得${money}金币，${exp}经验`;
          }
        }

        this.turn = !this.turn;
        this.tick = 0;
      }
    }

    const proprety = [{
      text: '名称',
      key: 'name'
    }, {
      text: '生命',
      key: 'hp'
    }, {
      text: '攻击',
      key: 'atk'
    }, {
      text: '防御',
      key: 'def'
    }];
    const heroImageStyle = {
      x: 1,
      y: 1 * 4.5,
      swidth: 1,
      sheight: 1,
      width: 64,
      height: 64,
      sy: 0
    };
    const enemyImageStyle = {
      x: 1,
      y: 1 * 4.5,
      swidth: 1,
      sheight: 1,
      width: 64,
      height: 64,
      sy: enemy.sy * 1
    };
    const size64 = 64;
    const vsStyle = {
      x: 1 * (5 + 1.5),
      y: 1 * 2,
      height: size64,
      width: size64
    };
    const msgStyle = {
      fontSize: 24,
      height: 1,
      y: 1 * 8,
      width: 1 * 15
    };
    return this.$c("img", {
      src: "Battlebacks/mota.jpg",
      style: this.styles.battle,
      onClick: this.onClick
    }, this.battleMsg && this.$c("div", {
      style: msgStyle
    }, this.battleMsg), this.$c("div", {
      style: this.styles.enemy
    }, this.$c("img", {
      src: "enemys",
      style: enemyImageStyle
    }), proprety.map((item, index) => {
      return this.$c("div", {
        style: {
          x: 0 * 1,
          y: index * 1
        }
      }, this.$c("div", {
        style: {
          width: 1 * 4,
          textAlign: 'left',
          height: 1
        }
      }, item.text), this.$c("div", {
        style: {
          width: 1 * 4,
          textAlign: 'right',
          height: 1
        }
      }, enemy[item.key]));
    })), this.$c("div", {
      style: vsStyle
    }, "VS"), this.$c("div", {
      style: this.styles.hero
    }, this.$c("img", {
      src: "Characters/hero.png",
      style: heroImageStyle
    }), proprety.map((item, index) => {
      return this.$c("div", {
        style: {
          x: 0 * 1,
          y: index * 1
        }
      }, this.$c("div", {
        style: {
          width: 1 * 4,
          textAlign: 'left',
          height: 1
        }
      }, hero[item.key]), this.$c("div", {
        style: {
          width: 1 * 4,
          textAlign: 'right',
          height: 1
        }
      }, item.text));
    })));
  }

}

class Talk extends Component {
  index = 0;
  width = 7;
  styles = {
    talk: {
      width: this.width,
      height: 1,
      backgroundColor: "black",
      borderWidth: 2,
      borderColor: "white",
      fontSize: 16,
      textAlign: "left",
      textBaseline: "middle"
    }
  };

  onKeyDown({
    code
  }) {
    if (code === "Space") {
      this.index++;

      if (this.index === this.props.talk.length) {
        this.props.onConfirm();
      } else {
        this.next();
      }

      this.$sound.play("se", "dialogue.mp3");
    }
  }

  next() {
    const talks = this.props.talk[this.index].split(/\n/);
    this.current = [];
    talks.forEach(talk => {
      for (let i = 0; i < talk.length; i = i + 7 * 2) {
        this.current.push(talk.substr(i, 7 * 2));
      }
    });
    const leftStyle = {
      x: 2,
      y: 2,
      height: this.current.length
    };
    const rightStyle = {
      x: 4,
      y: 6,
      height: this.current.length
    };
    this.turn = !this.turn;
    Object.assign(this.styles.talk, this.turn ? leftStyle : rightStyle);
  }

  create() {
    this.next();
  }

  render() {
    return this.$c("div", {
      style: this.styles.talk
    }, this.current.map((talk, index) => {
      return this.$c("div", {
        style: {
          x: 0,
          y: index,
          width: this.width,
          height: 1
        }
      }, talk);
    }));
  }

}

const styles = {
  wrap: {
    textAlign: "left",
    fontSize: 18,
    backgroundImage: "ground.png",
    width: 1 * (13 + 5 - 2),
    x: 1,
    y: 1,
    height: 1 * (13 - 2)
  }
};
const columns = [{
  title: null,
  width: 1,

  render(rowData) {
    return this.$c(Animate, {
      data: {
        src: "enemys.png",
        maxTick: 2,
        width: 1,
        height: 1,
        maxInterval: 10,
        sy: rowData.sy
      }
    });
  }

}, {
  title: "名字",
  dataIndex: "name",
  width: 3
}, {
  title: "生命",
  dataIndex: "hp",
  width: 2
}, {
  title: "攻击",
  dataIndex: "atk",
  width: 2
}, {
  title: "防御",
  dataIndex: "def",
  width: 2
}, {
  title: "损失",
  dataIndex: "address",
  width: 2,

  render(enemy, hero) {
    if (hero.atk > enemy.def) {
      if (hero.def >= enemy.atk) {
        return 0;
      } else {
        const atkCount = Math.floor(enemy.hp / (hero.atk - enemy.def));
        const needHp = (enemy.atk - hero.def) * atkCount;
        return hero.hp > needHp ? needHp : this.$c("div", {
          style: {
            color: 'red',
            height: 1
          }
        }, needHp);
      }
    } else {
      return "-";
    }
  }

}];
class EnemyInfo extends Component {
  onKeyDown({
    $key
  }) {
    if ($key === 'confirm') {
      this.props.onClose();
    }
  }

  onMouseDown = () => {
    this.props.onClose();
  };

  render() {
    const dataSource = Object.keys(this.props.enemys).map(enemyId => this.$state.enemys[enemyId]);
    return this.$c("div", {
      style: styles.wrap,
      onMouseDown: this.onMouseDown
    }, this.$c(Table, {
      dataSource: dataSource,
      columns: columns,
      data: this.$state.save.hero
    }));
  }

}

class ShopList extends Component {
  create() {
    const shops = this.$state.save.shops || [];
    this.options = Object.entries(shops).map(([shopid, text]) => {
      return {
        text,
        shopid
      };
    });
  }

  onConfirm = index => {
    if (index > -1) {
      const {
        shopid
      } = this.options[index];
      this.props.onConfirm(shopid);
    }
  };

  onKeyDown({
    code
  }) {
    if (code === 'KeyB') {
      this.props.onClose();
    }
  }

  render() {
    return this.$c("img", {
      src: "shop.webp",
      style: {
        x: 3 * 1,
        y: 2 * 1,
        width: 1 * 7,
        height: 1 * 8,
        borderWidth: 4,
        borderColor: '#deb887',
        swidth: 500,
        sheight: 701
      }
    }, this.$c("div", {
      style: {
        y: 1 / 4 * 3,
        width: 1 * 7,
        fontSize: 24
      }
    }, "\u5546\u5E97\u9009\u62E9"), this.$c(Select, {
      style: {
        x: 1,
        y: 48,
        width: 1 * 5,
        fontSize: 16
      },
      options: this.options,
      onConfirm: this.onConfirm,
      onClose: this.props.onClose
    }));
  }

}

function isCoincided(A, B) {
  if (A.x >= B.x + B.width || A.x + A.width <= B.x || A.y >= B.y + B.height || A.y + A.height <= B.y) {
    return false;
  }

  return true;
}
function updateVector(vector, obj) {
  vector = Object.assign(Object.create(null), vector);
  Object.entries(obj).forEach(([key, value]) => {
    vector[key] += value;
  });
  return vector;
}
function assignVector(vector, obj) {
  return Object.assign(vector, obj);
}

const propertyNames = {
  lv: "等级",
  money: "金币",
  hp: "生命",
  atk: "攻击",
  def: "防御",
  exp: "经验"
};

class Hero extends Component {
  tick = 0;

  create() {}

  isCoincidedTerrains(heroStyle) {
    return this.props.mapTerrains.findIndex(item => item && item && isCoincided(item.props.style, heroStyle));
  }

  isCoincidedEvents(heroStyle) {
    return this.props.mapEvents.findIndex(item => item && item && isCoincided(item.props.style, heroStyle));
  }

  onKeyDown({
    code,
    $key
  }) {
    const postion = this.$state.save.position;
    const step = 1;
    let moveVector = null;

    if ($key === "down") {
      moveVector = {
        y: step
      };
      postion.sy = 0; // this.$sound.play('se', 'step.mp3')
    } else if ($key === "up") {
      moveVector = {
        y: -step
      };
      postion.sy = 3; // this.$sound.play('se', 'step.mp3')
    } else if ($key === "left") {
      moveVector = {
        x: -step
      };
      postion.sy = 1; // this.$sound.play('se', 'step.mp3')
    } else if ($key === "right") {
      moveVector = {
        x: step
      };
      postion.sy = 2; // this.$sound.play('se', 'step.mp3')
    } else if (code === "KeyS") {
      saveGame(this.$state.save);
      this.$sound.play("se", "load.mp3");
      this.setMessage("存储成功");
    } else if (code === "KeyL") {
      this.$sound.play("se", "load.mp3");
      this.props.onLoadMap(loadGame());
      this.setMessage("读取成功");
    } else if (code === "KeyX") {
      this.showEnemyInfo = !this.showEnemyInfo;
    } else if (code === "KeyB") {
      this.buying = true;
    } else if (code === "Backspace") {
      this.updateSaveData("hero", {
        lv: 1,
        hp: 100,
        atk: 100,
        def: 100,
        exp: 100
      });
      this.updateSaveData("items", {
        yellowKey: 3,
        blueKey: 2,
        redKey: 1
      });
      this.updateSaveData("", {
        money: 100
      });
    }

    if (moveVector) {
      const vector = updateVector(postion, moveVector); // const terrain = this.isCoincidedTerrains(vector);
      // if (terrain !== -1) {
      //   return;
      // }
      // const eventIndex = this.isCoincidedEvents(vector);
      // if (eventIndex !== -1) {
      //   if (this.handleEvents(this.props.map.mapEvents[eventIndex])) {
      //     assignVector(postion, vector);
      //   }
      //   return;
      // }

      assignVector(postion, vector);
    }
  }

  onShopClose = () => {
    this.shopid = null;
    this.setEvent();
  };

  handleEvents(mapEvent) {
    if (this.mapEvent) {
      return;
    }

    if (mapEvent[3]) {
      this.mapEvent = mapEvent;
      this.eventIndex = 0;
      this.setEvent();
    } else {
      const info = this.$state.mapping[mapEvent[2]];
      const {
        name,
        type
      } = info;

      if (type === "items") {
        const item = this.$state.items[name];
        const {
          type
        } = item;

        if (type === "1" || type === "3") {
          this.remove(mapEvent);
          this.updateSaveData("items", name);
          this.setMessage(`获得${item.name}`);
          this.$sound.play("se", type === "1" ? "item.mp3" : "constants.mp3");
        } else if (type === "2") {
          this.remove(mapEvent);
          this.updateSaveData(...item.property);
          const [name, property] = item.property;
          let msg = `获得${item.name}`;
          property.forEach(property => {
            const [key, value] = property;
            let propertyName = key;

            if (name === "hero") {
              propertyName = propertyNames[key];
            } else if (name === "items") {
              propertyName = this.$state.items[key].name;
            } else if (key === "money") {
              propertyName = "金币";
            }

            msg += ` ${propertyName}${value > 0 ? "+" : "-"}${value}`;
            this.setMessage(msg);
          });
          this.$sound.play("se", "item.mp3");
        }

        return true;
      } else if (type === "enemys") {
        mapEvent[3] = [{
          type: "enemy",
          data: name
        }];
        this.handleEvents(mapEvent);
        return false;
      } else if (type === "terrains") {
        if (["yellowDoor", "redDoor", "blueDoor", "steelDoor", "specialDoor"].includes(name)) {
          const key = name.slice(0, -4) + "Key";

          if (this.$state.save.items[key]) {
            this.$state.save.items[key]--;
            this.remove(mapEvent);
            this.$sound.play("se", "door.mp3");
            return true;
          }
        }
      }
    }
  }

  setEvent = () => {
    if (this.eventIndex < this.mapEvent[3].length) {
      const event = this.mapEvent[3][this.eventIndex++];
      const {
        type,
        data
      } = event;

      if (type === "talk") {
        this.talk = data;
        return;
      } else if (type === "mapLoad") ; else if (type === "openShop") {
        this.shopid = event.id;
        this.$state.save.shops = this.$state.save.shops || {};
        this.$state.save.shops[this.shopid] = this.$state.shop[this.shopid].title;
        return;
      } else if (type === "getItems") {
        this.updateSaveData("items", data);
      } else if (type === "removeSelf") {
        this.remove(this.mapEvent);
        return;
      } else if (type === "moveBlock") {
        this.remove(this.mapEvent);
        return;
      } else if (type === "enemy") {
        const enemy = this.$state.enemys[data];
        const hero = this.$state.save.hero;

        if (hero.atk > enemy.def) {
          if (hero.def >= enemy.atk || enemy.hp / (hero.atk - enemy.def) <= hero.hp / (enemy.atk - hero.def)) {
            this.enemy = enemy;
            return;
          } else {
            this.mapEvent = null;
            this.eventIndex = 0;
            this.setMessage(`你打不过${enemy.name}`);
            return;
          }
        } else {
          this.mapEvent = null;
          this.eventIndex = 0;
          this.setMessage(`你的攻击比${enemy.name}的防御低`);
          return;
        }
      } else if (type === "updateSaveData") {
        this.updateSaveData(...convertPropertyStr(data));
      } else if (type === "removeBlock") {
        this.props.removeMapEvent(data);
      } else if (type === "title") {
        this.props.onTitle();
      } else if (type === "removeMapBlock") {
        const {
          mapId,
          position
        } = data;
        const {
          x,
          y
        } = position;
        this.$state.save.destroy[[mapId, x, y]] = true;
      } else if (type === "if") {
        const {
          condition,
          true: trueEvent,
          false: falseEvent
        } = event;
        this.mapEvent = null;
        this.eventIndex = 0;

        if (this.checkSaveData(...convertPropertyStr(condition))) {
          this.mapEvent = [0, 0, 0, trueEvent];
        } else {
          this.mapEvent = [0, 0, 0, falseEvent];
        }
      } else ;

      this.setEvent();
    } else {
      this.mapEvent = null;
    }
  };

  remove(mapEvent) {
    this.props.removeMapEvent(mapEvent);
    this.mapEvent = null;
  }

  onBattleClose = () => {
    this.enemy = null;
    this.props.removeMapEvent(this.mapEvent);
    this.setEvent();
  };
  onConfirm = () => {
    this.talk = null;
    this.setEvent();
  };
  setMessage = msg => {
    this.props.onMessage(msg);
  };

  updateSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => this.updateSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? this.$state.save[context] : this.$state.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === "object") {
      this.updateSaveData(context, Object.entries(gets));
    } else ;
  }

  checkSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      return gets.some(([id, value]) => this.checkSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? this.$state.save[context] : this.$state.save;
      saveData[gets] = saveData[gets] || 0;
      return saveData[gets] + Number(n) >= 0;
    } else if (typeof gets === "object") {
      return this.checkSaveData(context, Object.entries(gets), null, 0);
    } else {
      return false;
    }
  }

  onShopEvent = (need, effect) => {
    if (this.checkSaveData(...convertPropertyStr(need))) {
      this.updateSaveData(...convertPropertyStr(need));
      this.updateSaveData(...convertPropertyStr(effect));
    }
  };
  onShopListClose = () => {
    this.buying = false;
  };
  onShopListConfirm = shopid => {
    this.buying = false;
    this.shopid = shopid;
    this.mapEvent = [0, 0, 0, []];
  };

  render() {
    return this.$c("div", null, this.$c("div", {
      style: this.$state.save.position
    }, this.$c(Animate, {
      data: {
        src: "Characters/hero.png",
        width: 1,
        height: 1,
        maxTick: 4,
        maxInterval: 10,
        sy: this.$state.save.position.sy
      }
    })), this.buying && this.$c(ShopList, {
      onClose: this.onShopListClose,
      onConfirm: this.onShopListConfirm
    }), this.shopid && this.$c(Shop, {
      shopid: this.shopid,
      onClose: this.onShopClose,
      onShopEvent: this.onShopEvent
    }), this.enemy && this.$c(Battle, {
      enemy: this.enemy,
      enemyId: this.enemyId,
      hero: this.$state.save.hero,
      onClose: this.onBattleClose
    }), this.talk && this.$c(Talk, {
      talk: this.talk,
      key: this.talk,
      onConfirm: this.onConfirm
    }), this.showEnemyInfo && this.$c(EnemyInfo, {
      enemys: this.props.enemys,
      onClose: () => this.showEnemyInfo = false
    }));
  }

}

class Status extends Component {
  create() {
    this.walls = [];

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 13; y++) {
        if (x === 4 || y === 0 || y === 12) {
          this.walls.push(this.$c("img", {
            src: "terrains",
            style: {
              sx: 0,
              sy: 1 * 2,
              x: x * 1,
              y: y * 1
            }
          }));
        }
      }
    }
  }

  render() {
    const {
      save,
      map
    } = this.$state;
    const rowProperty = [this.$state.title, map.name, save.hero.lv, save.hero.hp, save.hero.atk, save.hero.def, save.hero.exp, save.money, save.items.yellowKey, save.items.blueKey, save.items.redKey];
    return this.$c("div", {
      style: {
        fontSize: 24
      }
    }, this.walls, rowProperty.map((value, index) => {
      return this.$c("div", {
        style: {
          y: (index + 1) * 1,
          width: 1,
          height: 1
        }
      }, this.$c("img", {
        src: "icons",
        style: {
          sy: index * 1,
          width: 1,
          height: 1,
          swidth: 1,
          sheight: 1
        }
      }), this.$c("div", {
        style: {
          x: 1,
          height: 1,
          width: 1 * 3
        }
      }, value));
    }));
  }

}

class Map extends Component {
  styles = {
    map: {
      width: 13,
      height: 13,
      backgroundImage: "ground.png"
    },
    statusBar: {
      x: 13,
      width: 5,
      height: 13,
      backgroundImage: "ground.png"
    }
  };

  create() {// const bgm = this.props.map.bgm;
    // this.mapBgm = this.$sound.play('bgm', bgm)
  }

  destroy() {// const bgm = this.props.map.bgm;
    // this.$sound.pause('bgm', bgm)
    // this.mapBgm.pause();
  }

  renderMapTerrains() {
    const {
      mapTerrains
    } = this.$state.map;

    if (!mapTerrains) {
      return;
    }

    return mapTerrains.map((line, y) => {
      return line.map((value, x) => {
        if (value) {
          const info = this.$state.mapping[value];
          const {
            type,
            name
          } = info;
          const detail = this.$state[type][name];

          if (type === "animates") {
            return this.$c(Animate, {
              data: {
                src: type,
                sy: detail.sy,
                x: x,
                y: y,
                maxTick: 4
              }
            });
          } else if (type === "terrains") {
            return this.$c(Animate, {
              data: {
                src: type,
                sy: detail.sy,
                x: x,
                y: y,
                maxTick: 1
              }
            });
          } else {
            return null;
          }
        } else {
          return null;
        }
      });
    });
  }

  renderMapEvents() {
    const {
      mapId,
      destroy = {}
    } = this.$state.save;
    const {
      mapEvents
    } = this.$state.map;
    return mapEvents && mapEvents.map(event => {
      const [x, y, value, events] = event;

      if (destroy[[mapId, x, y]]) {
        return null;
      }

      if (value) {
        const info = this.$state.mapping[value];

        if (info) {
          const {
            type,
            name
          } = info;
          const detail = this.$state[type][name]; // terrains items icons npcs enemys

          if (type === "npcs" || type === "enemys") {
            return this.$c(Animate, {
              data: {
                src: type,
                sy: detail.sy,
                x: x,
                y: y,
                maxTick: 2
              }
            });
          }

          return this.$c(Animate, {
            data: {
              src: type,
              sy: detail.sy,
              x: x,
              y: y,
              maxTick: 1
            }
          });
        }
      }

      return null;
    });
  }

  onRemoveMapEvent = mapEvent => {
    const [x, y] = mapEvent;
    const mapId = this.$state.save.mapId;
    this.$state.save.destroy = this.$state.save.destroy || {};
    this.$state.save.destroy[[mapId, x, y]] = 1;
  };
  onTitle = () => {
    this.props.onTitle();
  };
  onMouseDown = e => {
    // DFS BFS
    this.$state.save.position;
    const {
      gameX,
      gameY
    } = e;
    const mapXY = {};
    const {
      mapTerrains,
      mapEvents
    } = this.$state.map;
    const height = this.$state.map.height;
    const width = this.$state.map.width;

    function next(x, y, path) {
      if (x < 0 || y < 0 || x === width || x === height) {
        return false;
      }

      if (mapTerrains[y][x]) {
        return false;
      }

      if (mapXY[[x, y]]) {
        return false;
      }

      mapXY[[x, y]] = 1;
      path.push([x, y]);

      if (x === gameX && y === gameY) {
        console.log(path.slice());
        return true;
      }

      const result = next(x - 1, y, path) || next(x + 1, y, path) || next(x, y - 1, path) || next(x, y + 1, path);

      if (!result) {
        path.pop();
      }

      return result;
    }

    const path = [];
    const {
      x,
      y
    } = this.$state.save.position;
    next(x, y, path);
    this.path = path;
  };

  render() {
    if (this.path && this.path.length) {
      const path = this.path.shift();
      const [x, y] = path;
      this.$state.save.position.x = x;
      this.$state.save.position.y = y;
    }

    const mapTerrains = this.renderMapTerrains();
    const mapEvents = this.renderMapEvents();
    return this.$c("div", null, this.$c("div", {
      style: this.styles.map,
      onMouseDown: this.onMouseDown
    }, mapTerrains, mapEvents), this.$c("div", {
      style: this.styles.statusBar
    }, this.$c(Status, null)), this.$c(Hero, {
      mapTerrains: mapTerrains,
      mapEvents: mapEvents,
      map: this.$state.map,
      onLoadMap: this.props.onLoadMap,
      onMessage: this.props.onMessage,
      removeMapEvent: this.onRemoveMapEvent,
      onTitle: this.onTitle
    }));
  }

}

class ScrollText extends Component {
  styles = {
    text: {
      fontSize: 20,
      textAlign: 'left',
      textBaseline: 'top',
      width: 18,
      height: 13
    },
    scroll: {
      x: 1,
      y: 5
    }
  };

  create() {
    const {
      text,
      bgm
    } = this.$state.map;
    this.text = text.split('\n');
    this.mapBgm = this.$sound.play('bgm', bgm);
  }

  destroy() {
    this.mapBgm.pause();
  }

  onKeyDown({
    code
  }) {
    if (code === 'Space') {
      this.onMouseDown();
    }
  }

  onMouseDown = () => {
    if (this.ready) {
      // const { type, data } = this.props.map.event
      this.$event('loadMap', this.$state.map.event.data.mapId); // if (type === 'mapLoad') {
      //   this.props.onClose(data)
      // } else if (type === 'title') {
      //   this.props.onTitle(data)
      // }
    }
  };

  render() {
    const style = this.styles.scroll;

    if (style.y > -1 * (this.text.length - 2)) {
      style.y -= 0.1;
    } else {
      this.ready = true;
    }

    return this.$c("div", {
      style: this.styles.text,
      onMouseDown: this.onMouseDown
    }, this.$c("div", {
      style: this.styles.scroll
    }, this.text.map((text, index) => this.$c("div", {
      style: {
        y: index
      }
    }, text))));
  }

}

function calcLength(str) {
  let len = 0;

  for (let i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 127) {
      len += 2;
    } else {
      len += 1;
    }
  }

  return len;
}

class Message extends Component {
  create() {
    if (this.props) {
      this.tick = this.props.tick || 90;
    }

    this.length = calcLength(this.props.msg);
    this.msg = this.props.msg;
  }

  render() {
    this.tick--;

    if (this.tick === 0) {
      this.props.onMessageClose();
      return null;
    }

    let globalAlpha = 1;

    if (this.tick < 15) {
      globalAlpha = this.tick / 15;
    }

    const fontSize = 20;
    const width = fontSize / 2 * this.length + fontSize;
    return this.$c("div", {
      style: {
        backgroundColor: 'rgba(0,0,0,.7)',
        globalAlpha,
        x: (1 * 18 - width) / 2,
        y: 1 * 2,
        height: 1,
        width: width
      }
    }, this.$c("div", {
      style: {
        textAlign: 'center',
        fontSize,
        x: width / 2,
        height: 1
      }
    }, this.msg));
  }

}

/* eslint-disable multiline-ternary */
class Index extends Component {
  styles = {
    app: {
      width: 18,
      height: 13
    }
  };

  renderDetail() {
    if (this.$res.loaded !== this.$res.total) {
      return this.$c(Loading, {
        rate: this.$res.loaded / this.$res.total
      });
    }

    if (this.$state.map) {
      if (this.$state.map.text) {
        return this.$c(ScrollText, null);
      }

      return this.$c(Map, {
        key: this.randMapKey
      });
    }

    return this.$c(Title, null);
  }

  renderMessage() {
    return this.msg && this.$c(Message, {
      msg: this.msg,
      key: this.msg,
      onMessageClose: this.onMessageClose
    });
  }

  render() {
    return this.$c("div", {
      style: this.styles.app
    }, this.renderDetail(), this.renderMessage(), this.$c(FPS, null));
  }

}

if (typeof window !== 'undefined') {
  window.mota = new Engine(Index);
}
//# sourceMappingURL=bundle.js.map
