import { KeyEventComponent } from 'Engine'

export default class Dialog extends KeyEventComponent {
  onKeyDown = () => {
    this.props.onClose && this.props.onClose()
  }

  render () {
    return <div>
      {this.props.msg}
    </div>
  }
}
