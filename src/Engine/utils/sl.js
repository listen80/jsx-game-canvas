import { setStorage, getStorage } from './storage'
import { convertPropertyStr } from './format'

export function saveGame(save) {
  return setStorage('game', save)
}

export function loadGame() {
  return getStorage('game')
}

export const setSave = ($state, context, gets, n = 1) => {
  const setSave = (context, gets, n = 1) => {
    if (Array.isArray(gets)) {
      gets.forEach(([id, value]) => setSave(context, id, value));
    } else if (typeof gets === "string") {
      const saveData = context ? $state.save[context] : $state.save;
      saveData[gets] = saveData[gets] || 0;
      saveData[gets] += Number(n);
    } else if (typeof gets === "object") {
      setSave(context, Object.entries(gets));
    } else {
      // console.error(gets, n)
    }
  }
  setSave(context, gets, n = 1)
}

export const checkSave = ($state, context, gets, n = 1) => {
  if (Array.isArray(gets)) {
    return gets.some(([id, value]) => checkSave(context, id, value));
  } else if (typeof gets === "string") {
    const saveData = context ? $state.save[context] : $state.save;
    saveData[gets] = saveData[gets] || 0;
    return saveData[gets] + Number(n) >= 0;
  } else if (typeof gets === "object") {
    return checkSave(context, Object.entries(gets), null, 0);
  } else {
    return false;
  }
}

export const setSaveByStr = ($state, str) => {
  return setSave($state, ...convertPropertyStr(str))
}

export const checkSaveByStr = ($state, str) => {
  return checkSave($state, ...convertPropertyStr(str))
}
