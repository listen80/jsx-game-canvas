import { Component } from "Engine";

class Title extends Component {
  styles = {
    gameName: {

    },
    select: {
      x: 8,
      y: 8,
      fontSize: 24,
      textAlign: "center",
      textBaseline: "middle"
    },
  };

  create() {
    this.options = [
      {
        text: "开始",
        event: "startGame",
      },
      {
        text: "继续",
        event: "loadGame",
      }
    ];
  }

  onConfirm = (option) => {
    this.$event(option.event)
  };

  render() {
    return (
      <div>
        <div style={this.styles.gameName}>{this.$state.config.title}</div>
        <div style={this.styles.select}>
          <select
            optionSize={{ width: 2, height: 1 }}
            options={this.options}
            onConfirm={this.onConfirm}
          ></select>
        </div>
      </div>
    );
  }
}

const config = {
  children: [
    {
      props: {
        style: {
          y: 2,
          width: 18,
          height: 4,
          textAlign: "center",
          fontSize: 128,
        },
      },
      children: ["魔塔"]
    },
    {
      tag: 'select',
      props: {
        style: {
          x: 8,
          y: 8,
          fontSize: 24,
          textAlign: "center",
          textBaseline: "middle"
        },
        optionSize: {
          width: 3,
        },
        options: [
          {
            text: "开始",
            event: "startGame",
          },
          {
            text: "继续",
            event: "loadGame",
          }
        ]
      }
    }
  ]
}

export default class XX extends Component {
  createNode(config) {
    if (typeof config === 'string') {
      return config
    }
    const { tag = 'div', props, children = [] } = config
    return this.$c(tag, props, ...children.map((c) => this.createNode(c)))
  }
  render() {
    return this.createNode(config)
  }
}