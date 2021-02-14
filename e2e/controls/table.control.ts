import {BaseControl} from '../base/control.base';
import {ElementArrayFinder, ElementFinder} from 'protractor';

export class Table extends BaseControl {
  rows(): ElementArrayFinder {
    return this.webElement.$$('tr');
  }

  rowName(row): ElementFinder {
    return row.$('th');
  }

  rowValue(row: ElementFinder): ElementFinder {
    return row.$('td');
  }

  async getValue(index: number): Promise<{name: string, value: string}> {
    const row = this.rows().get(index);
    const name = await this.rowName(row).getAttribute('innerText');
    const value = await this.rowValue(row).getAttribute('innerText');

    return {name, value};
  }
}
