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

let curFoucs = null;
class Component {
  constructor({
    props,
    children
  }) {
    this.props = props;
    this.$node = null;
    this.$children = children;
  }

  $c(...argu) {
    const node = createNode.call(this, ...argu);
    return node;
  }

}
class KeyEventComponent extends Component {
  constructor(...argu) {
    super(...argu);

    if (curFoucs) {
      curFoucs.$isFocus = false;
      curFoucs.$nextFocus = this;
    }

    this.$isFocus = true;
    this.$preFocus = curFoucs; // console.warn('create\n', this)

    curFoucs = this;
  }

  destroy() {
    // console.warn('destroy\n', this)
    this.$isFocus = false;

    if (this.$preFocus) {
      this.$preFocus.$isFocus = true;
    }

    curFoucs = this.$preFocus;
  }

}

const moveEvent = 'MouseMove';
const mouseEvents = ['ContextMenu', 'Click', 'Wheel', moveEvent]; //  "MouseDown", "MouseUp"

const keyEvents = ['KeyDown', 'KeyUp'];
class UI {
  constructor(game, screen = {}) {
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    const {
      el,
      width = 32 * (13 + 5),
      height = 32 * 13
    } = screen;
    this.screen = screen;
    this.canvas.width = width;
    this.canvas.height = height;
    const dom = document.querySelector(el) || document.body;
    dom && dom.appendChild(this.canvas);
    this.mergeStyle(baseStyle);
    this.mouseEvents = [];
    this.keyEvents = [];
    this.onMouseClick = [];
    this.bind();
    this.$images = game.$images;
  }

  getImage = src => {
    return this.$images.images[src];
  };

