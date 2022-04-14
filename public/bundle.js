const fontFamily = document.fonts.check('16px 黑体') ? '黑体' : '黑体-简';
const baseStyle = {
  direction: 'ltr',
  color: 'white',
  // filter: "grayscale(.1)",
  filter: 'none',
  fontSize: 32,
  font: '32px ' + fontFamily,
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

const mouseEvents = ['ContextMenu', 'Click', 'Wheel', 'MouseDown', 'MouseUp', 'MouseMove'];
const keyEvents = ['KeyDown', 'KeyUp'];
const size$d = 32;
class UI {
  constructor(game) {
    this.initCanvas();
    this.bindEvents();
    this.$data = game.$data;
    this.$images = game.$images;
  }

  getImage = src => {
    return this.$images.images[src];
  };

  initCanvas(screen = {}) {
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    const {
      el,
      width = size$d * (13 + 5),
      height = size$d * 13
    } = screen;
    this.screen = screen;
    this.canvas.width = width;
    this.canvas.height = height;
    const dom = document.querySelector(el) || document.body;
    dom && dom.appendChild(this.canvas);
    this.mergeStyle(baseStyle);
  }

  restoreEvents() {
    // mosue
    this.mouseEventsCollectionKeyframe = [];
    this.mouseEventsCallbackKeyframe = []; // key

    this.keyEventsCollectionKeyframe = [];
    this.keyEventsCallbackKeyframe = [];
  }

  bindEvents() {
    this.restoreEvents();
    mouseEvents.forEach(name => {
      this.canvas.addEventListener(name.toLowerCase(), e => {
        e.name = `on${name}`;
        this.mouseEventsCollectionKeyframe.push(e);
        e.preventDefault();
      }, {
        passive: false
      });
    });
    keyEvents.forEach(name => {
      document.addEventListener(name.toLowerCase(), e => {
        e.name = `on${name}`;
        this.keyEventsCollectionKeyframe.push(e);
      });
    });
  }

  runEvents() {
    this.mouseEventsCallbackKeyframe.every(({
      node,
      event,
      name
    }) => {
      return node.props[name](event, node);
    });
    this.keyEventsCallbackKeyframe.every(({
      instance,
      event,
      name
    }) => {
      return instance[name](event);
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
        globalAlpha
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

      if (color) {
        this.context.fillStyle = color;
      }

      if (font) {
        this.context.font = font;
      }

      if (fontSize) {
        this.context.font = this.context.font.replace(/\d+/, fontSize);
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

  drawText(node, offsetX, offsetY) {
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

  drawImage(node, offsetX, offsetY) {
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
          width = size$d,
          height = size$d,
          swidth,
          sheight
        } = style;
        const {
          context
        } = this;
        context.drawImage(this.getImage(props.src), sx, sy, swidth || width, sheight || height, offsetX, offsetY, width, height);
      }
    }
  }

  drawBack(node, offsetX, offsetY) {
    const {
      context
    } = this;
    const {
      backgroundImage,
      backgroundColor,
      height,
      width
    } = node.props.style;

    if (backgroundColor) {
      context.save();
      context.beginPath();
      context.rect(offsetX, offsetY, width, height);
      context.fillStyle = backgroundColor;
      context.fill();
      context.closePath();
      context.restore();
    }

    if (backgroundImage) {
      context.save();
      context.beginPath();
      context.rect(offsetX, offsetY, width, height);
      context.fillStyle = context.createPattern(this.getImage(backgroundImage), 'repeat');
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
      context.rect(offsetX, offsetY, width, height);

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

  drawNode(node, offsetX, offsetY, parent) {
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
        this.drawBack(node, offsetX, offsetY);
        this.drawBorder(node, offsetX, offsetY);
      }
    }

    if (tag === 'img') {
      this.drawImage(node, offsetX, offsetY);
    } else if (tag === 'circle') {
      this.drawCircle(node, offsetX, offsetY);
    } else if (tag === 'line') {
      this.drawLine(node, offsetX, offsetX);
    } else if (tag !== 'div' && tag !== 'view') {
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

    context.fillText(text, offsetX + width * x[textAlign], offsetY + height * y[textBaseline]);
  }

  renderAnything(createdNode, offsetX, offsetY, parent) {
    // undefined null
    // string number
    // array
    // class component
    // div node
    if (!isUndefined(createdNode) && !isBoolean(createdNode)) {
      if (isPrimitive(createdNode)) {
        this.drawPrimitive(createdNode, offsetX, offsetY, parent);
      } else if (isArray(createdNode)) {
        createdNode.forEach(child => this.renderAnything(child, offsetX, offsetY, parent));
      } else if (isFunc(createdNode.tag)) {
        // tag 是 function
        this.renderAnything(createdNode.instance.$node, offsetX, offsetY, createdNode.instance); // events of keyboard

        this.keyEventsCollectionKeyframe.forEach(event => {
          const {
            name
          } = event;
          const instance = createdNode.instance;

          if (instance[name]) {
            this.keyEventsCallbackKeyframe.push({
              instance,
              event,
              name
            });
          }
        });
      } else if (isString(createdNode.tag)) {
        // div node
        this.calcNode(createdNode, offsetX, offsetY, parent);
      } else {
        this.drawPrimitive(JSON.stringify(createdNode), offsetX, offsetY, parent);
      }
    }
  }

  calcNode(node, offsetX, offsetY, parent) {
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
          name
        } = event;

        if (event.offsetX >= offsetX && event.offsetX < style.width + offsetX && event.offsetY >= offsetY && event.offsetY < style.height + offsetY) {
          if (node.props[name]) {
            this.mouseEventsCallbackKeyframe.push({
              node,
              event,
              name
            });
          }
        }
      });

      if (style && style.overflow) {
        // context.rect(0, 0, 33, 30)
        context.clip();
      }
    }

    this.drawNode(node, offsetX, offsetY);
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

const loadImage = src => {
  return new Promise(function (resolve, reject) {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () => reject(img));
    img.src = src;
  });
};
const loadSound = src => {
  return new Promise(function (resolve, reject) {
    const audio = new Audio();
    audio.addEventListener('canplay', () => resolve(audio));
    audio.addEventListener('error', () => reject(audio));
    audio.src = src;
  });
};
function loadJSON(url) {
  return fetch(url).then(data => data.json());
}
function loadText(url) {
  return fetch(url).then(data => data.text()).then(data => formatText(data));
}
function loadFont({
  name,
  url
}) {
  const fontface = new FontFace(name, `url("${url}")`);
  document.fonts.add(fontface);
  fontface.load();
  return fontface.loaded;
}

class Sound {
  constructor(sounds) {
    this.sounds = sounds || Object.create(null);
  }

  control(type, name, control) {
    const current = this.sounds[`${type}/${name}`].cloneNode();
    current.loop = type === 'bgm';
    current[control]();
    return current;
  }

  load(dataArray) {
    return Promise.all(dataArray.map(sound => loadSound(`Sound/${sound}`))).then(sounds => {
      sounds.forEach((Sound, i) => this.sounds[dataArray[i]] = Sound);
    });
  }

  play(type, name) {
    return this.control(type, name, 'play');
  }

  pause(type, name) {
    return this.control(type, name, 'pause');
  }

}

class ImageCollection {
  constructor() {
    this.images = Object.create(null);
  }

  load(images, sprite) {
    return Promise.all([...sprite.map(v => `Sprite/${v}.png`), ...images.map(v => `Graph/${v}`)].map(src => {
      return new Promise(resolve => {
        loadImage(`${src}`).then(img => {
          src = src.replace('Graph/', '').replace('Sprite/', '');
          this.images[src] = img;
          resolve();
        });
      });
    }));
  }

}

const load = url => url.endsWith('.dat') ? loadText(`${url}`) : loadJSON(`${url}`);

class Data {
  load() {
    const loaderMap = ['game.json', 'save.json', 'shop.json', 'mapping.dat'];
    return Promise.all(loaderMap.map(url => {
      return load(`Data/${url}`);
    })).then(([game, save, shop, mapping]) => {
      Object.assign(this, {
        game,
        save,
        shop,
        mapping
      });
      const sprites = game.sprites;
      Promise.all(sprites.map(url => load(`Sprite/${url}.dat`))).then(([enemys, items, animates, icons, npcs, terrains, boss]) => {
        Object.assign(this, {
          enemys,
          items,
          animates,
          icons,
          npcs,
          terrains,
          boss
        });
      });
    });
  }

}

class Font {
  constructor() {
    this.$font = Object.create(null);
  }

  load(data) {
    return loadFont(data);
  }

}

function createNode(tag, props, ...children) {
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
  next.instance = new Class(next);
  next.instance.$images = next.$parent.$images;
  next.instance.$sound = next.$parent.$sound;
  next.instance.$data = next.$parent.$data;
  next.instance.$font = next.$parent.$font;
  next.instance.create && next.instance.create();
  renderNode(next);
}

function destoryInstance(pre) {
  // && isBoolean(pre)
  if (!isPrimitive(pre) && !isUndefined(pre)) {
    if (isFunc(pre.tag)) {
      destoryInstance(pre.instance.$node);
      pre.instance.destroy && pre.instance.destroy();
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
  next.instance = pre.instance;
  next.instance.props = next.props;
  renderNode(next);
}

function renderNode(next) {
  next.instance.$node = patchNode(next.instance.$node, next.instance.render());
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
  }

  $c() {
    return createNode.apply(this, arguments);
  }

}

class Animate extends Component {
  interval = -1;
  tick = 0;

  render() {
    const {
      x = 0,
      y = 0,
      width,
      height,
      src,
      maxTick,
      maxInterval = 10,
      center,
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

const size$c = 32;
class Select extends Component {
  styles = {
    select: {
      fontSize: 24,
      textAlign: 'center',
      width: 320
    }
  };

  create() {
    this.activeIndex = this.props.activeIndex || 0;
    const {
      style
    } = this.props;

    if (style) {
      Object.assign(this.styles.select, style);
    }
  }

  onKeyDown({
    code
  }) {
    if (code === 'ArrowDown') {
      this.activeIndex++;

      if (this.activeIndex === this.props.options.length) {
        this.activeIndex = 0;
      }

      this.props.onChange && this.props.onChange(this.activeIndex, this.props.options[this.activeIndex]);
    } else if (code === 'ArrowUp') {
      this.activeIndex--;

      if (this.activeIndex === -1) {
        this.activeIndex += this.props.options.length;
      }

      this.props.onChange && this.props.onChange(this.activeIndex, this.props.options[this.activeIndex]);
    } else if (code === 'Space') {
      this.props.onConfirm && this.props.onConfirm(this.activeIndex, this.props.options[this.activeIndex]);
    } else if (code === 'Escape') {
      this.props.onClose && this.props.onClose();
    } else {
      this.props.onKeyDown && this.props.onKeyDown({
        code
      });
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
    }, this.props.options && this.props.options.length ? this.props.options.map(({
      text
    }, index) => {
      return this.$c("div", {
        style: {
          y: index * size$c,
          height: size$c,
          width: this.styles.select.width,
          borderWidth: this.activeIndex === index ? 2 : 0,
          borderColor: '#ddd'
        },
        onMouseDown: () => this.onMouseDown(index),
        onMouseMove: () => this.setActiveIndex(index)
      }, text);
    }) : null);
  }

}

class Table extends Component {
  render() {
    const {
      dataSource,
      columns,
      size = 32,
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
          width: width * size,
          height: size
        }
      }, title), dataSource.map((rowData, rowIndex) => {
        return this.$c("div", {
          style: {
            x: x,
            y: (rowIndex + 1) * size,
            width: width * size,
            height: size
          }
        }, render ? render.call(this, rowData, data, rowIndex, index) : rowData[dataIndex]);
      }));
      x += width * size;
      return rowEle;
    });
  }

}

