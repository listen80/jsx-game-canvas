import { setStorage, getStorage } from 'Engine/utils/storage'

export function saveGame (saveData) {
  return setStorage('game', saveData)
}

export function loadGame () {
  return getStorage('game')
}
