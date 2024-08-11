import Grid from "#/Grid/Grid";

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
      <div
        align="center"
        verticalAlign="middle"
        position={{
          x: this.$config.screen.width / 2,
          y: this.$config.screen.height / 2,
        }}
        size={{ width: 9, height: 11 }}
        bgColor="black"
        border={{ width: 2, color: "white" }}
      >
        <div
          text="选择楼层"
          position={{ x: 4.5, y: 0.8 }}
          style={{ font: "25px 楷体" }}
        ></div>
        <Grid
          position={{ x: 0, y: 1.5 }}
          columns={3}
          columnWidth={3}
          render={this.$state.save.floors.map((floor) => {
            return (
              <div
                text={floor}
                position={{ x: 0.2 }}
                size={{ height: 0.9, width: 2.6 }}
                border={{ width: 1, color: "white" }}
                onClick={this.onClick}
              ></div>
            );
          })}
        ></Grid>
      </div>
    );
  },
};
