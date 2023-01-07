import { Component } from "Engine";
import TitleText from "./components/TitleText";
import ProgressBar from "./components/ProgressBar";

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
