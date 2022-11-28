import { MaskUtils } from "../MaskUtils";
import Component from "../component";

export default class StyleComponent extends Component {
  style = {
    position: "absolute",
    backgroundColor: "red",
    width: "10px",
    height: "10px",
    transform:
      "translate3d(" +
      Math.floor(Math.random() * 758) +
      "px," +
      Math.floor(Math.random() * 1024) +
      "px, 0)",
  };
  constructor() {
    super();
    this.mask = MaskUtils.Masks.StyleComponent;
  }
}
