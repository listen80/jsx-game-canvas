export const getType = (o) => Object.prototype.toString.call(o).slice(8, -1);

export const isPrimitive = (value) => {
  const type = typeof value;
  return type === "string" || type === "number";
};

export const isFunc = (f) => typeof f === "function";

export const isArray = (a) => Array.isArray(a);

export const isUndefined = (o) => o === undefined || o === null;

export const isString = (o) => typeof o === "string";

export const isBoolean = (o) => typeof o === "boolean";

export const isObject = (o) => getType(o) === "Object";

export const isComponent = (createNode) =>
  createNode && isObject(createNode.createtor);

export const isElement = (createNode) =>
  createNode &&
  (isString(createNode.createtor) || isFunc(createNode.createtor));

export const isDisalbedElement = (createNode) =>
  isPrimitive(createNode) || isUndefined(createNode) || isBoolean(createNode);