class Engine {
  constructor($game) {
    if (this.checkChromeVersion()) {
      this.$state = Object.create(null);
      this.$data = new Data();
      this.$sound = new Sound();
      this.$images = new ImageCollection();
      this.$font = new Font();
      this.$ui = new UI(this);
      this.$root = null;
      this.$game = $game;
      this.gameStart();
    }
  }

  checkChromeVersion() {
    if (location.protocol === 'file:') {
      alert('不能直接运行index.html'); // } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 86) {
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
    this.$root = patchNode(this.$root, createNode.call(this, this.$game, null));
    this.$ui.render(this.$root);
  }

}

const size$b = 32;
class FPS extends Component {
  styles = {
    fps: {
      fontSize: 14,
      textAlign: 'right',
      textBaseline: 'top',
      height: size$b,
      x: size$b * 18
    }
  };
  static getTime = () => performance.now();
  timeStamp = FPS.getTime();

  render() {
    const timeStamp = FPS.getTime();
    const fps = 1000 / (timeStamp - this.timeStamp);
    this.timeStamp = timeStamp;
    return this.$c("div", {
      style: this.styles.fps
    }, `${fps.toFixed()}fps`);
  }

}

const size$a = 32;
class Loading extends Component {
  step = 1;
  angle = -this.step;

