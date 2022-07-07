import Hero from "./render/Hero"
import { findPath } from "./utils"

const mockMap = {
  width: 13,
  height: 13,
  mapTerrains: [
    [],
    [],
    [],
    [],
    [, , , , 1, 32, 22, 23, 3],
    [],
    [],
    [, , , , , , 4, 4, 4, 4],
    [],
    [],
    [, , , , 1, 32, 22, 23, 3],
    [],
    [1],

  ]
}

function transform($state, value, x, y) {
  return null
  const info = $state.mapping[value];
  const { type, name } = info;
  const p = $state[type][name];
  const maxTick = {
    animates: 4,
    terrains: 1,
    items: 1,
    npcs: 2,
    enemys: 2,
  }[type]
  const data = {
    src: type,
    sy: detail.sy,
    x: x,
    y: y,
    maxInterval: 30,
    maxTick,
  }

  return data
}

const left = [
  "f",
  "f",
  "f",
  "f",
  "f",
]

class List extends Component {
  onKeyDown() {

  }
  onCreate() {

  }
  render() {

  }
}

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
