import { Component } from 'Engine'

class Talk extends Component {
  index = 0;
  width = 8;
  styles = {
    wrap: {
      height: 13,
      width: 18,
      backgroundColor: 'rgba(55,55,55,.3)',
    },
    talk: {
      width: this.width,
      height: 3,
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'white',
      fontSize: 16,
      textAlign: 'left',
      textBaseline: 'middle',
    },
    left: {
      x: 2,
      y: 2,
      height: 2,
    },
    right: {
      x: 3,
      y: 6,
      height: 2,
    },
  };

  onMouseDown = () => {
    this.next()
    return true
  }

  onCreate () {
    this.next()
  }

  next () {
    if (this.index === this.props.talks.length) {
      this.props.onClose()
      return
    }
    const talk = this.props.talks[this.index]
    this.talkArray = []
    Object.assign(this.styles.talk, this.index % 2 ? this.styles.right : this.styles.left)
    talk.split(/\n/).forEach((talk) => {
      for (let i = 0; i < talk.length; i = i + 7 * 2) {
        this.talkArray.push(talk.substr(i, 7 * 2))
      }
    })
    this.styles.talk.height = this.talkArray.length
    this.index++
  }

  render () {
    if (!this.talkArray) {
      return
    }
    return (
      <div style={this.styles.wrap} onMouseDown={this.onMouseDown}>
        <div style={{ ...this.styles.talk }}>
          {this.talkArray.map((talk, index) => {
            const style = {
              x: 0.5,
              y: index,
              height: 1,
            }
            return (
              <div style={style}>
                {talk}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default class Talks extends Component {
  onCreate () {
    this.$on('talk', ($state, data, next) => {
      this.talks = data
      this.next = next
    })
  }

  onClose = () => {
    this.talks = null
    this.next()
  }

  render () {
    return this.talks ? <Talk talks={this.talks} onClose={this.onClose} /> : null
  }
}
