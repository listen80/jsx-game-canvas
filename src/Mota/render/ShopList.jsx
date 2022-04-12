import { Component } from 'Engine'
import Select from './Select'
export default class ShopList extends Component {
  style = {
    x: 32 * 3,
    y: 32 * 2,
    height: 32 * 8,
    width: 32 * 7,
    backgroundImage: 'ground.png',
    borderWidth: 4,
    borderColor: '#deb887',
  }

  create () {
    const shops = this.$data.save.shops || []
    this.options = Object.entries(shops).map(([shopid, text]) => {
      return { text, shopid }
    })
  }

  onConfirm = (index) => {
    const { shopid } = this.options[index]
    this.props.onConfirm(shopid)
  }

  render () {
    return (
      <div style={this.style}>
        <div style={{ height: 32, width: 32 * 7, fontSize: 24 }}>商店选择</div>
        <Select style={{ x: 32, y: 48, width: 160 }} options={this.options} onConfirm={this.onConfirm} onClose={this.props.onClose}/>
      </div>

    )
  }
}
