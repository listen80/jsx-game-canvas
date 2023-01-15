
import TitleText from "./components/TitleText";
import ProgressBar from "./components/ProgressBar";

export default {
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
