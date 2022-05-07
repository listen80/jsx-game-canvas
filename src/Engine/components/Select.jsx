import Component from "../core/Component";

const size = 32;

export default class Select extends Component {
  styles = {
    select: {
      fontSize: 24,
      textAlign: "center",
      width: 10,
      height: 3,
      backgroundColor: 'red'
    },
  };

  create() {
    this.activeIndex = this.props.activeIndex || 0;
    const { style } = this.props;
    if (style) {
      Object.assign(this.styles.select, style);
    }
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
                borderColor: "#ddd",
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
