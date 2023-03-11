import {
  setSave,
  checkSave,
  setSaveByStr,
  checkSaveByStr,
} from '../utils/game'

export default {
  getItems (data, { $state }) {
    setSave($state, { items: data }, next)
  },

  getItem (data, { $state }) {
    setSave($state, { items: { [data]: 1 } }, next)
  },

  setSave (data, { $state }) {
    setSave($state, data, next)
  },

  checkSave (data, { $state }) {
    return checkSave($state, data, next)
  },

  setSaveByStr (data, { $state }) {
    setSaveByStr($state, data, next)
  },

  checkSaveByStr (data, { $state }) {
    return checkSaveByStr($state, data, next)
  },
}
