import { setStorage, getStorage } from './storage'
import { convertPropertyStr } from './format'

export function saveGame(save) {
  return setStorage('game', save)
}

export function loadGame() {
  return getStorage('game')
}

export const setSave = ($state, data, next) => {
   Object.entries(data).forEach(([context, keyValues]) => {
    const saveData = context ? $state.save[context] : $state.save;
    return Object.entries(keyValues).forEach(([key, value]) => {
      saveData[key] = (saveData[key] || 0) + value
      console.log(saveData)
    })
  })
  next()
}

export const checkSave = ($state, data) => {
  console.log(data)
  return Object.entries(data).every(([context, keyValues]) => {
    const saveData = context ? $state.save[context] : $state.save;
    return Object.entries(keyValues).every(([key, value]) => {
      console.log(key, value, keyValues)
      return (saveData[key] || 0) + value >= 0
    })
  })
}

export const setSaveByStr = ($state, data, next) => {
  setSave($state, convertPropertyStr(data), next)
}

export const checkSaveByStr = ($state, data) => {
  return checkSave($state, convertPropertyStr(data))
}
