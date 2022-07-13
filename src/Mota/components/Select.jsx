import { Component } from "Engine";

export default class Select extends Component {
  loop = this.createLoop(155, 222, 1, 2, true)

  onCreate() {
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
    const option = this.props.options[this.activeIndex]
    if (option) {
      const { event } = option
      if (event) {
        this.$hook(event)
      }
      if (this.props.onConfirm) {
        this.props.onConfirm(
          this.props.options[this.activeIndex],
          this.activeIndex,
        );
      }
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

  onMouseDown = (event, $node) => {
    this.activeIndex = $node.props.index;
    this.onConfirm()
  };

  onMouseMove = (index, $node) => {
    this.activeIndex = $node.props.index;
    this.onChange();
  }

  render() {
    const { width = 1, height = 1 } = this.props.optionSize || {}
    const rgb = this.loop()
    let y = 0

    const selects = this.props.options.map(({ text, disabled }, index) => {
      if (disabled) {
        return
      }
      const activeStyle = {
        borderWidth: this.activeIndex === index ? 2 : 0,
        backgroundColor: this.activeIndex === index ? `rgb(${rgb},${rgb},${rgb}, 0.5)` : null,
      }
      const select =
        <div
          index={index}
          style={{ y, height, width, ...activeStyle }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
        >
          {text}
        </div>;

      y += height
      return select;
    })
    return <div style={this.props.style}>{selects}</div>;
  }
}