  bind() {
    mouseEvents.forEach(name => {
      this.canvas.addEventListener(name.toLowerCase(), e => {
        e.name = 'on' + name;
        this.mouseEvents.push(e);
        e.preventDefault();
      }, {
        passive: false
      });
    }); // const name = moveEvent
    // this.canvas.addEventListener(name.toLowerCase(), (e) => {
    //   e.name = 'on' + name
    //   this.moveEvent = e
    //   e.preventDefault()
    // }, { passive: false })

    keyEvents.forEach(name => {
      document.addEventListener(name.toLowerCase(), e => {
        e.name = 'on' + name;
        this.keyEvents = e;
      });
    });
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
          width = 32,
          height = 32,
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

  renderPrimitive(text, offsetX, offsetY, parent) {
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
        this.renderPrimitive(createdNode, offsetX, offsetY, parent);
      } else if (isArray(createdNode)) {
        createdNode.forEach(child => this.renderAnything(child, offsetX, offsetY, parent));
      } else if (isFunc(createdNode.tag)) {
        // tag 是 function
        this.renderAnything(createdNode.instance.$node, offsetX, offsetY, parent);
      } else if (isString(createdNode.tag)) {
        // div node
        this.calcNode(createdNode, offsetX, offsetY, parent);
      } else {
        this.renderPrimitive(JSON.stringify(createdNode), offsetX, offsetY, parent);
      }
    }
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
    } else if (tag !== 'div') {
      console.error('drawNode not support, check jsx <', tag);
    }

    this.renderAnything(node.children, offsetX, offsetY, node);
    context.restore();
  }

  calcNode(node, offsetX, offsetY, parent) {
    var _node$props;

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
      offsetY += y;
      this.mouseEvents.forEach(event => {
        const {
          name
        } = event;

        if (event.offsetX >= offsetX && event.offsetX < style.width + offsetX && event.offsetY >= offsetY && event.offsetY < style.height + offsetY) {
          if (name === 'onMouseMove') {
            this.onMouseMove = {
              node,
              event
            };
          } else if (name === 'onClick') {
            this.onMouseClick.push({
              node,
              event
            });
          }
        }
      });
    }

    this.drawNode(node, offsetX, offsetY);
    context.restore();
  }

  runEvent() {
    if (curFoucs && this.keyEvents) {
      const {
        name
      } = this.keyEvents;
      curFoucs[name] && curFoucs[name](this.keyEvents);
    }

    this.keyEvents = null; // if (this.moveEventTarget && this.moveEvent) {
    //   if (moveEventTarget !== this.moveEventTarget) {
    //     if (moveEventTarget) {
    //       moveEventTarget.props.onMouseLeave && moveEventTarget.props.onMouseLeave()
    //     }
    //     moveEventTarget = this.moveEventTarget
    //     moveEventTarget.props.onMouseEnter && moveEventTarget.props.onMouseEnter()
    //   }
    // }

    this.onMouseClick.forEach(({
      node,
      event
    }) => {
      var _node$props2;

      if (node !== null && node !== void 0 && (_node$props2 = node.props) !== null && _node$props2 !== void 0 && _node$props2.onClick) {
        node.props.onClick(event);
      }
    });
    this.onMouseClick = [];
    this.mouseEvents = [];
    this.moveEvent = null;
    this.moveEventTarget = null;
  }

  render(createdNode) {
    this.clearRect();
    this.renderAnything(createdNode, 0, 0, this.canvas);
    this.runEvent();
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
    const current = this.sounds[`${type}/${name}`].cloneNode(); // const current = new Audio()
    // current.src = `${type}/${name}`

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
      alert('不能直接运行index.html');
    } else if (!navigator.userAgent.match(/Chrome\/(\d+)/) || RegExp.$1 < 86) {
      alert('需要chrome最新浏览器');
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

class FPS extends Component {
  fps = 60;
  styles = {
    fps: {
      textAlign: 'left',
      height: 32,
      x: 0
    }
  };
  timeStamp = +new Date();

  render() {
    const timeStamp = +new Date();
    const fps = 1000 / (timeStamp - this.timeStamp);
    const min = 30;
    const warn = this.fps < min && fps < min;
    this.fps = fps;
    this.timeStamp = timeStamp;
    return this.$c("div", {
      style: this.styles.fps
    }, warn ? `${this.fps.toFixed()}fps` : null);
  }

}

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
    const width = 32 * (13 + 5);
    const height = 32 * 13;
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
      r: 32 * 3,
      sAngle: sAngle - eAngle,
      eAngle: sAngle + eAngle,
      stroke: "#4e6ef2",
      strokeWidth: 10
    }));
  }

}

class Select extends KeyEventComponent {
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

  onClick(index) {
    this.activeIndex = index;
    this.props.onConfirm && this.props.onConfirm(this.activeIndex, this.props.options[this.activeIndex]);
  }

  render() {
    const size = 32;
    const borderWidth = 2;
    const select = this.styles.select;
    const {
      width
    } = select;
    return this.$c("div", {
      style: this.styles.select
    }, this.props.options && this.props.options.length ? this.props.options.map((item, index) => {
      const {
        text
      } = item;
      const optionStyle = {
        y: index * size,
        height: size,
        width: width,
        borderWidth: this.activeIndex === index ? borderWidth : 0,
        borderColor: '#ccc'
      };
      return this.$c("div", {
        style: optionStyle,
        onClick: () => this.onClick(index),
        onMouseLeave: e => {
          this.activeIndex = -1;
        },
        onMouseEnter: e => {
          this.activeIndex = index;
        }
      }, text);
    }) : '空空如也');
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

class Title extends Component {
  styles = {
    title: {
      width: 32 * (13 + 5),
      height: 32 * 13
    },
    gameName: {
      y: 40,
      width: 32 * (13 + 5),
      height: 128,
      font: 'bold 128px 黑体'
    },
    select: {
      x: 16 * 16,
      y: 32 * 8,
      width: 64
    }
  };

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
      style: this.styles.title
    }, this.$c("div", {
      style: this.styles.gameName
    }, this.$data.game.title), this.$c(Select, {
      activeIndex: this.activeIndex,
      options: this.options,
      style: this.styles.select,
      onConfirm: this.onConfirm
    }));
  }

}

