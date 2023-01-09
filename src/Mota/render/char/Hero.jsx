import { Component } from "Engine";
import { findPath } from "../../utils/physics";
import Animate from "../../components/Animate";

export default class Hero extends Component {
  moving = false;
  onCreate() {
    this.$event.on("setPath", ($state, data) => {
      this.setPath(data);
    });
  }

  setPath = ({ dist, map }) => {
    this.map = map;
    this.dist = dist;
    this.needFind = true;
  };

  // onKeyDown({ code, $key }) {
  //   const postion = this.$state.save.position;
  //   const step = 1;
  //   let moveVector = null;
  //   if ($key === "down") {
  //     moveVector = { y: step };
  //     postion.sy = 0;
  //     // this.$sound.play('se', 'step.mp3')
  //   } else if ($key === "up") {
  //     moveVector = { y: -step };
  //     postion.sy = 3;
  //     // this.$sound.play('se', 'step.mp3')
  //   } else if ($key === "left") {
  //     moveVector = { x: -step };
  //     postion.sy = 1;
  //     // this.$sound.play('se', 'step.mp3')
  //   } else if ($key === "right") {
  //     moveVector = { x: step };
  //     postion.sy = 2;
  //     // this.$sound.play('se', 'step.mp3')
  //   } else if (code === "KeyS") {
  //     this.$event.emit("saveGame");
  //     this.$event.emit("setMessage", "存储成功");
  //     this.$sound.play("se", "load.mp3");
  //     // this.setMessage("存储成功");
  //   } else if (code === "KeyL") {
  //     this.$event.emit("loadGame");
  //     this.$event.emit("setMessage", "读取成功");
  //     this.$sound.play("se", "load.mp3");
  //   } else if (code === "KeyX") {
  //     this.$state.showEnemyInfo = !this.$state.showEnemyInfo;
  //   } else if (code === "KeyJ") {
  //     this.$state.showJumpFloor = !this.$state.showJumpFloor;
  //   } else if (code === "KeyB") {
  //     this.$state.showShopList = !this.$state.showShopList;
  //   } else if (code === "Backspace") {
  //     this.$event.emit("setSave", {
  //       hero: { lv: 1, hp: 100, atk: 100, def: 100, exp: 100 },
  //     });
  //     this.$event.emit("setSave", { items: { yellowKey: 3, blueKey: 2, redKey: 1 } });
  //     this.$event.emit("setSave", { "": { money: 100 } });
  //   }

  //   if (moveVector) {
  //     // const vector = updateVector(postion, moveVector)
  //     // assignVector(postion, vector)
  //   }
  // }

  runSteps() {
    if (this.current) {
      this.runOneStep();
      return;
    }
    const map = this.props.map;
    if (this.needFind) {
      const { x, y } = this.dist;
      this.path = findPath(this.$state.save.position, { x, y }, this.map);
      this.needFind = false;
    }

    if (this.path && this.path.length) {
      const path = this.path.pop();
      const { x, y, sy } = path;
      if (map[y][x]) {
        this.props.terrains[y][x].$context.onZhuangji(this);
        this.$state.save.position.sy = sy;
      } else {
        this.current = path;
        this.loop = this.createLoop(1 / 4, 1 + 1 / 4, 1, 1 / 4);
        this.runOneStep();
        // this.$state.save.position.x = x;
        // this.$state.save.position.y = y;
        this.$state.save.position.sy = sy;
      }
    }
  }

  runOneStep() {
    const a = this.loop();
    this.$state.save.position.x += (1 / 4) * Math.cos(this.current.rad);
    this.$state.save.position.y += (1 / 4) * Math.sin(this.current.rad);
    if (a === 1) {
      this.current = null;
    }
  }

  render() {
    this.runSteps();
    const data = {
      src: "Characters/hero.png",
      width: 1,
      height: 1,
      maxTick: 4,
      maxInterval: 10,
      sy: this.$state.save.position.sy,
    };
    return (
      <div>
        <div style={this.$state.save.position}>
          <Animate {...data} />
        </div>
      </div>
    );
  }
}
