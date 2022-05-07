import { Component, Select, Animate } from "Engine";

const styles = {
  title: {
    width: '.5',
    height: 13,
    textAlign: "center",
    backgroundColor: 'red'
  },
  gameName: {
    y: 2,
    width: (13 + 5),
    height: 4,
    fontSize: 128,
  },
  select: {
    x: 8,
    y: 8,
    width: 3,
  },
};

export default class Title extends Component {
  create() {
    this.activeIndex = 0;
    this.options = [
      {
        text: "开始",
        event: "startGame",
      },
      {
        text: "继续",
        event: "loadGame",
      },
    ];
  }

  onConfirm = (index) => {
    const event = this.options[index].event
    this.$event(event)
    // console.log(index)
    // this.props.onLoadMap(isLoad ? loadGame() : null);
  };

  render() {
    return (
      <div style={styles.title}>
        <div style={styles.gameName}>{this.$state.config.title}</div>
        <Select
          options={this.options}
          style={styles.select}
          onConfirm={this.onConfirm}
        ></Select>
      </div>
    );
  }
}

// <Animate
// data={{
//   src: "stand.png",
//   maxTick: 4,
//   sy: 4,
//   x: 208,
//   y: 100,
//   width: 632 / 4,
//   height: 768 / 8,
// }}
// ></Animate>
// <Animate
// data={{
//   src: "skill.png",
//   maxTick: 6,
//   sy: 4,
//   width: 912 / 6,
//   height: 800 / 8,
//   x: 308,
//   y: 200,
// }}
// ></Animate>
// <Animate
// data={{
//   src: "run.png",
//   maxTick: 6,
//   width: 996 / 6,
//   height: 824 / 8,
//   sy: 4,
//   x: 108,
//   y: 200,
// }}
// ></Animate>