const options = [{
  text: '物品'
}, {
  text: '技能'
}, {
  text: '装备'
}, {
  text: '状态'
}];
const itemOption = [];
const statusOption = [];
const loadGameOption = [{
  text: 12233
}];
const saveGameOption = [{
  text: 1
}, {
  text: 2
}, {
  text: 3
}, {
  text: 4
}];
const detailOption = [itemOption, statusOption, itemOption, itemOption, loadGameOption, saveGameOption];
class Menu extends Component {
  activeIndex = -1;
  tick = 0;

  create() {
    this.styles = {
      menu: {
        width: 32 * 18,
        height: 32 * 13,
        backgroundColor: 'rgba(0,0,0,.6)'
      },
      detail: {
        x: 32 * 4,
        width: 32 * 9,
        height: 32 * 13,
        borderWidth: 2
      },
      select: {
        width: 32 * 4
      }
    };
  }

  onConfirm = activeIndex => {
    this.activeIndex = activeIndex;
  };

  render() {
    return this.$c("div", {
      style: this.styles.menu
    }, this.$c(Select, {
      options: options,
      style: this.styles.select,
      onConfirm: this.onConfirm,
      onClose: this.props.onClose
    }), this.activeIndex === -1 ? null : this.$c(Select, {
      options: detailOption[this.activeIndex],
      style: this.styles.detail,
      onConfirm: this.onConfirm,
      onClose: () => {
        this.activeIndex = -1;
      }
    }));
  }

}

class Shop extends Component {
  styles = {
    shop: {
      x: 2 * 32,
      y: 2 * 32,
      height: 32 * 7,
      width: 32 * 9,
      fontSize: 24,
      borderWidth: 4,
      borderColor: '#deb887',
      textAlign: 'center',
      backgroundImage: 'ground.png'
    },
    title: {
      x: 16 * 9,
      y: 16
    },
    text: {
      x: 0,
      y: 48,
      fontSize: 14
    },
    select: {
      x: 32 * 2,
      y: 112,
      width: 32 * 5,
      fontSize: 16
    }
  };

  create() {
    this.shop = this.$data.shop[this.props.shopid];
  }

  onConfirm = index => {
    const {
      need,
      effect
    } = this.shop.choices[index];
    this.props.onShopEvent(need, effect);
  };

  render() {
    return this.$c("div", {
      style: this.styles.shop
    }, this.$c("div", {
      style: this.styles.title
    }, this.shop.title), this.$c("div", {
      style: this.styles.text
    }, this.shop.text.split(/\n/).map((text, index) => this.$c("div", {
      style: {
        x: 16 * 9,
        y: index * 16
      }
    }, text))), this.$c(Select, {
      options: this.shop.choices,
      onConfirm: this.onConfirm,
      style: this.styles.select,
      onClose: this.props.onClose
    }));
  }

}

class Battle extends KeyEventComponent {
  tick = 0;
  styles = {
    battle: {
      x: 48,
      y: 48,
      width: 32 * 15,
      height: 32 * 10,
      fontSize: 16,
      borderWidth: 3,
      borderColor: '#deb887',
      font: '32px sans-serif',
      swidth: 640,
      sheight: 320
    },
    enemy: {
      x: 32 * 1,
      y: 32 * 1
    },
    hero: {
      x: 32 * 10,
      y: 32 * 1
    }
  };

  create() {
    this.enemy = JSON.parse(JSON.stringify(this.props.enemy));
    this.hero = this.props.hero;
  }