  render() {
    this.angle += this.step;

    if (this.angle > 180) {
      this.angle = 0;
    }

    const sAngle = this.angle * 2 - 90;
    const eAngle = Math.sin(this.angle / 180 * Math.PI) * 45;
    const width = size$a * (13 + 5);
    const height = size$a * 13;
    return this.$c("div", {
      style: {
        x: 0,
        y: 0,
        width,
        height
      }
    }, this.props.msg, this.$c("circle", {
      cx: width / 2,
      cy: height / 2,
      r: size$a * 3,
      sAngle: sAngle - eAngle,
      eAngle: sAngle + eAngle,
      stroke: "#4e6ef2",
      strokeWidth: 10
    }));
  }

}

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

const size$9 = 32;
const styles$1 = {
  title: {
    width: size$9 * (13 + 5),
    height: size$9 * 13
  },
  gameName: {
    y: size$9 * 2,
    width: size$9 * (13 + 5),
    height: size$9 * 4,
    font: 'bold 128px 黑体'
  },
  select: {
    x: size$9 * 8,
    y: size$9 * 8,
    width: size$9 * 2
  }
};
class Title extends Component {
  create() {
    this.activeIndex = loadGame() ? 1 : 0;
    this.options = [{
      text: '开始'
    }, {
      text: '继续'
    }];
  }

