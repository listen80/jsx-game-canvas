import Text from '#/Base/Text'

export default {
  onCreate () {
    this.wrapProps = {
      position: { x: 18, y: 1 },
      style: { font: '24px 楷体' },
    }
  },

  onClick ({ event }) {
    if (event) {
      this.$event.emit(event)
    }
  },

  render () {
    const rowProperty = [
      { text: this.$config.title, sposition: { sy: 0 } },
      { text: this.$state.map.name, sposition: { sy: 1 } },
      {
        text: '怪物',
        sposition: { sy: 11 },
        event: 'toggleShowEnemyInfo',
      },
      {
        text: '楼层',
        sposition: { sy: 12 },
        event: 'toggleShowCompass',
      },
      {
        text: '商店',
        sposition: { sy: 13 },
        event: 'toggleShowShopList',
      },
      {
        text: '读档',
        sposition: { sy: 15 },
        event: 'loadGame',
      },
      {
        text: '存档',
        sposition: { sy: 14 },
        event: 'saveGame',
      },
      {
        text: '设置',
        sposition: { sy: 16 },
        event: 'toggleShowConfig',
      },
      {
        text: '统计',
        sposition: { sy: 17 },
        event: 'gotoTitle',
      },
    ]

    return (
      <div {...this.wrapProps}>
        {rowProperty.map(({ sposition, text, event }, index) => {
          return (
            <div
              position={{ y: index * 1.2 + 0.2 }}
              size={{ width: 4 }}
              event={event}
              onClick={this.onClick}
            >
              <div image="icons.png" sposition={sposition} />
              <Text
                position={{ x: 1.5 }}
                size={{ width: 2.5 }}
                value={text}
              ></Text>
            </div>
          )
        })}
      </div>
    )
  },
}
