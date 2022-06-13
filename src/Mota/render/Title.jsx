import { Component, Animate } from "Engine";
export default class Title extends Component {
  styles = {
    gameName: {
      y: 2,
      textAlign: "center",
      width: 18,
      height: 4,
      fontSize: 128,
    },
    select: {
      x: 7.5,
      y: 8,
      width: 3,
      ...{
        fontSize: 24,
        textAlign: "center",
        width: 3,
        backgroundColor: "red",
        textBaseline: "middle"
      }
    },
  };

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

    // this.$event('loadGame')
  }

  onConfirm = (option) => {
    this.$event(option)
  };

  renderAnimate() {
    return <div>
      {/* <Animate
        data={{
          src: "stand.png",
          maxTick: 4,
          sy: 4,
          x: 208,
          y: 100,
          width: 632 / 4,
          height: 768 / 8,
        }}
      ></Animate> */}
      <Animate
        data={{
          src: "skill.png",
          maxTick: 6,
          maxInterval: 5,
          sy: 4,
          width: 912 / 6 / 32,
          height: 800 / 8 / 32,
          x: 0,
          y: 0,
        }}
      ></Animate>
      {/* <Animate
        data={{
          src: "run.png",
          maxTick: 6,
          width: 996 / 6,
          height: 824 / 8,
          sy: 4,
          x: 3,
          y: 4,
        }}
      ></Animate> */}
    </div>
  }

  render() {
    return (
      <div>
        <div style={this.styles.gameName}>{this.$state.config.title}</div>
        <div style={this.styles.select}>
          <select
            optionSize={{ width: 3, height: 1 }}
            options={this.options}
            onConfirm={this.onConfirm}
          ></select>
        </div>
        {this.renderAnimate()}
      </div>
    );
  }
}

