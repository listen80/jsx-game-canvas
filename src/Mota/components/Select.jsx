import { Component } from "Engine";

export default class Select extends Component {
  loop = this.createLoop(155, 222, 1, 2, true);

  onCreate() {
    const { activeIndex = 0 } = this.props;
    this.activeIndex = activeIndex;
    this.optionSize = this.props.optionSize || {};
    this.optionSize.width = this.optionSize.width || this.props?.style?.width;
    this.optionSize.height = this.optionSize.height || 1;
  }

  onChange() {
    this.props.onChange?.(
      this.props.options[this.activeIndex],
      this.activeIndex
    );
  }

  onConfirm() {
    const option = this.props.options[this.activeIndex];
    if (option) {
      if (this.props.onConfirm) {
        this.props.onConfirm(
          this.props.options[this.activeIndex],
          this.activeIndex
        );
      }
    }
  }

  // onKeyDown({ $key }) {
  //   if ($key === "down") {
  //     this.activeIndex++;
  //     if (this.activeIndex >= this.props.options.length) {
  //       this.activeIndex = 0;
  //     }
  //     this.onChange();
  //   } else if ($key === "up") {
  //     this.activeIndex--;
  //     if (this.activeIndex < 0) {
  //       this.activeIndex += this.props.options.length;
  //     }
  //     this.onChange();
  //   } else if ($key === "confirm") {
  //     this.onConfirm();
  //   }
  // }

  onMouseDown = (event, $node) => {
    this.activeIndex = $node.props.index;
    this.onConfirm();
  };

  onMouseMove = (index, $node) => {
    this.activeIndex = $node.props.index;
    this.onChange();
  };

  render() {
    const { width, height } = this.optionSize || {};
    const rgb = this.loop();
    let y = 0;
    const selects = this.props.options.map(({ text, disabled }, index) => {
      if (disabled) {
        return null;
      }
      const activeStyle = {
        borderWidth: 2,
        backgroundColor: `rgb(${rgb},${rgb},${rgb}, 0.5)`,
      };

      const select = (
        <div
          index={index}
          style={{
            y,
            height,
            width,
            ...(this.activeIndex === index ? activeStyle : null),
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
        >
          {text}
        </div>
      );

      y += height;
      return select;
    });
    return <div style={this.props.style}>{selects}</div>;
  }
}
