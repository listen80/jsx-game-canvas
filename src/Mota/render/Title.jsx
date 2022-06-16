import { Component } from "Engine";

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
          x: 7.5,
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

export default class Title extends Component {
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