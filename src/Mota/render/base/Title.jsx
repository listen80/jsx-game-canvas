import { Component } from 'Engine'

const config = {
  children: [
    {
      props: {
        style: {
          y: 2,
          width: 18,
          height: 4,
          textAlign: 'center',
          fontSize: 128,
        },
      },
      children: ['魔塔'],
    },
    {
      tag: 'select',
      props: {
        style: {
          x: 7.5,
          y: 8,
          fontSize: 24,
          textAlign: 'center',
          textBaseline: 'middle',
        },
        optionSize: {
          width: 3,
        },
        options: [
          {
            text: '开始',
            event: 'startGame',
          },
          {
            text: '继续',
            event: 'loadGame',
            disabled: !localStorage.getItem('game'),
          },
        ],
      },
    },
  ],
}

export default class Title extends Component {
  styles = {
    titleText: {
      y: 2,
      width: 18,
      height: 4,
      textAlign: 'center',
      fontSize: 128,
    },
    titleSelect: {
      x: 7.5,
      y: 8,
      fontSize: 24,
      textAlign: 'center',
      textBaseline: 'middle',
    },
  };

  render () {
    return (
      <div>
        <div style={this.styles.titleText}>魔塔</div>
        <select
          style={this.styles.titleSelect}
          optionSize={{
            width: 3,
          }}
          options={[
            {
              text: '开始',
              event: 'startGame',
            },
            {
              text: '继续',
              event: 'loadGame',
              disabled: !localStorage.getItem('game'),
            },
          ]}
        ></select>
      </div>
    )
  }
}
