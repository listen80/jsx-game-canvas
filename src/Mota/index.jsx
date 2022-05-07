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
      height: 13,
      width: 18,
    },
  };

  async create() {
    this.loading = "加载数据";
  }

  onTitle = () => {
    this.map = null;
  };

  onMessageClose = () => {
    this.msg = null;
  };

  onMessage = (msg) => {
    this.msg = msg;
  };
  renderLoading() {
    return (
      <Loading msg={this.loading} rate={this.$res.loaded / this.$res.total} />
    );
  }
  render() {
    if (this.$res.loading) {
      return this.renderLoading();
    }
    // console.log(this.$state.map)
    return (
      <div style={this.styles.app}>
        {this.$state.map ? (
          this.$state.map.text ? (
            <ScrollText
              map={this.map}
              onClose={this.onLoadMap}
              onTitle={this.onTitle}
            ></ScrollText>
          ) : (
            <Map
              map={this.$state.map}
              key={this.randMapKey}
              onLoadMap={this.onLoadMap}
              onMessage={this.onMessage}
              onEvent={this.onEvent}
            />
          )
        ) : (
          <Title onLoadMap={this.onLoadMap}></Title>
        )}
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
