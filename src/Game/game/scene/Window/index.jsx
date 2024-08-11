import StatusBar from "./components/StatusBar";
import OperationBar from "./components/OperationBar";
import BlueWall from "./components/BlueWall";
import Floor from './components/Floor';

export default {
  name: "window",
  onCreate() {
    this.wrapProps = {
      backgroundImage: "Background/ground.png",
      size: {
        width: this.$config.screen.width,
        height: this.$config.screen.height,
      },
    };
  },

  render() {
    return (
      <div {...this.wrapProps}>
        <Floor />
        <BlueWall />
        <StatusBar />
        <OperationBar />
      </div>
    );
  },
};
