import { Component } from 'Engine'

export default class Shop extends Component {
  onCreate() {
    this.shop = JSON.parse(JSON.stringify(this.$state.config.shop[this.props.shopid]))
    this.shop.choices.push({
      text: '离开',
    })
    console.log(this.shop)
  }

  onConfirm = (option, index) => {
    const { need, effect } = option
    if (need) {
      if (this.$hook('checkSaveByStr', need)) {
        this.$hook('setSaveByStr', need)
        this.$hook('setSaveByStr', effect)
      } else {
        console.warn('no')
      }
    } else {
      this.$state.shopid = null
    }
  };

  render() {
    return (
      <div
        style={{
          width: 18,
          height: 13,
          borderColor: '#deb887',
        }}
      >
        <div
          src="shop.webp"
          style={{
            x: 3,
            y: 2,
            width: 7,
            height: 8,
            borderWidth: 4,
            borderColor: '#deb887',
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,.4)',

          }}

        >
          <div style={{ y: 1, width: 7, fontSize: 24 }}>{this.shop.title}</div>
          <div style={{ x: 0, y: 2, fontSize: 14 }}>
            {this.shop.text.split(/\n/).map((text, index) => (
              <div style={{ x: (1 / 2) * 7, y: (index) / 2 }}>
                {text}
              </div>
            ))}
          </div>
          <select
            style={{
              x: 1.5,
              y: 3.5,
              // width: 5,
              // height: 5,
              // backgroundColor: 'red',
              fontSize: 16,
            }}
            optionSize={{ width: 4 }}
            options={this.shop.choices}
            onConfirm={this.onConfirm}
            onClose={this.props.onClose}
          />
        </div>
      </div>
    )
  }
}
