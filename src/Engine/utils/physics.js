export function isCoincided(A, B) {
  if (
    A.x >= B.x + B.width ||
    A.x + A.width <= B.x ||
    A.y >= B.y + B.height ||
    A.y + A.height <= B.y
  ) {
    return false
  }
  return true
}

export function updateVector(vector, obj) {
  vector = Object.assign(Object.onCreate(null), vector)
  Object.entries(obj).forEach(([key, value]) => {
    vector[key] += value
  })
  return vector
}

export function assignVector(vector, obj) {
  return Object.assign(vector, obj)
}

export const findPath = (start, dist, mapJSON) => {
  const { map, height, width } = mapJSON
  const arrivedMap = new Map()
  const path = []
  if (start.x === dist.x && start.y === dist.y) {
    return []
  }
  function checkStep(step) {
    const { x, y } = step

    if (x === dist.x && y === dist.y) {
      while (step.start) {
        path.push(step)
        step = step.start
      }
      return false
    }
    if ((x < 0 || y < 0 || x >= width || y >= height) || map[y][x] || arrivedMap.has([x, y] + '') || (x === start.x && y === start.y)) {
      return false
    }

    arrivedMap.set([x, y] + '', 1)
    return true
  }
  function getNextSteps(start) {
    const { x, y } = start
    const arr = [
      { x: x - 1, y, sy: 1, rad: Math.PI, dir: 'left' },
      { x: x + 1, y, sy: 2, rad: 0, dir: 'right' },
      { x, y: y + 1, sy: 0, rad: Math.PI * .5, dir: 'bottom' },
      { x, y: y - 1, sy: 3, rad: Math.PI * 1.5, dir: 'top' }
    ].map((v) => { v.start = start; return v }).filter(checkStep)
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
      if (path.length) {
        return
      }

      next.push(...t)
    }


    find(next, depth - 1)
    return next
  }

  find([start], Infinity)
  return path.map((v) => {
    delete v.start
    return v
  })
}