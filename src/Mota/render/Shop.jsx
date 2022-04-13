import { Component } from 'Engine'
import Select from '../../Engine/components/Select'

const size = 32

export default class Shop extends Component {
  styles = {
    shop: {
      x: 2 * size,
      y: 2 * size,
      height: size * 7,
      width: size * 9,

      fontSize: 24,
      borderWidth: 4,
      borderColor: '#deb887',
      textAlign: 'center',
      backgroundImage: 'ground.png',
    },
    title: {
      x: (size / 2) * 9,
      y: size / 2,
    },
    text: {
      x: 0,
      y: 48,
      fontSize: 14,
    },
    select: {
      x: size * 2,
      y: (size / 2) * 7,
      width: size * 5,
      fontSize: 16,
    },
  };

  create () {
    this.shop = this.$data.shop[this.props.shopid]
  }

  onConfirm = (index) => {
    const { need, effect } = this.shop.choices[index]
    this.props.onShopEvent(need, effect)
  };

  render () {
    return (
      <div style={this.styles.shop}>
        <div style={this.styles.title}>{this.shop.title}</div>
        <div style={this.styles.text}>
          {this.shop.text.split(/\n/).map((text, index) => (
            <div style={{ x: (size / 2) * 9, y: (index * size) / 2 }}>
              {text}
            </div>
          ))}
        </div>
        <Select
          options={this.shop.choices}
          onConfirm={this.onConfirm}
          style={this.styles.select}
          onClose={this.props.onClose}
        ></Select>
      </div>
    )
  }
}
