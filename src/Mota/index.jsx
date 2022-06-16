/* eslint-disable multiline-ternary */
import { Component } from "Engine";
import FPS from "./render/FPS";
import Loading from "./render/Loading";
import Title from "./render/Title";
import Map from "./render/Map";
import ScrollText from "./render/ScrollText";
import Message from "./render/Message";
import Test from "./Test";
import Battle from "./render/Battle";

export default class Index extends Component {
  styles = {
    app: {
      width: 18,
      height: 13,
    },
  };

  renderDetail() {
    const $res = this.$state.$res
    if ($res.loaded !== $res.total) {
      return <Loading rate={$res.loaded / $res.total} />;
    }
    if (this.$state.map) {
      if (this.$state.map.text) {
        return <ScrollText />;
      }
      return <Map key={this.randMapKey} />
    }
    // return <Test></Test>
    return <Title />;
  }
  renderMessage() {
    return this.$state.msg && (
      <Message key={this.$state.msg} />
    )
  }
  render() {
    return (
      <div style={this.styles.app}>
        {this.renderDetail()}
        {this.$state.enemy && (
          <Battle
            enemy={this.$state.enemy}
            hero={this.$state.save.hero}
          />
        )}
        {/* {this.renderMessage()} */}
        {/* <FPS /> */}
      </div>
    );
  }
}
