import Text from "#/Base/Text";
import Grid from "#/Grid/Grid";

export default {
  onClick({ value }) {
    this.$event.emit("toggleShowCompass");
    this.$event.emit("gotoMap", {
      map: value,
      x: 6,
      y: 11,
      sx: 0,
      sy: 0,
    });
  },

  render() {
    return (
      <div
        position={{
          x: this.$config.screen.width / 2,
          y: this.$config.screen.height / 2,
        }}
        size={{ width: 9, height: 11 }}
        align="center"
        verticalAlign="middle"
        backgroundColor="black"
        border={{ width: 2, color: "white" }}
      >
        <Text value="楼层选择" size={{ width: 9 }}></Text>
        <Grid
          position={{ y: 1.5 }}
          columns={3}
          columnWidth={3}
          render={this.$state.save.floors.map((floor) => {
            return (
              <Text
                value={floor}
                size={{ width: 3 }}
                onClick={this.onClick}
              ></Text>
            );
          })}
        ></Grid>
      </div>
    );
  },
};
