import { baseStyle } from "../const/baseStyle";
import {
  isPrimitive,
  isFunc,
  isArray,
  isUndefined,
  isBoolean,
  isString,
} from "../utils/common";

const mouseEvents = [
  // "ContextMenu",
  // "Click",
  "Wheel",
  "MouseDown",
  // "MouseUp",
  "MouseMove",
];
const keyEvents = ["KeyDown", "KeyUp"];

const size = 32;

export default class Render {
  constructor($state) {
    this.initCanvas();
    this.bindEvents();
    this.$state = $state;
    // this.$images = game.$images
  }

  getImage(src) {
    const image = this.$state.image[src];
    return image;
  }

  initCanvas(screen = {}) {
    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    const { el, width = size * (13 + 5), height = size * 13 } = screen;
    this.screen = screen;
    this.canvas.width = width;
    this.canvas.height = height;
    const dom = document.querySelector(el || '#game') || document.body;
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
    this.mouseEventsCollectionKeyframe = [];

    // key
    this.keyEventsCollectionKeyframe = [];
  }

  bindEvents() {
    this.restoreEvents();
    const canvas = this.canvas;
    const { $offsetWidth, $offsetHeight, width, height } = canvas;
    mouseEvents.forEach((name) => {
      this.canvas.addEventListener(
        name.toLowerCase(),
        (e) => {
          e.name = `on${name}`;
          e.canvasX = (e.offsetX / $offsetWidth) * width;
          e.canvasY = (e.offsetY / $offsetHeight) * height;
          e.gameX = e.canvasX / size | 0;
          e.gameY = e.canvasY / size | 0;
          e.$nodes = []
          this.mouseEventsCollectionKeyframe.push(e);

          e.preventDefault();
        },
        { passive: false }
      );
    });

    keyEvents.forEach((name) => {
      document.addEventListener(name.toLowerCase(), (e) => {
        e.name = `on${name}`;
        e.$key = this.$state.config.control[e.code];
        this.keyEventsCollectionKeyframe.push(e);
      });
    });
  }

  runEvents() {
    this.mouseEventsCollectionKeyframe.forEach((event) => {
      const { $nodes, name } = event;
      $nodes.forEach(($node) => {
        if ($node && $node.props[name]) {
          $node.props[name].call($node.$parent, event, $node);
        }
      })
    });
    this.keyEventsCollectionKeyframe.forEach((event) => {
      const { $context, name } = event;
      $context && $context[name] && $context[name](event);
    });

    this.restoreEvents();
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }

  mergeStyle = (style) => {
    if (style) {
      const {
        fontSize,
        fontFamily,
        font,
        textAlign,
        textBaseline,
        color,
        globalAlpha,
        fillStyle,
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
        this.context.font = this.context.font.replace(
          /[\u4e00-\u9fa5]+/,
          fontFamily
        );
      }
    }
  };

  clearRect() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawText(node, offsetX, offsetY, offsetParent) {
    const { style, text } = node;
    const { context } = this;
    const { x = 0, y = 0 } = style;
    context.fillText(text, offsetX + x, offsetY + y);
  }

