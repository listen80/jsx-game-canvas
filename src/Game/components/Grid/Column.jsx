export default {
  render() {
    let y = 0;
    const { render = [], ...others } = this.props;
    return (
      <div {...others}>
        {render.map((child) => {
          if (!child) {
            return null;
          }
          const { height = 1 } = {};
          const rowEle = <div position={{ y }}>{child}</div>;
          y += height;
          return rowEle;
        })}
      </div>
    );
  },
};
