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
      if (this.props.onConfirm) {
        this.props.onConfirm(
          this.props.options[this.activeIndex],
          this.activeIndex
        );
      }
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

  onClick(event, $node) {
    this.activeIndex = $node.props.index;
    this.onConfirm();
  },

  onMouseMove(index, $node) {
    this.activeIndex = $node.props.index;
    this.onChange();
  },

  render() {
    const { width, height } = this.optionSize || {};
    const selects = this.props.options.map(({ text }, index) => {
      const select = (
        <div
          index={index}
          position={{ y: index }}
          size={{ width: 1, height: 1 }}
          text={text}
          onClick={this.onClick}
          onMouseMove={this.onMouseMove}
        ></div>
      );

      return select;
    });
    return <div {...this.props}>{selects}</div>;
  },
};
