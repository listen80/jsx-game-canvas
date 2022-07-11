import { setStorage, getStorage } from './storage'

export function saveGame (save) {
  return setStorage('game', save)
}

export function loadGame () {
  return getStorage('game')
}

export const setSave = ($state, context, gets, n = 1) => {
  debugger
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