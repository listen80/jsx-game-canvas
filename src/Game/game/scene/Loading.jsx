
import TitleText from "./components/TitleText";
import Progress from "../../components/Data/Progress";

export default {
  render() {
    const { $loader } = this;
    return (
      <div>
        <TitleText />
        <Progress rate={$loader.loaded / $loader.total} />
      </div>
    );
  }
}
