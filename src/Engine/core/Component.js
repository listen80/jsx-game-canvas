import { createNode } from './createNode'
let curFoucs = null
export { curFoucs }
export class Component {
  constructor ({ props, children }) {
    this.props = props
    this.$children = children
  }

  $c = createNode
  $destroy () { }
}

export class KeyEventComponent extends Component {
  constructor (...argu) {
    super(...argu)
    if (curFoucs) {
      curFoucs.$isFocus = false
    }
    this.$isFocus = true
    this.$preFocus = curFoucs
    curFoucs = this
  }

  destroy () {
    this.$isFocus = false
    if (this.$preFocus) {
      this.$preFocus.$isFocus = true
    }
    curFoucs = this.$preFocus
  }
}
