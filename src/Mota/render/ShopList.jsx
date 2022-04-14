import { Component } from 'Engine'
import Select from '../../Engine/components/Select'

const size = 32

export default class ShopList extends Component {
  create () {
    const shops = this.$data.save.shops || []
    this.options = Object.entries(shops).map(([shopid, text]) => {
      return { text, shopid }
    })
  }

  onConfirm = (index) => {
    if (index > -1) {
      const { shopid } = this.options[index]
      this.props.onConfirm(shopid)
    }
  };

  onKeyDown ({ code }) {
    if (code === 'KeyB') {
      this.props.onClose()
    }
  }

  render () {
    return (
      <img
        src="shop.webp"
        style={{
          x: 3 * size,
          y: 2 * size,
          width: size * 7,
          height: size * 8,
          borderWidth: 4,
          borderColor: '#deb887',
          font: '32px sans-serif',
          swidth: 500,
          sheight: 701,
        }}
      >
        <div style={{ y: (size / 4) * 3, width: size * 7, fontSize: 24 }}>
          商店选择
        </div>
        <Select
          style={{ x: size, y: 48, width: size * 5, fontSize: 16 }}
          options={this.options}
          onConfirm={this.onConfirm}
          onClose={this.props.onClose}
        />
      </img>
    )
  }
}
