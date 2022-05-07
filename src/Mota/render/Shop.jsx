import { Component } from 'Engine'
import Select from '../../Engine/components/Select'

export default class Shop extends Component {
  create () {
    this.shop = JSON.parse(JSON.stringify(this.$state.shop[this.props.shopid]))
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
          x: 3 * 1,
          y: 2 * 1,
          width: 1 * 7,
          height: 1 * 8,
          borderWidth: 4,
          borderColor: '#deb887',
          swidth: 500,
          sheight: 701,
        }}
      >
        <div style={{ y: 1 / 4 * 3, width: 1 * 7, fontSize: 24 }}>{this.shop.title}</div>
        <div style={{ x: 0, y: 48, fontSize: 14 }}>
          {this.shop.text.split(/\n/).map((text, index) => (
            <div style={{ x: (1 / 2) * 7, y: (index * 1) / 2 }}>
              {text}
            </div>
          ))}
        </div>
        <Select
          options={this.shop.choices}
          onConfirm={this.onConfirm}
          style={{
            x: 1 * 1,
            y: (1 / 2) * 7,
            width: 1 * 5,
            fontSize: 16,
          }}
          onClose={this.props.onClose}
        ></Select>
      </img>
    )
  }
}
