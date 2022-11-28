import { MaskUtils } from "../MaskUtils";
import Component from "../component";

export default class TransformComponent extends Component {
  x = Math.floor(Math.random() * 1014);
  y = Math.floor(Math.random() * 758) - 768;
  rot = 0.0;

  rate = Math.random() / 10 + 0.025;

  horizontalRate = Math.random() / 100 + 0.025;
  isFlipped = false;
  horizontalExtent = Math.floor(Math.random() * 100) + 25;
  horizontalOffset = 0;

  constructor() {
    super();
    this.mask = MaskUtils.Masks.TransformComponent;
  }
}
