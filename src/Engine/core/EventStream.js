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
}
