import { createNode } from './createNode'
let curFoucs = null
export { curFoucs }
export class Component {
  constructor ({ props, children }) {
    this.props = props
    this.$children = children
  }

  $c (...argu) {
    return createNode(...argu)
  }
}

export class KeyEventComponent extends Component {
  constructor (...argu) {
    super(...argu)
    if (curFoucs) {
      curFoucs.$isFocus = false
      curFoucs.$nextFocus = this
    }
    this.$isFocus = true
    this.$preFocus = curFoucs
    console.warn('create\n', this)
    curFoucs = this
  }

  destroy () {
    console.warn('destroy\n', this)
    this.$isFocus = false
    if (this.$preFocus) {
      this.$preFocus.$isFocus = true
    }
    curFoucs = this.$preFocus
  }
}
