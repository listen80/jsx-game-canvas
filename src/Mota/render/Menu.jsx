import { Component } from 'Engine'
import Select from './Select'
const size = 32
const options = [
  { text: '物品' },
  { text: '技能' },
  { text: '装备' },
  { text: '状态' },
]

const itemOption = []
const statusOption = []
const loadGameOption = [{ text: 12233 }]
const saveGameOption = [{ text: 1 }, { text: 2 }, { text: 3 }, { text: 4 }]

const detailOption = [
  itemOption,
  statusOption,
  itemOption,
  itemOption,
  loadGameOption,
  saveGameOption,
]
export default class Menu extends Component {
  activeIndex = -1;
  tick = 0;
  create () {
    this.styles = {
      menu: {
        width: size * 18,
        height: size * 13,
        backgroundColor: 'rgba(0,0,0,.6)',
      },
      detail: {
        x: size * 4,
        width: size * 9,
        height: size * 13,
        borderWidth: 2,
      },
      select: {
        width: size * 4,
      },
    }
  }

  onConfirm = (activeIndex) => {
    this.activeIndex = activeIndex
  };

  render () {
    return (
      <div style={this.styles.menu}>
        <Select
          options={options}
          style={this.styles.select}
          onConfirm={this.onConfirm}
          onClose={this.props.onClose}
        />
        {this.activeIndex === -1
          ? null
          : (
          <Select
            options={detailOption[this.activeIndex]}
            style={this.styles.detail}
            onConfirm={this.onConfirm}
            onClose={() => {
              this.activeIndex = -1
            }}
          />
            )}
      </div>
    )
  }
}
