import { baseStyle } from "../const/style";
import Draw from "./Draw";
import { defaultHeight, defaultWidth } from "../const/box";
import {
  isFunc,
  isPrimitive,
  isArray,
  isUndefined,
  isString,
  isBoolean,
  isObject,
  isDisalbedElement,
  isComponent,
  isElement,
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

export default class Render extends Draw {
  constructor(config, $loader) {
    super();
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
          e.gameX = e.canvasX / pixelRatio;
          e.gameY = e.canvasY / pixelRatio;
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

  mergeStyle(style) {
    Object.assign(this.context, style);
  }

  drawNode(node, offsetX, offsetY) {
    const { context } = this;
    context.save();
    const { children, props } = node;
    // debugger
    if (props) {
      const {
        style,
        image,
        text,
        border,
        backgroundImage,
        backgroundColor,
        lineGradient,
      } = props;
      this.mergeStyle(style);

      if (backgroundColor) {
        this.drawBackgroundColor(node, offsetX, offsetY);
      }

      if (backgroundImage) {
        this.drawBackgroundImage(node, offsetX, offsetY);
      }

      if (image) {
        this.drawImage(node, offsetX, offsetY);
      }

      if (text != null) {
        this.drawText(node, offsetX, offsetY);
      }

      if (border) {
        this.drawBorder(node, offsetX, offsetY);
      }

      if (lineGradient) {
        this.drawLineGradient(node, offsetX, offsetY);
      }
    }

    children.forEach((child) => this.renderAnything(child, offsetX, offsetY));

    context.restore();
  }

  renderAnything(createdNode, offsetX, offsetY) {
    // undefined null
    // string number
    // array
    // component
    // div node
    // debugger
    if (createdNode) {
      if (isArray(createdNode)) {
        createdNode.forEach((child) =>
          this.renderAnything(child, offsetX, offsetY)
        );
      } else if (isComponent(createdNode)) {
        this.renderAnything(createdNode.$node, offsetX, offsetY);
      } else if (isElement(createdNode)) {
        // div node
        this.renderNode(createdNode, offsetX, offsetY);
      }
    }
  }

  calcEvent(node, offsetX, offsetY) {
    // events of mouse
    const { width = defaultWidth, height = defaultHeight } =
      node.props.size || {};
    this.mouseEventsCollectionKeyframe.forEach((event) => {
      const { gameX, gameY, name } = event;
      if (
        gameX >= offsetX &&
        gameX < width + offsetX &&
        gameY >= offsetY &&
        gameY < height + offsetY &&
        node?.props[name]
      ) {
        event.$node = node;
      }
    });
  }

  runEvents() {
    this.mouseEventsCollectionKeyframe.forEach((event) => {
      const { $node, name } = event;
      if ($node) {
        $node?.props[name]($node.props, event);
      }
      // run($node, event, name);
    });
    // this.keyEventsCollectionKeyframe.forEach((event) => {
    //   const { $context, name } = event;
    //   $context && $context[name] && $context[name](event);
    // });
    this.restoreEvents();
  }

  renderNode(node, offsetX, offsetY) {
    // 非class component
    // div node
    // { props, children }
    const { context } = this;
    context.save();
    if (node.props) {
      const { position, size } = node.props;

      const { x = 0, y = 0 } = position || {};
      const { width = 0, height = 0 } = size || {};

      const { align = "left", verticalAlign = "top" } = node.props;
      if (align) {
        const offsetAlign = { left: 0, center: -0.5, right: -1 };
        const offsetAlignRate = offsetAlign[align];
        offsetX += x + width * offsetAlignRate;
      }
      if (verticalAlign) {
        const offsetVerticalAlign = { top: 0, middle: -0.5, bottom: -1 };
        const offsetVerticalAlignRate = offsetVerticalAlign[verticalAlign];
        offsetY += y + height * offsetVerticalAlignRate;
      }
      this.calcEvent(node, offsetX, offsetY);
    }

    this.drawNode(node, offsetX, offsetY);

    context.restore();
  }

  render(createdNode) {
    this.clearRect();
    this.renderAnything(createdNode, 0, 0, {});
    this.runEvents();
  }
}