  onKeyDown() {
    if (this.battleMsg) {
      this.props.onClose && this.props.onClose();
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
      x: 32,
      y: 32 * 4.5,
      swidth: 32,
      sheight: 32,
      width: 64,
      height: 64,
      sy: 0
    };
    const enemyImageStyle = {
      x: 32,
      y: 32 * 4.5,
      swidth: 32,
      sheight: 32,
      width: 64,
      height: 64,
      sy: enemy.sy * 32
    };
    const size = 64;
    const vsStyle = {
      font: `bold ${size}px sans-serif`,
      x: 32 * (5 + 1.5),
      y: 32 * 2,
      height: size,
      width: size
    };
    const msgStyle = {
      fontSize: 24,
      height: 32,
      y: 32 * 8,
      width: 32 * 15
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
          x: 0 * 32,
          y: index * 32
        }
      }, this.$c("div", {
        style: {
          width: 32 * 4,
          textAlign: 'left',
          height: 32
        }
      }, item.text), this.$c("div", {
        style: {
          width: 32 * 4,
          textAlign: 'right',
          height: 32
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
          x: 0 * 32,
          y: index * 32
        }
      }, this.$c("div", {
        style: {
          width: 32 * 4,
          textAlign: 'left',
          height: 32
        }
      }, hero[item.key]), this.$c("div", {
        style: {
          width: 32 * 4,
          textAlign: 'right',
          height: 32
        }
      }, item.text));
    })));
  }

}

class Talk extends KeyEventComponent {
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
    const style = {
      textAlign: 'left',
      fontSize,
      backgroundColor: 'rgba(0,0,0,.7)',
      globalAlpha,
      x: 0,
      y: 0,
      height: 32,
      width: fontSize / 2 * this.length + 10
    };
    return this.$c("div", {
      style: style
    }, this.$c("div", {
      style: {
        x: 5,
        height: 32
      }
    }, this.msg));
  }

}

