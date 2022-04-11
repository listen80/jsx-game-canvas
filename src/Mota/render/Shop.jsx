import { Component } from 'Engine'
import Select from './Select'
export default class Shop extends Component {
  styles = {
    shop: {
      x: 2 * 32,
      y: 2 * 32,
      height: 32 * 7,
      width: 32 * 9,

      fontSize: 24,
      borderWidth: 4,
      borderColor: '#deb887',
      textAlign: 'center',
      backgroundImage: 'ground.png',
    },
    title: {
      x: 16 * 9,
      y: 16,
    },
    text: {
      x: 0,
      y: 48,
      fontSize: 14,
    },
    select: {
      x: 32 * 2,
      y: 112,
      width: 32 * 5,
      fontSize: 16,
    },
  }

  create () {
    this.shop = this.$data.shop[this.props.shopid]
  }

  onConfirm = (index) => {
    const { need, effect } = this.shop.choices[index]
    this.props.onShopEvent(need, effect)
  }

  render () {
    return (
      <div style={this.styles.shop}>
        <div style={this.styles.title}>{this.shop.title}</div>
        <div style={this.styles.text}>
          {this.shop.text.split(/\n/).map((text, index) => <div style={{ x: 16 * 9, y: index * 16 }}>{text}</div>)}
        </div>
        <Select options={this.shop.choices} onConfirm={this.onConfirm} style={this.styles.select} onClose={this.props.onClose}></Select>
      </div>
    )
  }
}
