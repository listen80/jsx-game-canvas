const getItems = "getItems";
const getItem = "getItem";

export default {
  [getItems](dataList, { $state }) {
    // setSave($state, { items: data }, next);
    dataList.array.forEach((item) => {
      this.emit(getItem, item);
    });
  },

  [getItem](data, { $state }) {
    if (!$state.save.item[data]) {
      $state.save.item[data] = 0;
    }
    $state.save.item[data]++;
  },
};
