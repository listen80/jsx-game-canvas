import { Component } from "Engine";
import TitleText from "./TitleText";
import ProgressBar from "./ProgressBar";

export default class Loading extends Component {
  render() {
    return (
      <div>
        <TitleText />
        <ProgressBar rate={this.props.rate} />
      </div>
    );
  }
}
