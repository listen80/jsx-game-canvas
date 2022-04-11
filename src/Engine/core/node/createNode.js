export function createNode (tag, props, ...children) {
  const $parent = this
  return {
    tag,
    props,
    children,
    $parent,
  }
}
