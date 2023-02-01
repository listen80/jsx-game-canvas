import Text from "#/Base/Text";
import Column from "#/Grid/Column";

export default {
  onClick({ value }) {
    this.$event.emit("loadMap", {
      map: value,
      x: 6,
      y: 11,
      sx: 0,
      sy: 0,
    });
  },

  renderTable() {
    const result = [];
    const floors = this.$state.save.floors;
    let current = [];
    for (let i = 0; i < floors.length; i++) {
      if (i % 9 === 0) {
        current = [];
        result.push(current);
      }
      current.push(floors[i]);
    }

    return result.map((item, index) => {
      const a = item.map((floor) => {
        return (
          <Text value={floor} size={{ width: 3 }} onClick={this.onClick}></Text>
        );
      });
      return <Column position={{ x: index * 3, y: 1.5 }} render={a}></Column>;
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
        {this.renderTable()}
      </div>
    );
  },
};
