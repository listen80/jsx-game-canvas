import Component from "../core/Component";

export default class Select extends Component {
  loop = this.createLoop(100, 255, 1, 3)

  create() {
    const { activeIndex = 0 } = this.props;
    this.activeIndex = activeIndex;
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(
        this.props.options[this.activeIndex],
        this.activeIndex,
      );
    }
  }

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm(
        this.props.options[this.activeIndex],
        this.activeIndex,
      );
    }
  }

  onKeyDown({ $key }) {
    if ($key === "down") {
      this.activeIndex++;
      if (this.activeIndex >= this.props.options.length) {
        this.activeIndex = 0;
      }
      this.onChange();
    } else if ($key === "up") {
      this.activeIndex--;
      if (this.activeIndex < 0) {
        this.activeIndex += this.props.options.length;
      }
      this.onChange();
    } else if ($key === "confirm") {
      this.onConfirm()
    }
  }

  onMouseDown = (index) => {
    this.activeIndex = index;
    this.onConfirm()
  };

  onMouseMove(index) {
    this.activeIndex = index;
    this.onChange();
  }

  render() {
    const optionSize = this.props.optionSize
    const rgb = this.loop()
    const arr = this.props.options.map(({ text }, index) => {
      return (
        <div
          style={{
            y: index,
            height: optionSize.height,
            width: optionSize.width,
            borderWidth: this.activeIndex === index ? 2 : 0,
            borderColor: `rgb(${rgb},${rgb},${rgb})`,
          }}
          onMouseDown={this.onMouseDown.bind(this, index)}
          onMouseMove={this.onMouseMove.bind(this, index)}
        >
          {text}
        </div>
      );
    })
    return arr;
  }
}
