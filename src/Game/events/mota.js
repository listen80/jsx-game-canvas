export default {
  openShop(data, { $state }) {
    $state.shopid = data;
  },
  toggleShowEnemyInfo(data, { $state }) {
    $state.showEnemyInfo = !$state.showEnemyInfo;
  },
  toggleshowCompass(data, { $state }) {
    $state.showCompass = !$state.showCompass;
  },
};
