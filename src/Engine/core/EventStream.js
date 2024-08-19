const mouseEvents = [
  "Click",
  "ContextMenu",
  "Wheel",
  "MouseDown",
  "MouseUp",
  "MouseMove",
];

const keyEvents = ["KeyDown", "KeyUp"];

const figureEvents = ["TouchStart", "TouchUp", "TouchMove"];

export default class EventStream {
  constructor(engine) {
    this.$render = engine.$render;
    this.canvas = this.$render.canvas;
    this.$engine = engine;
    this.bindEvents();
  }
  callback(e) {
    const { pixelRatio } = this.$engine.config;
    e.canvasX = (e.offsetX / $offsetWidth) * width;
    e.canvasY = (e.offsetY / $offsetHeight) * height;
    e.gameX = e.canvasX / pixelRatio;
    e.gameY = e.canvasY / pixelRatio;
    e.$node = null;

    e.preventDefault();
  }
  colletEvent() {
    this.mouseEventsCollectionKeyframe.push(e);
  }
  resetEvent() {
    this.mouseEventsCollectionKeyframe.splice(
      0,
      this.mouseEventsCollectionKeyframe.length
    );
  }
  bindEvents() {
    const canvas = this.canvas;

    mouseEvents.forEach((name) => {
      canvas.addEventListener(name.toLowerCase(), this.callback.bind(this), {
        passive: false,
      });
    });

    keyEvents.forEach((name) => {
      canvas.addEventListener(name.toLowerCase(), this.callback.bind(this), {
        passive: false,
      });
    });

    figureEvents.forEach((name) => {
      canvas.addEventListener(name.toLowerCase(), this.callback.bind(this), {
        passive: false,
      });
    });
  }
  unbindEvents() {}

  drawNode(node, offsetX, offsetY, offsetParent) {
    const { children } = node;
    children.forEach((child) =>
      this.renderAnything(child, offsetX, offsetY, node)
    );
  }
  renderNode(node, offsetX, offsetY, offsetParent) {
    // 非class component
    // view node
    // { props, children }
    const { context } = this;
    if (node.props) {
      const { position, size } = node.props;

      const { x = 0, y = 0 } = position || {};
      const { width = 0, height = 0 } = size || {};

      const { align, verticalAlign } = node.props;
      if (align) {
        const offsetAlign = { left: 0, center: -0.5, right: -1 };
        const offsetAlignRate = offsetAlign[align];
        offsetX += x + width * offsetAlignRate;
      } else {
        offsetX += x;
      }
      if (verticalAlign) {
        const offsetVerticalAlign = { top: 0, middle: -0.5, bottom: -1 };
        const offsetVerticalAlignRate = offsetVerticalAlign[verticalAlign];
        offsetY += y + height * offsetVerticalAlignRate;
      } else {
        offsetY += y;
      }
      this.calcEvent(node, offsetX, offsetY);
    }
    this.drawNode(node, offsetX, offsetY, offsetParent);
  }
  renderAnything(createdNode, offsetX, offsetY, offsetParent) {
    // undefined null
    // string number
    // array
    // component
    // view node
    if (isDisalbedElement(createdNode)) {
      // const props = offsetParent.props;
      // this.drawText(
      //   {
      //     props,
      //     text: createdNode,
      //   },
      //   offsetX,
      //   offsetY,
      //   offsetParent
      // );
      return;
    }
    if (isArray(createdNode)) {
      createdNode.forEach((child) =>
        this.renderAnything(child, offsetX, offsetY, offsetParent)
      );
    } else if (isComponent(createdNode)) {
      this.renderAnything(createdNode.$node, offsetX, offsetY, offsetParent);
    } else if (isElement(createdNode)) {
      // view node
      this.renderNode(createdNode, offsetX, offsetY, offsetParent);
    }
  }
  calc(node) {
    this.renderAnything(node, 0, 0);
    this.resetEvent();
  }
}