  onConfirm = isLoad => {
    this.props.onLoadMap(isLoad ? loadGame() : null);
  };

  render() {
    return this.$c("div", {
      style: styles$1.title
    }, this.$c("div", {
      style: styles$1.gameName
    }, this.$data.game.title), this.$c(Animate, {
      data: {
        src: 'stand.png',
        maxTick: 4,
        sy: 4,
        x: 208,
        y: 100,
        width: 632 / 4,
        height: 768 / 8
      }
    }), this.$c(Select, {
      activeIndex: this.activeIndex,
      options: this.options,
      style: styles$1.select,
      onConfirm: this.onConfirm
    }));
  }

}

const size$8 = 32;
class Shop extends Component {
  create() {
    this.shop = JSON.parse(JSON.stringify(this.$data.shop[this.props.shopid]));
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
        x: 3 * size$8,
        y: 2 * size$8,
        width: size$8 * 7,
        height: size$8 * 8,
        borderWidth: 4,
        borderColor: '#deb887',
        font: '32px sans-serif',
        swidth: 500,
        sheight: 701
      }
    }, this.$c("div", {
      style: {
        y: size$8 / 4 * 3,
        width: size$8 * 7,
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
        x: size$8 / 2 * 7,
        y: index * size$8 / 2
      }
    }, text))), this.$c(Select, {
      options: this.shop.choices,
      onConfirm: this.onConfirm,
      style: {
        x: size$8 * 1,
        y: size$8 / 2 * 7,
        width: size$8 * 5,
        fontSize: 16
      },
      onClose: this.props.onClose
    }));
  }

}

