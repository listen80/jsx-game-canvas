import Select from '#/Base/Select'

export default {
  onCreate () {
    const width = 7
    const height = 8

    const shopid = this.$state.shopid

    if (!this.$state.save.shops.includes(shopid)) {
      this.$state.save.shops.push(shopid)
    }

    const shopList = this.$state.config.shopList

    this.shop = shopList[shopid]

    this.textArr = this.shop.text.split(/\n/)
  },

  onConfirm (option, index) {
    const { need, effect } = option
    if (need) {
      if (this.$event.emit('checkSaveByStr', need)) {
        this.$event.emit('setSaveByStr', need)
        this.$event.emit('setSaveByStr', effect)
      } else {
        this.$event.emit('message', '不行')
      }
    } else {
      this.$state.shopid = null
    }
  },

  renderText () {
    return this.textArr.map((text, index) => (
      <div style={{ x: width / 2, y: index / 2 }}>{text}</div>
    ))
  },

  render () {
    const { styles } = this
    return (
      <div style={styles.shop}>
        <div style={styles.title}>{this.shop.title}</div>
        <div style={styles.text}>{this.renderText()}</div>
        <Select
          style={styles.select}
          options={this.options}
          onConfirm={this.onConfirm}
        />
      </div>
    )
  },
}
