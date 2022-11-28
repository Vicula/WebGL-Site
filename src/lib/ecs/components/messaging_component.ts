import { MaskUtils } from "../MaskUtils";
import Component from "../component";

export default class MessagingComponent extends Component {
  messages = [];
  constructor() {
    super();
    this.mask = MaskUtils.Masks.MessagingComponent;
  }
}
