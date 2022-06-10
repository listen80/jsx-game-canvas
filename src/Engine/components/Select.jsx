import Component from "../core/Component";

function createLoop(start, end, interval = 1) {
  let n = start
  return () => {
    n += interval
    if (n >= end) {
      n = end - interval
      interval = - interval
    } else if (n < start) {
      n = start
      interval = - interval
    }
    return n
  }
}
export default class Select extends Component {
  styles = {
    select: {
      fontSize: 24,
      textAlign: "center",
      width: 3,
      textBaseline: "middle"
      // backgroundColor: "red",
    },
  };
  tick = 0
  delta = -4

  create() {
    const { style, activeIndex = 0 } = this.props;
    this.activeIndex = activeIndex || 0;
    Object.assign(this.styles.select, style);
    this.styles.select.height = this.props.options.length
  }

  onKeyDown({ code }) {
    if (code === "ArrowDown") {
      this.activeIndex++;
      if (this.activeIndex === this.props.options.length) {
        this.activeIndex = 0;
      }
      this.props.onChange &&
        this.props.onChange(
          this.activeIndex,
          this.props.options[this.activeIndex]
        );
    } else if (code === "ArrowUp") {
      this.activeIndex--;
      if (this.activeIndex === -1) {
        this.activeIndex += this.props.options.length;
      }
      this.props.onChange &&
        this.props.onChange(
          this.activeIndex,
          this.props.options[this.activeIndex]
        );
    } else if (code === "Space") {
      this.props.onConfirm &&
        this.props.onConfirm(
          this.activeIndex,
          this.props.options[this.activeIndex]
        );
    }
  }

  onMouseDown = (index) => {
    this.activeIndex = index;
    this.props.onConfirm &&
      this.props.onConfirm(
        this.activeIndex,
        this.props.options[this.activeIndex]
      );
  };

  setActiveIndex(index) {
    this.activeIndex = index;
  }

  activeBorderColor() {
    const rgb = this.loop()
    return `rgb(${rgb},${rgb},${rgb})`
  }

  loop = createLoop(100, 255, 3)

  render() {
    return (
      <div style={this.styles.select}>
        {this.props.options.map(({ text }, index) => {
          return (
            <div
              style={{
                y: index,
                height: 1,
                width: this.styles.select.width,
                borderWidth: this.activeIndex === index ? 2 : 0,
                borderColor: this.activeBorderColor(),
              }}
              onMouseDown={this.onMouseDown.bind(this, index)}
              onMouseMove={this.setActiveIndex.bind(this, index)}
            >
              {text}
            </div>
          );
        })}
      </div>
    );
  }
}
