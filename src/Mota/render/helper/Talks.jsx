import { Component } from "Engine";

export default class Talk extends Component {
  index = 0;
  width = 7;
  styles = {
    talk: {
      width: this.width,
      height: 1,
      backgroundColor: "black",
      borderWidth: 2,
      borderColor: "white",
      fontSize: 16,
      textAlign: "left",
      textBaseline: "middle",
    },
  };

  onKeyDown({ code }) {
    if (code === "Space") {
      this.index++;
      if (this.index === this.props.talk.length) {
        this.props.onConfirm();
      } else {
        this.next();
      }
      this.$sound.play("se", "dialogue.mp3");
    }
  }

  next() {
    const talks = this.props.talk[this.index].split(/\n/);
    this.current = [];
    talks.forEach((talk) => {
      for (let i = 0; i < talk.length; i = i + 7 * 2) {
        this.current.push(talk.substr(i, 7 * 2));
      }
    });

    const leftStyle = {
      x: 2,
      y: 2,
      height: this.current.length,
    };
    const rightStyle = {
      x: 4,
      y: 6,
      height: this.current.length,
    };
    this.turn = !this.turn;
    Object.assign(this.styles.talk, this.turn ? leftStyle : rightStyle);
  }

  onCreate() {
    this.next();
  }

  render() {
    return (
      <div style={this.styles.talk}>
        {this.current.map((talk, index) => {
          return (
            <div
              style={{
                x: 0,
                y: index,
                width: this.width,
                height: 1,
              }}
            >
              {talk}
            </div>
          );
        })}
      </div>
    );
  }
}
