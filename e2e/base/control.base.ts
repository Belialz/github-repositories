import {ElementHelper} from '../helpers/element.helper';
import {browser, ElementFinder} from 'protractor';

export class BaseControl {
  constructor(public webElement: ElementFinder) {
  }

  click(element) {
    return ElementHelper.click(element);
  }

  sendKeys(element, value) {
    return ElementHelper.sendKeys(element, value);
  }

  sleep(time) {
    return browser.sleep(time);
  }
}
