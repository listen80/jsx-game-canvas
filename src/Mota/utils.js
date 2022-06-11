export const findPath = (start, dist, mapJSON) => {
  const { mapTerrains: map, height, width } = mapJSON
  const arrivedMap = new Map()
  const path = []

  function checkStep(step) {
    const { x, y } = step
    if ((x < 0 || y < 0 || x === width || y === height) || map[y][x] || arrivedMap.has([x, y] + '') || (x === start.x && y === start.y)) {
      return false
    }
    if (x === dist.x && y === dist.y) {
      while (step.start) {
        path.push(step)
        step = step.start
      }
      console.log(path)
    }
    arrivedMap.set([x, y] + '', 1)
    return true
  }
  function getNextSteps(start) {
    const { x, y } = start
    const arr = [{ x: x - 1, y, sy: 1 }, { x: x + 1, y, sy: 2 }, { x, y: y + 1, sy: 0 }, { x, y: y - 1, sy: 3 }].map((v) => { v.start = start; return v }).filter(checkStep)
    return arr
  }
  const find = (starts, depth) => {
    if (depth === 0) {
      return
    }
    if (starts.length === 0) {
      return
    }
    const next = []
    for (let start of starts) {
      const t = getNextSteps(start)
      next.push(...t)
    }

    find(next, depth - 1)
    return next
  }

  find([start], Infinity)
  return path
}