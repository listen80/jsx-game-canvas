import { createNode } from './Node'

export class Component {
  constructor ({ props, children }) {
    this.props = props
    this.$node = null
    this.$children = children
  }

  $c () {
    return createNode.apply(this, arguments)
  }
}

export class KeyEventComponent extends Component {
  create () {
    debugger
  }
}
