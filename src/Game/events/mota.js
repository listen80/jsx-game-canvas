export const openShop = "openShop";
export const toggleShowEnemyInfo = "toggleShowEnemyInfo";
export const toggleShowCompass = "toggleShowCompass";
export const toggleShowShopList = "toggleShowShopList";

export default {
  [openShop](data, { $state }) {
    $state.shopid = data;
  },
  [toggleShowEnemyInfo](data, { $state }) {
    $state.showEnemyInfo = !$state.showEnemyInfo;
  },
  [toggleShowCompass](data, { $state }) {
    $state.showCompass = !$state.showCompass;
  },
  [toggleShowShopList](data, { $state }) {
    $state.showShopList = !$state.showShopList;
  },
};
