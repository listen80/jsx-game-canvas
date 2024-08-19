export default {
  render() {
    const { value, size } = this.props;
    const { width = 1, height = 1 } = size || {};
    console.log('in', value)
    return (
      <view {...this.props}>
        <view position={{ x: width / 2, y: height / 2 }} text={value}></view>
      </view>
    );
  },
};
