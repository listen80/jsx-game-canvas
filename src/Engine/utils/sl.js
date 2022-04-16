import { setStorage, getStorage } from 'Engine/utils/storage'

export function saveGame (save) {
  return setStorage('game', save)
}

export function loadGame () {
  return getStorage('game')
}
