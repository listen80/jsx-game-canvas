/* eslint-disable multiline-ternary */
import { Component } from "Engine";
import FPS from "./render/FPS";
import Loading from "./render/Loading";
import Title from "./render/Title";
import Map from "./render/Map";
import ScrollText from "./render/ScrollText";
import Message from "./render/Message";
export default class Index extends Component {
  styles = {
    app: {
      width: 18,
      height: 13,
    },
  };

  renderDetail() {
    if (this.$res.loaded !== this.$res.total) {
      return <Loading rate={this.$res.loaded / this.$res.total} />;
    }
    if (this.$state.map) {
      if (this.$state.map.text) {
        return <ScrollText></ScrollText>;
      }
      return <Map key={this.randMapKey} />
    }
    return <Title></Title>;
  }
  renderMessage() {
    return this.$state.msg && (
      <Message
        key={this.$state.msg}
      />
    )
  }
  render() {
    return (
      <div style={this.styles.app}>
        {this.renderDetail()}
        {this.renderMessage()}
        <FPS />
      </div>
    );
  }
}
