import Grid from "#/Grid/Grid";
import { font25 } from "@/constant/font";

const width = 10;
const height = 11;

export default {
  onClick({ text }) {
    this.$event.emit("toggleShowCompass");
    this.$event.emit("gotoMap", {
      map: text,
      x: 6,
      y: 11,
      sx: 0,
      sy: 0,
    });
  },

  render() {
    return (
      <view
        align="center"
        verticalAlign="middle"
        position={{
          x: this.$config.screen.width / 2,
          y: this.$config.screen.height / 2,
        }}
        size={{ width, height }}
        bgColor="black"
        border={{ width: 2, color: "white" }}
      >
        <view
          text="选择楼层"
          position={{ x: width / 2, y: 0.8 }}
          style={{ font: font25 }}
        ></view>
        <Grid
          align="center"
          position={{ x: width / 2, y: 1.5 }}
          size={{ width: width - 1, height }}
          columns={3}
          columnWidth={3}
          render={this.$state.save.floors.map((floor) => {
            return (
              <view
                text={floor}
                position={{ x: 0.2 }}
                size={{ height: 0.9, width: 2.6 }}
                border={{ width: 1, color: "white" }}
                onClick={this.onClick}
              ></view>
            );
          })}
        ></Grid>
      </view>
    );
  },
};
