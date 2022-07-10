
import { findPath } from "Engine"
import { registryComponents, Component } from "Engine"

export default class Hero extends Component {
  onCreate() {
    this.$registry('setPath', ($state, data) => {
      this.setPath(data)
    })
  }

  setPath = ({ dist, map }) => {
    const { x, y } = dist
    const path = findPath(this.$state.save.position, { x, y }, map)
    this.path = path
    this.tick = 0
  }

  onKeyDown({ code, $key }) {
    const postion = this.$state.save.position;
    const step = 1;
    let moveVector = null;
    if ($key === "down") {
      moveVector = { y: step };
      postion.sy = 0;
      // this.$sound.play('se', 'step.mp3')
    } else if ($key === "up") {
      moveVector = { y: -step };
      postion.sy = 3;
      // this.$sound.play('se', 'step.mp3')
    } else if ($key === "left") {
      moveVector = { x: -step };
      postion.sy = 1;
      // this.$sound.play('se', 'step.mp3')
    } else if ($key === "right") {
      moveVector = { x: step };
      postion.sy = 2;
      // this.$sound.play('se', 'step.mp3')
    } else if (code === "KeyS") {
      this.$hook('saveGame')
      this.$sound.play("se", "load.mp3");
      this.$hook('setMessage', "存储成功")
      // this.setMessage("存储成功");
    } else if (code === "KeyL") {
      this.$hook('loadGame')
      this.$sound.play("se", "load.mp3");
      this.$hook('setMessage', "读取成功")
    } else if (code === "KeyX") {
      this.showEnemyInfo = !this.showEnemyInfo;
    } else if (code === "KeyB") {
      this.buying = true;
    } else if (code === "Backspace") {
      this.$hook("updateSaveDataX", "hero", { lv: 1, hp: 100, atk: 100, def: 100, exp: 100, });
      this.$hook("updateSaveDataX", "items", { yellowKey: 3, blueKey: 2, redKey: 1 });
      this.$hook("updateSaveDataX", "", { money: 100 });
    }

    if (moveVector) {
      const vector = updateVector(postion, moveVector);

      // const terrain = this.isCoincidedTerrains(vector);
      // if (terrain !== -1) {
      //   return;
      // }

      // const eventIndex = this.isCoincidedEvents(vector);
      // if (eventIndex !== -1) {
      //   if (this.handleEvents(this.props.map.mapEvents[eventIndex])) {
      //     assignVector(postion, vector);
      //   }
      //   return;
      // }

      assignVector(postion, vector);
    }
  }

  runSteps() {
    if (this.tick !== 3) {
      this.tick++
      return
    }
    this.tick = 0
    const map = this.props.map
    if (this.path && this.path.length) {
      const path = this.path.pop()
      const { x, y, sy } = path;
      if (map[y][x]) {
        this.props.terrains[y][x].$context.onZhuangji(this)
        this.$state.save.position.sy = sy;
      } else {
        this.$state.save.position.x = x;
        this.$state.save.position.y = y;
        this.$state.save.position.sy = sy;
      }
    }
  }

  render() {
    this.runSteps()
    const data = {
      src: "Characters/hero.png",
      width: 1,
      height: 1,
      // sheight: 1.5,
      maxTick: 4,
      maxInterval: 10,
      sy: this.$state.save.position.sy,
    }
    return (
      <div onMouseDown={this.onMouseDown}>
        <div style={this.$state.save.position}>
          <animate {...data} />
        </div>
      </div>
    );
  }
}
