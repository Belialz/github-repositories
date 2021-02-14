import {BaseControl} from '../base/control.base';

export class Button extends BaseControl {
  clickButton() {
    return this.click(this.webElement);
  }
}
