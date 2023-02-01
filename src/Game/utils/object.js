export function deepFreeze(object) {
  let propNames = Object.getOwnPropertyNames(object);
  for (let name of propNames) {
    let value = object[name];
    object[name] =
      value && typeof value === "object" ? deepFreeze(value) : value;
  }
  return Object.freeze(object);
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function merge(origin, obj) {
  if (typeof origin === "object") {
    for (const i in origin) {
      if (obj[i] !== undefined) {
        origin[i] = merge(origin[i], obj[i]);
      }
    }
  }
  return origin;
}
