import { setStorage, getStorage } from './storage'

export function saveGame (save) {
  return setStorage('game', save)
}

export function loadGame () {
  return getStorage('game')
}

export const updateSaveDataX = ($state, context, gets, n = 1) => {
  const updateSaveData = (context, gets, n = 1) => {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => updateSaveData(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? $state.save[context] : $state.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === "object") {
      updateSaveData(context, Object.entries(gets));
    } else {
      // console.error(gets, n)
    }
  }
  updateSaveData(context, gets, n = 1)
}