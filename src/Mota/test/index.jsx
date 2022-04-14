import { Component, Animate, Scroll } from 'Engine'

const run = {
  src: 'run.png',
  maxTick: 6,
  width: 996 / 6,
  height: 824 / 8,
}

const stand = {
  src: 'stand.png',
  maxTick: 4,
  width: 632 / 4,
  height: 768 / 8,
}

const skill = {
  src: 'skill.png',
  maxTick: 4,
  width: 912 / 6,
  height: 800 / 8,
  loop: false,
}

const fire = {
  src: 'fire.png',
  maxTick: 9,
  width: 2907 / 9,
  height: 360 / 1,
  loop: false,
}
const fireFlys = {
  src: 'fireFlys.png',
  maxTick: 9,
  width: 735 / 7,
  height: 98,
  loop: false,
}

const magic = {
  src: 'magic.jpeg',
  maxTick: 9,
  width: 14400 / 18,
  height: 600,
  loop: false,
}

export default class Test extends Component {
  onKeyDown = ({ code }) => {
    this.data.x = 200
  };

  create () {
    this.data = run
    this.data.x = 0
    this.data.sy = 2
  }

  render () {
    this.data.x += 3
    if (this.data.x > 400) {
      this.data.x = 0
    }
    return (
      <div>
        <Animate data={ {
          src: 'run.png',
          maxTick: 6,
          width: 996 / 6,
          height: 824 / 8,
        }}></Animate>
      </div>
    )
  }

  destroy () {
    super.destroy()
  }
}
