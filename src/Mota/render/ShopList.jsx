import { Component } from 'Engine'
import Select from '../../Engine/components/Select'

const size = 32

export default class ShopList extends Component {
  style = {
    x: size * 3,
    y: size * 2,
    height: size * 8,
    width: size * 7,
    backgroundImage: 'ground.png',
    borderWidth: 4,
    borderColor: '#deb887',
  };

  create () {
    const shops = this.$data.save.shops || []
    this.options = Object.entries(shops).map(([shopid, text]) => {
      return { text, shopid }
    })
  }

  onConfirm = (index) => {
    const { shopid } = this.options[index]
    this.props.onConfirm(shopid)
  };

  onKeyDown = ({ code }) => {
    if (code === 'KeyB') {
      this.props.onClose()
    }
  };

  render () {
    return (
      <div style={this.style}>
        <div style={{ height: size, width: size * 7, fontSize: 24 }}>
          商店选择
        </div>
        <Select
          style={{ x: size, y: 48, width: 160 }}
          options={this.options}
          onConfirm={this.onConfirm}
          onClose={this.props.onClose}
        />
      </div>
    )
  }
}
