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

  onTitle = () => {
    this.map = null;
  };

  onMessageClose = () => {
    this.msg = null;
  };

  onMessage = (msg) => {
    this.msg = msg;
  };
  renderDetail() {
    if (this.$res.loading) {
      return <Loading rate={this.$res.loaded / this.$res.total} />;
    }
    if (this.$state.map) {
      if (this.$state.map.text) {
        return <ScrollText></ScrollText>;
      }
      return (
        <Map
          map={this.$state.map}
          key={this.randMapKey}
          onLoadMap={this.onLoadMap}
          onMessage={this.onMessage}
          onEvent={this.onEvent}
        />
      );
    }

    return <Title></Title>;
  }
  create() {
    this.$event('loadGame')
  }
  render() {
    return (
      <div style={this.styles.app}>
        {this.renderDetail()}
        {this.msg && (
          <Message
            msg={this.msg}
            key={this.msg}
            onMessageClose={this.onMessageClose}
          />
        )}
        <FPS />
      </div>
    );
  }
}
