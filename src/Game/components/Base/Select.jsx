import Text from "./Text";

export default {
  onCreate() {
    const { activeIndex = 0 } = this.props;
    this.activeIndex = activeIndex;
    this.optionSize = this.props.optionSize || {};
    this.optionSize.width = this.optionSize.width || this.props?.style?.width;
    this.optionSize.height = this.optionSize.height || 1;
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

  onMouseMove(attrs) {
    this.activeIndex = attrs.index;
    this.onChange();
  },

  render() {
    const selects = this.props.options.map(({ text }, y) => {
      const select = (
        <Text
          index={y}
          align="center"
          value={text}
          position={{ y: y }}
          size={{ width: 3 }}
          // border={{ width: 3 }}
          backgroundColor={`rgba(244,244,31,.5)`}
          onClick={this.onClick}
        ></Text>
      );
      return select;
    });
    return <div {...this.props}>{selects}</div>;
  },
};
