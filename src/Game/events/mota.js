export const openShop = "openShop";
export const toggleShowEnemyInfo = "toggleShowEnemyInfo";
export const toggleShowCompass = "toggleShowCompass";
export const toggleShowShopList = "toggleShowShopList";
export const toggleStaticList = "toggleStaticList";
export const toggleShowConfig = "toggleShowConfig";

export default {
  [toggleShowEnemyInfo](data, { $state }) {
    $state.showEnemyInfo = !$state.showEnemyInfo;
  },
  [toggleShowCompass](data, { $state }) {
    $state.showCompass = !$state.showCompass;
  },
  [toggleStaticList](data, { $state }) {
    $state.showStatistics = !$state.showStatistics;
  },
  [toggleShowConfig](data, { $state }) {
    $state.showConfig = !$state.showConfig;
  },
  [toggleShowShopList](data, { $state }) {
    $state.showShopList = !$state.showShopList;
  },
  [openShop](data, { $state }) {
    $state.shopid = data;
  },
};
