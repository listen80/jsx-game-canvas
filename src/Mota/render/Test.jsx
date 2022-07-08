import { Component } from "Engine"

export default class Test extends Component {
  styles = {
    wrap: {
      height: 13,
      width: 13,
      borderColor: 'red',
      borderwidth: 2,
      backgroundColor: '#ccc',
      backgroundImage: 'ground.png',
      rotate: 90,
    }
  }
  onKeyDown = ({ code }) => {
  };

  onCreate() {
    // this.$state.map = mockMap
    this.options = [
      {
        text: "开始",
        event: "startGame",
        option: [
          {
            text: "开始",
            event: "startGame",
          },
          {
            text: "继续",
            event: "loadGame",
          },
          {
            text: "继续",
            event: "loadGame",
          },
        ],
      },
      {
        text: "继续",
        event: "loadGame",
        option: [
          {
            text: "开始2",
            event: "startGame",
          },
          {
            text: "继续2",
            event: "loadGame",
          },
          {
            text: "继续2",
            event: "loadGame",
          }
        ]
      },
      {
        text: "继续",
        event: "loadGame",
      },
      {
        text: "继续",
        event: "loadGame",
      },
      {
        text: "继续",
        event: "loadGame",
      },
    ];
    this.index
  }

  onConfirm = (option, index) => {
    this.index = index
  }

  onChange = (option, index) => {
    this.index = index
  }

  onConfirmRight = (option, index) => {
    this.rightIndex = index
  }

  renderMap() {
    // return mockMap.map.map((line, y) => line.map((value, x) => value ? <Animate data={transform(this.$state, value, x, y)}></Animate> : null));
  }
  render() {
    if (this.path && this.path.length) {
      const path = this.path.pop()
      const { x, y, sy } = path;
      this.$state.save.position.x = x;
      this.$state.save.position.y = y;
      this.$state.save.position.sy = sy;
    }
    const rightOptions = this.options[this.index]?.option
    // const bottomOption = rightOptions?.[this.rightIndex];
    // console.log(this.rightOptions, bottomOption)

    return (
      <div style={this.styles.wrap} onMouseDown={this.onMouseDown}>
        {/* {this.renderMap()}
        <Hero /> */}
        <select
          optionSize={{ width: 3, height: 1 }}
          options={this.options}
          onConfirm={this.onConfirm}
          onChange={this.onChange}
        >
        </select>
        <select
          style={{ x: 3, y: 0, }}
          hidden={!rightOptions}
          optionSize={{ width: 3, height: 1 }}
          options={rightOptions}
          onConfirm={this.onConfirmRight}
        ></select>
      </div>
    );
  }
}
