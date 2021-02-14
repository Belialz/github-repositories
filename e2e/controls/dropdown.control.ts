import {BaseControl} from '../base/control.base';
import {$$} from 'protractor';

export class Dropdown extends BaseControl {
  options() {
    return $$('[role="option"]');
  }

  openDropdown() {
    return this.click(this.webElement);
  }

  getOptionsName() {
    return this.options().map(option => option.getAttribute('ng-reflect-value'));
  }

  select(index = 1) {
   return this.click(this.options().get(index));
  }

  async selectByText(text: string) {
    const optionsText = await this.getOptionsName();
    const index = optionsText.indexOf(text);

    return this.select(index);
  }
}
