import { Component } from 'Engine'

export default class ShopList extends Component {
  onCreate() {
    const shops = this.$state.save.shops || [{}, {}]
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

  onKeyDown({ code }) {
    if (code === 'KeyB') {
      this.props.onClose()
    }
  }

  render() {
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
        <div style={{ y: (1 / 4) * 3, width: 1 * 7, fontSize: 24 }}>
          商店选择
        </div>
        <select
          style={{ x: 1, y: 48, width: 1 * 5, fontSize: 16 }}
          options={this.options}
          onConfirm={this.onConfirm}
          onClose={this.props.onClose}
        />
      </img>
    )
  }
}
