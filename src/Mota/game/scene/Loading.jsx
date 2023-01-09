import { Component } from "Engine";
import TitleText from "./components/TitleText";
import ProgressBar from "./components/ProgressBar";

export default class Loading extends Component {
  render() {
    const { $loader } = this;
    return (
      <div>
        <TitleText />
        <ProgressBar rate={$loader.loaded / $loader.total} />
      </div>
    );
  }
}
