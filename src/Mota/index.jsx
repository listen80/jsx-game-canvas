import FPS from "./render/FPS";
import Loading from "./render/Loading";
import Title from "./render/Title";
import Map from "./render/Map";
import ScrollText from "./render/ScrollText";
import Message from "./render/Message";
import Test from "./Test";
import Battle from "./render/Battle";

import animate from "./components/Animate.jsx";
import select from "./components/Select.jsx";
import table from "./components/Table.jsx";
import scroll from "./components/Scroll.jsx";
import { registryComponents, Component } from "Engine"

registryComponents({ animate, select, table, scroll, })

export default class Mota extends Component {
  styles = {
    app: {
      width: 18,
      height: 13,
    },
  };

  renderMap() {
    const $res = this.$state.$res
    if ($res.loaded !== $res.total) {
      return <Loading rate={$res.loaded / $res.total} />;
    }
    if (this.$state.map) {
      if (this.$state.map.text) {
        return <ScrollText />;
      }
      return <Map key={this.$state.mapKey} />
    }
    // return <Test></Test>
    return <Title />;
  }

  render() {
    return (
      <div style={this.styles.app}>
        {this.renderMap()}
        <Battle />
        <Message />
        <FPS />
      </div>
    );
  }
}
