export function createNode (tag, props, ...children) {
  return {
    tag,
    props,
    children,
  }
}
