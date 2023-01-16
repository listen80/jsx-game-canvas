export default {
  openShop(data, { $state, $sound, $loader }) {
    $state.shopid = data;
  },
  toggleShowEnemyInfo(data, { $state, $sound, $loader }) {
    $state.showEnemyInfo = $state.showEnemyInfo;
  },
  toggleShowJumpFloor(data, { $state, $sound, $loader }) {
    $state.showJumpFloor = !$state.showJumpFloor;
  },
  openShop(data, { $state, $sound, $loader }) {
    this.$state.showJumpFloor = !this.$state.showJumpFloor;
  },
  openShop(data, { $state, $sound, $loader }) {
    this.$state.showShopList = true;
  },
  openShop(data, { $state, $sound, $loader }) {
    this.$state.showConfig = !this.$state.showConfig
  },
  openShop(data, { $state, $sound, $loader }) {
    $state.shopid = data;
  },
};
