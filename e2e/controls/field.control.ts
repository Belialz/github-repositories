import {BaseControl} from '../base/control.base';

export class Field extends BaseControl {
  setValue(value) {
   return this.sendKeys(this.webElement, value);
  }

  getValue() {
    return this.webElement.getText();
  }
}
