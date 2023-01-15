import { baseStyle } from "../const/baseStyle";
import {
  isPrimitive,
  isFunc,
  isArray,
  isUndefined,
  isBoolean,
  isString,
} from "../utils/type";

const mouseEvents = [
  "Click",
  // "ContextMenu",
  // 'Wheel',
  // "MouseDown",
  // "MouseUp",
  // "MouseMove",
];
const keyEvents = ["KeyDown", "KeyUp"];

export default class Render {
  constructor(config, $loader) {
    this.config = config.screen;
    this.$loader = $loader;
    this.initCanvas(config);
    this.bindEvents();
  }

  getImage(src) {
    const image = this.$loader.$resource.image[src];
    return image;
  }

  initCanvas() {
    const { pixelRatio, el, width = 13, height = 13 } = this.config;

    const canvas = document.createElement("canvas");
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.canvas.width = width * pixelRatio;
    this.canvas.height = height * pixelRatio;

    const dom = document.querySelector(el || "#game") || document.body;
    dom && dom.appendChild(this.canvas);

    this.mergeStyle(baseStyle);
    self.addEventListener("onrepixelRatio", this.getCanvasRenderRect);
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
    const { pixelRatio } = this.config;

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
          e.gameX = (e.canvasX / pixelRatio) | 0;
          e.gameY = (e.canvasY / pixelRatio) | 0;
          e.$node = null;
          this.mouseEventsCollectionKeyframe.push(e);

          e.preventDefault();
        },
        { passive: false }
      );
    });

    // keyEvents.forEach((name) => {
    //   document.addEventListener(name.toLowerCase(), (e) => {
    //     e.name = `on${name}`
    //     e.$key = this.$state.config.control[e.code]
    //     this.keyEventsCollectionKeyframe.push(e)
    //   })
    // })
  }

  toDataURL() {
    return this.canvas.toDataURL();
  }

  mergeStyle = (style) => {
    Object.assign(this.context, style);
  };

  clearRect() {
    const { context, canvas } = this;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawImage(node, offsetX, offsetY) {
    const { pixelRatio } = this.config;
    const { attrs } = node;
    const { sposition = {}, spixelRatio = {}, image } = attrs;
    const { width = 1, height = 1 } = attrs.size || {};
    const { context } = this;

    const { sx = 0, sy = 0 } = sposition;
    const { swidth = width, sheight = height } = spixelRatio;
    const img = this.getImage(image);
    if (img) {
      context.drawImage(
        img,
        sx * pixelRatio,
        sy * pixelRatio,
        swidth * pixelRatio,
        sheight * pixelRatio,
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );
    } else {
      console.warn(attrs);
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
    const { pixelRatio } = this.config;
    const { context } = this;
    const { backgroundImage, backgroundColor, height, width } =
      node.props.style;

    if (backgroundColor) {
      context.save();
      context.beginPath();
      context.rect(
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );
      context.fillStyle = backgroundColor;
      context.fill();
      context.closePath();
      context.restore();
    }
    if (backgroundImage) {
      if (!this.getImage(backgroundImage)) {
        console.warn(backgroundImage);
        return;
      }
      context.save();
      context.beginPath();
      context.rect(
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );

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
    const { pixelRatio } = this.config;
    const { context } = this;
    const { borderWidth, borderColor } = node.attrs.border;
    const { width = 1, height = 1 } = node.attrs.size || {};
    if (borderWidth) {
      context.save();
      context.lineWidth = borderWidth;
      context.beginPath();
      context.rect(
        offsetX * pixelRatio + borderWidth / 2,
        offsetY * pixelRatio + borderWidth / 2,
        width * pixelRatio - borderWidth,
        height * pixelRatio - borderWidth
      );
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

  drawBackgroundColor(context, node, offsetX, offsetY, offsetParent) {
    const { backgroundColor } = node;
    const { height, width } = node;
    if (backgroundColor) {
      context.beginPath();
      context.rect(
        offsetX * pixelRatio,
        offsetY * pixelRatio,
        width * pixelRatio,
        height * pixelRatio
      );
      context.save();
      context.fillStyle = backgroundColor;
      context.fill();
      context.restore();
      context.closePath();
    }
  }

  drawNode(node, offsetX, offsetY, offsetParent) {
    const { context } = this;
    context.save();
    const { children, attrs } = node;
    const { style, image, text, border } = attrs;
    this.mergeStyle(style);

    // this.drawBackgroundColor(context, node, offsetX, offsetY, offsetParent);

    if (image) {
      this.drawImage(node, offsetX, offsetY);
    }

    if (text) {
      this.drawText(text, offsetX, offsetY);
    }

    if (border) {
      this.drawBorder(node, offsetX, offsetY);
    }

    children.forEach((child) =>
      this.renderAnything(child, offsetX, offsetY, offsetParent)
    );

    context.restore();
  }

  drawText(text, offsetX, offsetY) {
    const { context } = this;
    const { pixelRatio } = this.config;

    context.fillText(text, offsetX * pixelRatio, offsetY * pixelRatio);
  }

  renderAnything(createdNode, offsetX, offsetY, offsetParent) {
    // undefined null
    // string number
    // array
    // new class component
    // div node
    if (createdNode) {
      if (Array.isArray(createdNode)) {
        createdNode.forEach((child) =>
          this.renderAnything(child, offsetX, offsetY, offsetParent)
        );
      } else if (createdNode.type === "object") {
        this.renderAnything(createdNode.$node, offsetX, offsetY, offsetParent);
      } else if (createdNode.type === "string") {
        // div node
        // createdNode.offsetParent = offsetParent;
        this.renderNode(createdNode, offsetX, offsetY, offsetParent);
      }
    }
  }

  calcEvent(node, offsetX, offsetY) {
    // events of mouse
    const { size = {} } = node;
    const { width = 0, height = 0 } = size;
    this.mouseEventsCollectionKeyframe.forEach((event) => {
      const { gameX, gameY } = event;
      if (
        gameX >= offsetX &&
        gameX < width + offsetX &&
        gameY >= offsetY &&
        gameY < height + offsetY
      ) {
        debugger;
        event.$node = node;
      }
    });
  }

  runEvents() {
    function run($node, event, name) {
      if ($node) {
        $node.props &&
          $node.props[name] &&
          $node.props[name].call($node.$parent, event, $node);
        run($node.offsetParent, event, name);
      }
    }
    this.mouseEventsCollectionKeyframe.forEach((event) => {
      const { $node, name } = event;
      run($node, event, name);
    });
    // this.keyEventsCollectionKeyframe.forEach((event) => {
    //   const { $context, name } = event;
    //   $context && $context[name] && $context[name](event);
    // });
    this.restoreEvents();
  }

  renderNode(node, offsetX, offsetY, offsetParent) {
    // 非class component
    // div node
    // { attrs, children }
    const { context } = this;
    context.save();

    const { x = 0, y = 0 } = node.attrs.position || {};

    offsetX += x;
    offsetY += y;

    this.calcEvent(node, offsetX, offsetY);
    this.drawNode(node, offsetX, offsetY, offsetParent);

    context.restore();
  }

  render(createdNode) {
    this.clearRect();
    this.renderAnything(createdNode, 0, 0, {});
    this.runEvents();
  }
}
