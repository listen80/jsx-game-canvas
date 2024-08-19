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

  onClick(props) {
    this.activeIndex = props.index;
    this.onConfirm();
  },

  onMouseMove(props) {
    this.activeIndex = props.index;
    this.onChange();
  },

  render() {
    const selects = this.props.options.map(({ text }, y) => {
      const select = (
        <view
          text={text}
          position={{ y: y }}
          size={{ height: 1, width: 3 }}
          align={"center"}
          // border={{ width: 3, height: 5 }}
          // bgColor={`rgba(244,244,31,.5)`}
          index={y}
          onClick={this.onClick}
        ></view>
      );
      return select;
    });
    return <view {...this.props}>{selects}</view>;
  },
};
