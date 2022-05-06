import { createNode } from './Node'

export default class Component {
  constructor ({ props, children }) {
    this.props = props
    this.$node = null
    this.$children = children
    this.$sound.play = () => {
      return {
        pause() {}
      }
    }
    this.$sound.pause = () => {}
  }

  $c () {
    return createNode.apply(this, arguments)
  }

  $sound () {

  }
}