const styles = {
  wrap: {
    textAlign: 'left',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,1)',
    backgroundImage: 'ground.png',
    borderColor: 'yellow',
    borderWidth: 1,
    width: 32 * (13 + 5),
    height: 32 * 13
  },
  tableoffset: {
    x: 32,
    y: 32
  }
};
const columns = [{
  title: '',
  width: 1,

  render(rowData) {
    return this.$c("div", {
      src: "enemys.png",
      style: {
        height: 32,
        width: 32,
        sy: rowData.sy * 32,
        backgroundColor: 'red'
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
    let cost = 0;

    if (hero.atk > enemy.def) {
      if (hero.def >= enemy.atk || enemy.hp / (hero.atk - enemy.def) <= hero.hp / (enemy.atk - hero.def)) {
        if (hero.def >= enemy.atk) {
          cost = 0;
        } else {
          const atkCount = Math.floor(enemy.hp / (hero.atk - enemy.def));
          cost = (enemy.atk - hero.def) * atkCount;
        }
      } else {
        cost = '-';
      }
    } else {
      cost = '-';
    }

    return cost;
  }

}];

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
        width,
        render
      } = column;
      const rowEle = this.$c("div", {
        style: {
          x: 0,
          y: 0,
          textAlign: 'start',
          textBaseline: 'top'
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

class EnemyInfo extends KeyEventComponent {
  onKeyDown({
    code
  }) {
    if (code === 'KeyX') {
      this.props.onClose();
    }
  }

  onMouseDown() {
    this.props.onClose();
  }

  render() {
    const dataSource = Object.keys(this.props.enemys).map(enemyId => this.$data.enemys[enemyId]);
    return this.$c("div", {
      style: styles.wrap
    }, this.$c("div", {
      style: styles.tableoffset
    }, this.$c(Table, {
      dataSource: dataSource,
      columns: columns,
      data: this.$data.save.hero
    })));
  }

}

class ShopList extends Component {
  style = {
    x: 32 * 3,
    y: 32 * 2,
    height: 32 * 8,
    width: 32 * 7,
    backgroundImage: 'ground.png',
    borderWidth: 4,
    borderColor: '#deb887'
  };

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
    const {
      shopid
    } = this.options[index];
    this.props.onConfirm(shopid);
  };
  onKeyDown = ({
    code
  }) => {
    if (code === 'KeyB') {
      this.props.onClose();
    }
  };

  render() {
    return this.$c("div", {
      style: this.style
    }, this.$c("div", {
      style: {
        height: 32,
        width: 32 * 7,
        fontSize: 24
      }
    }, "\u5546\u5E97\u9009\u62E9"), this.$c(Select, {
      style: {
        x: 32,
        y: 48,
        width: 160
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
class Hero extends KeyEventComponent {
  tick = 0;

  create() {
    const hero = Object.assign(this.$data.save.position, {
      width: 32,
      height: 32
    });
    this.styles = {
      hero
    };
  }

  showEnemyInfo = true;

  isCoincidedTerrains(heroStyle) {
    return this.props.mapTerrains.findIndex(item => item && item && isCoincided(item.props.style, heroStyle));
  }

  isCoincidedEvents(heroStyle) {
    return this.props.mapEvents.findIndex(item => item && item && isCoincided(item.props.style, heroStyle));
  }

  onKeyDown(e) {
    const {
      code
    } = e;
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
      styleHero.sy = 96;
    } else if (code === 'ArrowLeft') {
      moveVector = {
        x: -step
      };
      styleHero.sy = 32;
    } else if (code === 'ArrowRight') {
      moveVector = {
        x: step
      };
      styleHero.sy = 64;
    } else if (code === 'KeyS') {
      saveGame(this.$data.save);
      this.$sound.play('se', 'load.mp3');
      this.msg = '存储成功';
    } else if (code === 'KeyL') {
      this.$sound.play('se', 'load.mp3');
      this.props.onLoadMap(loadGame());
    } else if (code === 'KeyX') {
      this.showEnemyInfo = !this.showEnemyInfo;
    } else if (code === 'KeyB') {
      this.buying = true;
    } else ;

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
          this.msg = `获得${item.name}`;
          this.$sound.play('se', type === '1' ? 'item.mp3' : 'constants.mp3');
        } else if (type === '2') {
          this.remove(mapEvent);
          this.updateSaveData(...item.property);
          const [name, property] = item.property;
          this.msg = `获得${item.name}`;
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

            this.msg += ` ${propertyName}${value > 0 ? '+' : '-'}${value}`;
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
        // console.log(this.mapEvent)
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
            this.msg = `你打不过${enemy.name}`;
            return;
          }
        } else {
          this.mapEvent = null;
          this.eventIndex = 0;
          this.msg = `你的攻击比${enemy.name}的防御低`;
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
  onMenuClose = () => {
    this.showMenu = null;
  };
  onMessageClose = () => {
    this.msg = null;
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
    return this.$c("div", null, this.$c("img", {
      style: this.styles.hero,
      src: "Characters/hero.png"
    }), this.buying && this.$c(ShopList, {
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
    }), this.showMenu && this.$c(Menu, {
      onClose: this.onMenuClose
    }), this.talk && this.$c(Talk, {
      talk: this.talk,
      key: this.talk,
      onConfirm: this.onConfirm
    }), this.msg && this.$c(Message, {
      msg: this.msg,
      key: this.msg,
      onMessageClose: this.onMessageClose
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
            src: "terrains.png",
            style: {
              sx: 0,
              sy: 32 * 2,
              x: x * 32,
              y: y * 32,
              width: 32,
              height: 32
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
          y: (index + 1) * 32,
          width: 32,
          height: 32
        }
      }, this.$c("img", {
        src: "icons.png",
        style: {
          sy: index * 32,
          width: 32,
          height: 32,
          swidth: 32,
          sheight: 32
        }
      }), this.$c("div", {
        style: {
          x: 32,
          height: 32,
          width: 32 * 3
        }
      }, value));
    }));
  }

}

class Map extends Component {
  tick = 0;
  interval = 10;
  styles = {
    map: {
      height: 32 * 13,
      width: 32 * 13,
      backgroundImage: 'ground.png'
    },
    statusBar: {
      x: 32 * 13,
      y: 0,
      backgroundImage: 'ground.png',
      width: 32 * 5,
      height: 13 * 32
    }
  };

  create() {
    const bgm = this.props.map.bgm;
    this.mapBgm = this.$sound.play('bgm', bgm);
  }

  destroy() {
    this.props.map.bgm; // this.$sound.pause('bgm', bgm)

    this.mapBgm.pause();
    console.info(111);
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

    mapTerrains.forEach((line, y) => {
      line.forEach((value, x) => {
        if (value) {
          const info = this.$data.mapping[value];
          const {
            type,
            name
          } = info;
          const detail = this.$data[type][name];
          let sx = 0;

          if (info.type === 'animates') {
            sx = tick % 4 * 32;
          }

          const style = {
            sy: detail.sy * 32,
            sx,
            x: x * 32,
            y: y * 32,
            height: 32,
            width: 32
          };
          terrains.push(this.$c("img", {
            src: type + '.png',
            style: style
          }));
        } else {
          return null;
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

        if (value) {
          const info = this.$data.mapping[value];

          if (info) {
            const {
              type,
              name
            } = info;
            const detail = this.$data[type][name];
            let sx = 0;

            if (type === 'npcs' || type === 'enemys') {
              sx = tick % 2 * 32;
            } // terrians items icons npcs enemys


            if (destroy[[mapId, x, y]]) {
              return null;
            }

            if (type === 'enemys') {
              enemys[name] = name;
            }

            return this.$c("div", {
              style: {
                x: x * 32,
                y: y * 32,
                height: 32,
                width: 32
              }
            }, this.$c("img", {
              src: type + '.png',
              style: {
                sy: detail.sy * 32,
                sx,
                height: 32,
                width: 32
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
  onClick = e => {// console.log(e)
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
      onClick: this.onClick
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
      removeMapEvent: this.onRemoveMapEvent,
      onTitle: this.onTitle
    }));
  }

}

class ScrollText extends KeyEventComponent {
  styles = {
    text: {
      fontSize: 20,
      textAlign: 'left',
      textBaseline: 'top',
      x: 0,
      y: 0,
      width: 32 * 18,
      height: 32 * 13
    },
    scroll: {
      x: 32,
      y: 32 * 5
    }
  };

  create() {
    const {
      text,
      bgm
    } = this.props.map;
    this.text = text.split('\n');
    this.$sound.play('bgm', bgm);
  }

  destroy() {
    const bgm = this.props.map.bgm;
    this.$sound.pause('bgm', bgm);
  }

  onKeyDown({
    code
  }) {
    if (code === 'Space') {
      this.onClick();
    }
  }

  onClick = () => {
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
    const size = 32;
    const style = this.styles.scroll;

    if (style.y > -32 * (this.text.length - 2)) {
      const y = 1;
      style.y -= y;
    } else {
      this.ready = true;
    }

    return this.$c("div", {
      style: this.styles.text,
      onClick: this.onClick
    }, this.$c("div", {
      style: this.styles.scroll
    }, this.text.map((text, index) => this.$c("div", {
      style: {
        y: index * size
      }
    }, text))));
  }

}

const loadMap = mapId => {
  return loadJSON(`Maps/${mapId}.json`);
};

class Game extends Component {
  styles = {
    app: {
      height: 32 * 13,
      width: 32 * 18,
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

    this.loading = false;
    this.onLoadMap({
      mapId: 'MT1'
    });
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
      onEvent: this.onEvent
    }) : this.$c(Title, {
      onLoadMap: this.onLoadMap
    }), this.$c(FPS, null));
  }

}

!function () {
  this.mota = new Engine(Game);
}();
//# sourceMappingURL=bundle.js.map
