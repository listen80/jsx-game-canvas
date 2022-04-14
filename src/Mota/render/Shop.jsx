import { Component } from 'Engine'
import Select from '../../Engine/components/Select'

const size = 32

export default class Shop extends Component {
  create () {
    this.shop = JSON.parse(JSON.stringify(this.$data.shop[this.props.shopid]))
    this.shop.choices.push({
      text: '离开',
    })
  }

  onConfirm = (index) => {
    if (index === this.shop.choices.length - 1) {
      this.props.onClose()
    } else {
      const { need, effect } = this.shop.choices[index]
      this.props.onShopEvent(need, effect)
    }
  };

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
        <div style={{ y: size / 4 * 3, width: size * 7, fontSize: 24 }}>{this.shop.title}</div>
        <div style={{ x: 0, y: 48, fontSize: 14 }}>
          {this.shop.text.split(/\n/).map((text, index) => (
            <div style={{ x: (size / 2) * 7, y: (index * size) / 2 }}>
              {text}
            </div>
          ))}
        </div>
        <Select
          options={this.shop.choices}
          onConfirm={this.onConfirm}
          style={{
            x: size * 1,
            y: (size / 2) * 7,
            width: size * 5,
            fontSize: 16,
          }}
          onClose={this.props.onClose}
        ></Select>
      </img>
    )
  }
}