const size$7 = 32;
class Battle extends Component {
  tick = 0;
  styles = {
    battle: {
      x: 48,
      y: 48,
      width: size$7 * 15,
      height: size$7 * 10,
      fontSize: 16,
      borderWidth: 3,
      borderColor: '#deb887',
      font: '32px sans-serif',
      swidth: 640,
      sheight: 320
    },
    enemy: {
      x: size$7 * 1,
      y: size$7 * 1
    },
    hero: {
      x: size$7 * 10,
      y: size$7 * 1
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

  render() {
    const enemy = this.enemy;
    const hero = this.hero;
    const tick = location.hostname === 'localhost' ? 1 : 30;

    if (enemy.hp > 0) {
      this.tick++;

      if (this.tick === tick) {
        this.$sound.play('se', 'attack.mp3');

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
            this.$data.save.money += money;
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
      x: size$7,
      y: size$7 * 4.5,
      swidth: size$7,
      sheight: size$7,
      width: 64,
      height: 64,
      sy: 0
    };
    const enemyImageStyle = {
      x: size$7,
      y: size$7 * 4.5,
      swidth: size$7,
      sheight: size$7,
      width: 64,
      height: 64,
      sy: enemy.sy * size$7
    };
    const size64 = 64;
    const vsStyle = {
      font: `bold ${size64}px sans-serif`,
      x: size$7 * (5 + 1.5),
      y: size$7 * 2,
      height: size64,
      width: size64
    };
    const msgStyle = {
      fontSize: 24,
      height: size$7,
      y: size$7 * 8,
      width: size$7 * 15
    };
    return this.$c("img", {
      src: "Battlebacks/mota.jpg",
      style: this.styles.battle
    }, this.battleMsg && this.$c("div", {
      style: msgStyle
    }, this.battleMsg), this.$c("div", {
      style: this.styles.enemy
    }, this.$c("img", {
      src: "enemys.png",
      style: enemyImageStyle
    }), proprety.map((item, index) => {
      return this.$c("div", {
        style: {
          x: 0 * size$7,
          y: index * size$7
        }
      }, this.$c("div", {
        style: {
          width: size$7 * 4,
          textAlign: 'left',
          height: size$7
        }
      }, item.text), this.$c("div", {
        style: {
          width: size$7 * 4,
          textAlign: 'right',
          height: size$7
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
          x: 0 * size$7,
          y: index * size$7
        }
      }, this.$c("div", {
        style: {
          width: size$7 * 4,
          textAlign: 'left',
          height: size$7
        }
      }, hero[item.key]), this.$c("div", {
        style: {
          width: size$7 * 4,
          textAlign: 'right',
          height: size$7
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
      width: 32 * this.width,
      height: 32 * 1,
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'white',
      fontSize: 16,
      textAlign: 'left',
      textBaseline: 'middle'
    }
  };

  onKeyDown({
    code
  }) {
    if (code === 'Space') {
      this.index++;

      if (this.index === this.props.talk.length) {
        this.props.onConfirm();
      } else {
        this.next();
      }
    }

    this.$sound.play('se', 'dialogue.mp3');
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
      x: 32 * 2,
      y: 32 * 2,
      height: 32 * this.current.length
    };
    const rightStyle = {
      x: 32 * 4,
      y: 32 * 6,
      height: 32 * this.current.length
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
          y: 32 * index,
          width: 32 * this.width,
          height: 32
        }
      }, talk);
    }));
  }

}

const size$6 = 32;
const styles = {
  wrap: {
    textAlign: 'left',
    fontSize: 20,
    backgroundImage: 'ground.png',
    width: size$6 * (13 + 5 - 2),
    x: size$6,
    y: size$6,
    height: size$6 * (13 - 2)
  }
};
const columns = [{
  title: null,
  width: 1,

  render(rowData) {
    return this.$c(Animate, {
      data: {
        src: 'enemys.png',
        maxTick: 2,
        width: size$6,
        height: size$6,
        maxInterval: 10,
        sy: rowData.sy
      }
    });
  }

}, {
  title: '名字',
  dataIndex: 'name',
  width: 3
}, {
  title: '生命',
  dataIndex: 'hp',
  width: 2
}, {
  title: '攻击',
  dataIndex: 'atk',
  width: 2
}, {
  title: '防御',
  dataIndex: 'def',
  width: 2
}, {
  title: '损失',
  dataIndex: 'address',
  width: 2,

  render(enemy, hero) {
    if (hero.atk > enemy.def) {
      if (hero.def >= enemy.atk || enemy.hp / (hero.atk - enemy.def) <= hero.hp / (enemy.atk - hero.def)) {
        if (hero.def >= enemy.atk) {
          return 0;
        } else {
          const atkCount = Math.floor(enemy.hp / (hero.atk - enemy.def));
          return (enemy.atk - hero.def) * atkCount;
        }
      }
    }

    return '-';
  }

}];
class EnemyInfo extends Component {
  onKeyDown() {
    this.props.onClose();
  }

  onMouseDown = () => {
    this.props.onClose();
  };

  render() {
    const dataSource = Object.keys(this.props.enemys).map(enemyId => this.$data.enemys[enemyId]);
    return this.$c("div", {
      style: styles.wrap,
      onMouseDown: this.onMouseDown
    }, this.$c(Table, {
      dataSource: dataSource,
      columns: columns,
      data: this.$data.save.hero
    }));
  }

}

const size$5 = 32;
class ShopList extends Component {
  create() {
    const shops = this.$data.save.shops || [];
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
        x: 3 * size$5,
        y: 2 * size$5,
        width: size$5 * 7,
        height: size$5 * 8,
        borderWidth: 4,
        borderColor: '#deb887',
        font: '32px sans-serif',
        swidth: 500,
        sheight: 701
      }
    }, this.$c("div", {
      style: {
        y: size$5 / 4 * 3,
        width: size$5 * 7,
        fontSize: 24
      }
    }, "\u5546\u5E97\u9009\u62E9"), this.$c(Select, {
      style: {
        x: size$5,
        y: 48,
        width: size$5 * 5,
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
  lv: '等级',
  money: '金币',
  hp: '生命',
  atk: '攻击',
  def: '防御',
  exp: '经验'
};
const size$4 = 32;
class Hero extends Component {
  tick = 0;

  create() {
    const hero = Object.assign(this.$data.save.position, {
      width: size$4,
      height: size$4
    });
    this.styles = {
      hero
    };
  }

  isCoincidedTerrains(heroStyle) {
    return this.props.mapTerrains.findIndex(item => item && item && isCoincided(item.props.style, heroStyle));
  }

  isCoincidedEvents(heroStyle) {
    return this.props.mapEvents.findIndex(item => item && item && isCoincided(item.props.style, heroStyle));
  }

  onKeyDown({
    code
  }) {
    const styleHero = this.styles.hero;
    const step = 32;
    let moveVector = null;

    if (code === 'ArrowDown') {
      moveVector = {
        y: step
      };
      styleHero.sy = 0;
    } else if (code === 'ArrowUp') {
      moveVector = {
        y: -step
      };
      styleHero.sy = 3;
    } else if (code === 'ArrowLeft') {
      moveVector = {
        x: -step
      };
      styleHero.sy = 1;
    } else if (code === 'ArrowRight') {
      moveVector = {
        x: step
      };
      styleHero.sy = 2;
    } else if (code === 'KeyS') {
      saveGame(this.$data.save);
      this.$sound.play('se', 'load.mp3');
      this.setMessage('存储成功');
    } else if (code === 'KeyL') {
      this.$sound.play('se', 'load.mp3');
      this.setMessage('读取成功');
    } else if (code === 'KeyX') {
      this.showEnemyInfo = !this.showEnemyInfo;
    } else if (code === 'KeyB') {
      this.buying = true;
    }

    if (moveVector) {
      const vector = updateVector(styleHero, moveVector);
      const terrain = this.isCoincidedTerrains(vector);

      if (terrain !== -1) {
        return;
      }

      const eventIndex = this.isCoincidedEvents(vector);

      if (eventIndex !== -1) {
        if (this.handleEvents(this.props.map.mapEvents[eventIndex])) {
          assignVector(styleHero, vector);
        }

        return;
      }

      assignVector(styleHero, vector);
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
      const info = this.$data.mapping[mapEvent[2]];
      const {
        name,
        type
      } = info;

      if (type === 'items') {
        const item = this.$data.items[name];
        const {
          type
        } = item;

        if (type === '1' || type === '3') {
          this.remove(mapEvent);
          this.updateSaveData('items', name);
          this.setMessage(`获得${item.name}`);
          this.$sound.play('se', type === '1' ? 'item.mp3' : 'constants.mp3');
        } else if (type === '2') {
          this.remove(mapEvent);
          this.updateSaveData(...item.property);
          const [name, property] = item.property;
          let msg = `获得${item.name}`;
          property.forEach(property => {
            const [key, value] = property;
            let propertyName = key;

            if (name === 'hero') {
              propertyName = propertyNames[key];
            } else if (name === 'items') {
              propertyName = this.$data.items[key].name;
            } else if (key === 'money') {
              propertyName = '金币';
            }

            msg += ` ${propertyName}${value > 0 ? '+' : '-'}${value}`;
            this.setMessage(msg);
          });
          this.$sound.play('se', 'item.mp3');
        }

        return true;
      } else if (type === 'enemys') {
        mapEvent[3] = [{
          type: 'enemy',
          data: name
        }];
        this.handleEvents(mapEvent);
        return false;
      } else if (type === 'terrains') {
        if (['yellowDoor', 'redDoor', 'blueDoor', 'steelDoor', 'specialDoor'].includes(name)) {
          const key = name.slice(0, -4) + 'Key';

          if (this.$data.save.items[key]) {
            this.$data.save.items[key]--;
            this.remove(mapEvent);
            this.$sound.play('se', 'door.mp3');
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

      if (type === 'talk') {
        this.talk = data;
        return;
      } else if (type === 'mapLoad') {
        this.props.onLoadMap(data);
      } else if (type === 'openShop') {
        this.shopid = event.id;
        this.$data.save.shops = this.$data.save.shops || {};
        this.$data.save.shops[this.shopid] = this.$data.shop[this.shopid].title;
        return;
      } else if (type === 'getItems') {
        this.updateSaveData('items', data);
      } else if (type === 'removeSelf') {
        this.remove(this.mapEvent);
        return;
      } else if (type === 'moveBlock') {
        this.remove(this.mapEvent);
        return;
      } else if (type === 'enemy') {
        const enemy = this.$data.enemys[data];
        const hero = this.$data.save.hero;

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
      } else if (type === 'updateSaveData') {
        this.updateSaveData(...convertPropertyStr(data));
      } else if (type === 'removeBlock') {
        this.props.removeMapEvent(data);
      } else if (type === 'title') {
        this.props.onTitle();
      } else if (type === 'removeMapBlock') {
        const {
          mapId,
          position
        } = data;
        const {
          x,
          y
        } = position;
        this.$data.save.destroy[[mapId, x, y]] = true;
      } else if (type === 'if') {
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
    } else if (typeof gets === 'string') {
      const saveData = context ? this.$data.save[context] : this.$data.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === 'object') {
      this.updateSaveData(context, Object.entries(gets));
    } else ;
  }

  checkSaveData(context, gets, n = 1) {
    if (Array.isArray(gets)) {
      return gets.some(([id, value]) => this.checkSaveData(context, id, value));
    } else if (typeof gets === 'string') {
      const saveData = context ? this.$data.save[context] : this.$data.save;
      saveData[gets] = saveData[gets] || 0;
      return saveData[gets] + Number(n) >= 0;
    } else if (typeof gets === 'object') {
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
      style: this.styles.hero,
      src: "Characters/hero.png"
    }, this.$c(Animate, {
      data: {
        src: 'Characters/hero.png',
        maxTick: 4,
        width: size$4,
        height: size$4,
        maxInterval: 8,
        sy: this.styles.hero.sy
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
      hero: this.$data.save.hero,
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

const size$3 = 32;
class Status extends Component {
  create() {
    this.walls = [];

    for (let x = 0; x < 5; x++) {
      for (let y = 0; y < 13; y++) {
        if (x === 4 || y === 0 || y === 12) {
          this.walls.push(this.$c("img", {
            src: "terrains.png",
            style: {
              sx: 0,
              sy: size$3 * 2,
              x: x * size$3,
              y: y * size$3
            }
          }));
        }
      }
    }
  }

  render() {
    const {
      map
    } = this.props;
    const {
      save
    } = this.$data;
    const rowProperty = [this.$data.game.title, map.name, save.hero.lv, save.hero.hp, save.hero.atk, save.hero.def, save.hero.exp, save.money, save.items.yellowKey, save.items.blueKey, save.items.redKey];
    return this.$c("div", {
      style: {
        fontSize: 24
      }
    }, this.walls, rowProperty.map((value, index) => {
      return this.$c("div", {
        style: {
          y: (index + 1) * size$3,
          width: size$3,
          height: size$3
        }
      }, this.$c("img", {
        src: "icons.png",
        style: {
          sy: index * size$3,
          width: size$3,
          height: size$3,
          swidth: size$3,
          sheight: size$3
        }
      }), this.$c("div", {
        style: {
          x: size$3,
          height: size$3,
          width: size$3 * 3
        }
      }, value));
    }));
  }

}

const size$2 = 32;
class Map extends Component {
  tick = 0;
  interval = 10;
  styles = {
    map: {
      height: size$2 * 13,
      width: size$2 * 13,
      backgroundImage: 'ground.png'
    },
    statusBar: {
      x: size$2 * 13,
      y: 0,
      backgroundImage: 'ground.png',
      width: size$2 * 5,
      height: 13 * size$2
    }
  };

  create() {
    const bgm = this.props.map.bgm;
    this.mapBgm = this.$sound.play('bgm', bgm);
  }

  destroy() {
    this.props.map.bgm; // this.$sound.pause('bgm', bgm)

    this.mapBgm.pause();
  }

  renderMapTerrains(status) {
    const {
      mapTerrains
    } = this.props.map;
    const tick = this.tick;
    const terrains = [];

    if (!mapTerrains) {
      return;
    }

    let sx = 0;
    mapTerrains.forEach((line, y) => {
      line.forEach((value, x) => {
        if (value) {
          const info = this.$data.mapping[value];
          const {
            type,
            name
          } = info;
          const detail = this.$data[type][name];

          if (type === 'animates') {
            sx = tick % 4 * size$2;
            const style = {
              sy: detail.sy * size$2,
              sx,
              x: x * size$2,
              y: y * size$2,
              height: size$2,
              width: size$2
            };
            terrains.push(this.$c("img", {
              src: type + '.png',
              style: style
            }));
          } else if (type === 'terrains') {
            const style = {
              sy: detail.sy * size$2,
              sx: 0,
              x: x * size$2,
              y: y * size$2,
              height: size$2,
              width: size$2
            };
            terrains.push(this.$c("img", {
              src: type + '.png',
              style: style
            }));
          } else {
            console.error('error type', type, info);
          }
        }
      });
    });
    return terrains;
  }

  renderMapEvents() {
    const {
      mapId,
      destroy = {}
    } = this.$data.save;
    const {
      mapEvents
    } = this.props.map;
    const tick = this.tick;
    const enemys = {};
    this.enemys = enemys;

    if (mapEvents) {
      return mapEvents.map(event => {
        const [x, y, value, events] = event;

        if (destroy[[mapId, x, y]]) {
          return null;
        }

        if (value) {
          const info = this.$data.mapping[value];

          if (info) {
            const {
              type,
              name
            } = info;
            const detail = this.$data[type][name]; // terrains items icons npcs enemys

            let sx = 0;

            if (type === 'npcs' || type === 'enemys') {
              sx = tick % 2 * size$2;
            }

            if (type === 'enemys') {
              enemys[name] = name;
            }

            return this.$c("div", {
              style: {
                x: x * size$2,
                y: y * size$2,
                height: size$2,
                width: size$2
              }
            }, this.$c("img", {
              src: type + '.png',
              style: {
                sy: detail.sy * size$2,
                sx,
                height: size$2,
                width: size$2
              }
            }));
          }
        }

        return null;
      });
    }
  }

  onRemoveMapEvent = mapEvent => {
    const [x, y] = mapEvent;
    const mapId = this.$data.save.mapId;
    this.$data.save.destroy = this.$data.save.destroy || {};
    this.$data.save.destroy[[mapId, x, y]] = 1;
  };
  onTitle = () => {
    this.props.onTitle();
  };
  onMouseDown = e => {// console.warn(e)
    // DFS BFS
  };

  render() {
    this.interval--;

    if (this.interval === 0) {
      this.tick++;
      this.interval = 10;
    }

    const mapTerrains = this.renderMapTerrains();
    const mapEvents = this.renderMapEvents();
    return this.$c("div", null, this.$c("div", {
      style: this.styles.map,
      onMouseDown: this.onMouseDown
    }, mapTerrains, mapEvents), this.$c("div", {
      style: this.styles.statusBar
    }, this.$c(Status, {
      map: this.props.map
    })), this.$c(Hero, {
      mapTerrains: mapTerrains,
      mapEvents: mapEvents,
      enemys: this.enemys,
      map: this.props.map,
      onLoadMap: this.props.onLoadMap,
      onMessage: this.props.onMessage,
      removeMapEvent: this.onRemoveMapEvent,
      onTitle: this.onTitle
    }));
  }

}

const size$1 = 32;
class ScrollText extends Component {
  styles = {
    text: {
      fontSize: 20,
      textAlign: 'left',
      textBaseline: 'top',
      x: 0,
      y: 0,
      width: size$1 * 18,
      height: size$1 * 13
    },
    scroll: {
      x: size$1,
      y: size$1 * 5
    }
  };

  create() {
    const {
      text,
      bgm
    } = this.props.map;
    this.text = text.split('\n');
    this.bgm = this.$sound.play('bgm', bgm);
  }

  destroy() {
    this.bgm.pause();
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
      const {
        type,
        data
      } = this.props.map.event;

      if (type === 'mapLoad') {
        this.props.onClose(data);
      } else if (type === 'title') {
        this.props.onTitle(data);
      }
    }
  };

  render() {
    const style = this.styles.scroll;

    if (style.y > -size$1 * (this.text.length - 2)) {
      const y = 1;
      style.y -= y;
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
        y: index * size$1
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
      this.tick = this.props.tick || 120;
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

    if (this.tick < 30) {
      globalAlpha = this.tick / 30;
    }

    const fontSize = 18;
    return this.$c("div", {
      style: {
        textAlign: 'left',
        fontSize,
        backgroundColor: 'rgba(0,0,0,.7)',
        globalAlpha,
        x: 0,
        y: 0,
        height: 32,
        width: fontSize / 2 * this.length + 10
      }
    }, this.$c("div", {
      style: {
        x: 5,
        height: 32
      }
    }, this.msg));
  }

}

/* eslint-disable multiline-ternary */

const loadMap = mapId => {
  return loadJSON(`Maps/${mapId}.json`);
};

const size = 32;
class Game extends Component {
  styles = {
    app: {
      height: size * 13,
      width: size * 18,
      textAlign: 'center',
      textBaseline: 'middle'
    }
  };

  async create() {
    this.loading = '加载数据';
    await this.$data.load();
    const game = this.$data.game;
    document.title = game.title;

    if (game.font && game.font.load !== false) {
      this.loading = '加载字体';
      const font = game.font;
      await this.$font.load(font);
      this.styles.app.fontFamily = font.name;
    }

    if (game.images) {
      this.loading = '加载图片';
      await this.$images.load(game.images, game.sprites);
    }

    if (game.sounds) {
      this.loading = '加载音乐';
      await this.$sound.load(game.sounds);
    }

    this.loading = false; // this.onLoadMap({ mapId: 'MT1' })
  }

  onLoadMap = async data => {
    this.loading = '加载地图';
    Object.assign(this.$data.save, data);
    this.map = await loadMap(this.$data.save.mapId);
    this.loading = false;
    this.randMapKey = `${this.$data.save.mapId} ${new Date()}`;
  };
  onTitle = () => {
    this.map = null;
  };
  onMessageClose = () => {
    this.msg = null;
  };
  onMessage = msg => {
    this.msg = msg;
  };

  render() {
    // const Title = Test
    return this.$c("div", {
      style: this.styles.app
    }, this.loading ? this.$c(Loading, {
      msg: this.loading
    }) : this.map ? this.map.text ? this.$c(ScrollText, {
      map: this.map,
      onClose: this.onLoadMap,
      onTitle: this.onTitle
    }) : this.$c(Map, {
      map: this.map,
      key: this.randMapKey,
      onLoadMap: this.onLoadMap,
      onMessage: this.onMessage,
      onEvent: this.onEvent
    }) : this.$c(Title, {
      onLoadMap: this.onLoadMap
    }), this.msg && this.$c(Message, {
      msg: this.msg,
      key: this.msg,
      onMessageClose: this.onMessageClose
    }), this.$c(FPS, null));
  }

}

if (typeof window !== 'undefined') {
  window.mota = new Engine(Game);
}
//# sourceMappingURL=bundle.js.map
