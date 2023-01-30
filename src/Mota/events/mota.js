export default {
  openShop(data, { $state }) {
    $state.shopid = data;
  },
  toggleShowEnemyInfo(data, { $state }) {
    $state.showEnemyInfo = $state.showEnemyInfo;
  },
  toggleShowJumpFloor(data, { $state }) {
    $state.showJumpFloor = !$state.showJumpFloor;
  },
  openShop(data, { $state }) {
    $state.showJumpFloor = !$state.showJumpFloor;
  },
  openShop(data, { $state }) {
    $state.showShopList = true;
  },
  openShop(data, { $state }) {
    $state.showConfig = !$state.showConfig;
  },
  openShop(data, { $state }) {
    $state.shopid = data;
  },
};
