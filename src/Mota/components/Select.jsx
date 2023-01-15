import Text from "./Text";
import LinearGradient from "./LinearGradient";

export default {
  onCreate() {
    const { activeIndex = 0 } = this.props;
    this.activeIndex = activeIndex;
    this.optionSize = this.props.optionSize || {};
    this.optionSize.width = this.optionSize.width || this.props?.style?.width;
    this.optionSize.height = this.optionSize.height || 1;
  },
  createLinearGradient(y) {
    const lineGradient = this.$render.context.createLinearGradient(0, y * 32, 0, y * 32 + 32);
    lineGradient.addColorStop(0, 'rgba(0,0,0,1)');
    lineGradient.addColorStop(0.1, 'rgba(244,244,31,.1)');
    lineGradient.addColorStop(0.9, 'rgba(244,244,31,.1)');
    lineGradient.addColorStop(1, 'rgba(0,0,0,1)');
    lineGradient.y = y
    // this.lineGradient = lineGradient;
    return lineGradient
  },
  onChange() {
    this.props.onChange?.(
      this.props.options[this.activeIndex],
      this.activeIndex
    );
  },

  onConfirm() {
    const option = this.props.options[this.activeIndex];
    if (option) {
      this.props.onConfirm?.(
        this.props.options[this.activeIndex],
        this.activeIndex
      );
    }
  },

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

  onClick(attrs) {
    this.activeIndex = attrs.index;
    this.onConfirm();
  },

  onMouseMove(index, $node) {
    this.activeIndex = $node.props.index;
    this.onChange();
  },

  render() {
    // return <div position={{ x: 1, y: this.y }} size={{ width: 3 }}></div>
    const selects = this.props.options.map(({ text }, y) => {
      const select = (
        <Text
          position={{ y: y }}
          align="center"
          size={{ width: 3 }}
          index={y}
          value={text}
          onClick={this.onClick}
          // backgroundColor={this.lineGradient}
          border={{ width: 3, }}
          backgroundColor={`rgba(244,244,31,.1)`}
          // backgroundColor={this.createLinearGradient(y + 8)}
        >
        </Text>
      )
      return select;
    });
    return <div {...this.props}>{selects}</div>;
  },
};