  drawImage(node, offsetX, offsetY, offsetParent) {
    const { props } = node;
    if (props) {
      const { style = {} } = props;
      if (style) {
        const {
          sx = 0,
          sy = 0,
          width = 1,
          height = 1,
          swidth,
          sheight,
        } = style;
        const { context } = this;
        const image = this.getImage(props.src);
        if (!image) {
          // console.warn(image, this.$state.image, props);
        } else
          context.drawImage(
            image,
            sx * size,
            sy * size,
            (swidth || width) * size,
            (sheight || height) * size,
            offsetX * size,
            offsetY * size,
            width * size,
            height * size
          );
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
    const { context } = this;
    const { backgroundImage, backgroundColor, height, width } =
      node.props.style;

    // let width = 0
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
      context.fillStyle = context.createPattern(
        this.getImage(backgroundImage),
        "repeat"
      );
      context.fill();
      context.closePath();
      context.restore();
    }
  }

  drawBorder(node, offsetX, offsetY) {
    const { context } = this;
    const { borderWidth, borderColor, height, width } = node.props.style;
    if (borderWidth && borderColor) {
      context.save();
      context.lineWidth = borderWidth;
      context.beginPath();
      context.rect(offsetX * size + borderWidth / 2, offsetY * size + borderWidth / 2, width * size - borderWidth, height * size - borderWidth);
      context.strokeStyle = borderColor;
      context.stroke();
      context.closePath();
      context.restore();
    }
  }

  translate(box) {
    const { context } = this;
    const { style } = box;
    const { x = 0, y = 0 } = style;
    context.translate(x, y);
  }

  transform(box) {
    const { context } = this;
    const { rotate, scale } = box;
    if (rotate) {
      const { angle = 0, x = 0, y = 0 } = rotate;
      context.translate(x, y);
      context.rotate((angle * Math.PI) / 180);
      context.translate(-x, -y);
    }
    if (scale) {
      const { x = 0, y = 0, scaleX = 1, scaleY = 1 } = scale;
      context.translate(x, y);
      context.scale(scaleX, scaleY);
      context.translate(-x, -y);
    }
  }

  drawCircle(node, offsetX, offsetY) {
    const { context } = this;
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
      strokeWidth,
    } = node.props;
    context.arc(
      cx + offsetX,
      cy + offsetY,
      r,
      (sAngle / 180) * Math.PI,
      (eAngle / 180) * Math.PI,
      counterclockwise
    );
    context.strokeStyle = stroke;
    context.lineWidth = strokeWidth;
    context.stroke();
    context.closePath();
    context.restore();
  }

  drawLine(node) {
    const { context } = this;
    const { x1 = 0, y1 = 0, x2 = 200, y2 = 200 } = node.props;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }

  drawNode(node, offsetX, offsetY, offsetParent) {
    const { context } = this;
    context.save();
    const { props, tag } = node;
    if (props) {
      const { style } = props;
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
    const { context } = this;
    const { textAlign, textBaseline } = context;
    const { width = 0, height = 0 } = parent?.props?.style || {};
    const x = { start: 0, left: 0, center: 0.5, right: 1, end: 0 };
    const y = {
      alphabetic: 0,
      hanging: 0,
      ideographic: 0,
      top: 0,
      middle: 0.5,
      bottom: 1,
    };
    // start 默认。文本在指定的位置开始。
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
    context.fillText(
      text,
      (offsetX + width * x[textAlign]) * size,
      (offsetY + height * y[textBaseline]) * size
    );
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
        createdNode.forEach((child) =>
          this.renderAnything(child, offsetX, offsetY, offsetParent)
        );
      } else if (isFunc(createdNode.tag)) {
        // events of keyboard
        this.keyEventsCollectionKeyframe.forEach((event) => {
          const $context = createdNode.$context;
          if (keyEvents.some((name) => $context[`on${name}`])) {
            event.$context = $context;
          }
        });
        // tag 是 function
        this.renderAnything(
          createdNode.$context.$node,
          offsetX,
          offsetY,
          offsetParent
        );
      } else if (isString(createdNode.tag)) {
        // div node
        this.calcNode(createdNode, offsetX, offsetY, offsetParent);
      } else {
        this.drawPrimitive(
          JSON.stringify(createdNode),
          offsetX,
          offsetY,
          offsetParent
        );
      }
    }
  }

  calcEvent(offsetX, offsetY, style, node) {
    // events of mouse
    this.mouseEventsCollectionKeyframe.forEach((event) => {
      const { canvasX, canvasY } = event;
      if (
        canvasX >= offsetX * size &&
        canvasX < (style.width + offsetX) * size &&
        canvasY >= offsetY * size &&
        canvasY < (style.height + offsetY) * size
      ) {
        event.$nodes.push(node);
      }
    });
  }

  calcNode(node, offsetX, offsetY, offsetParent) {
    // 非class component
    // div node
    const { context } = this;
    context.save();

    const style = node?.props?.style;
    if (style) {
      const { x = 0, y = 0 } = style;
      offsetX += x;
      offsetY += y;

      this.calcEvent(offsetX, offsetY, style, node)
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
