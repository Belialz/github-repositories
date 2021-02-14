import {ElementFinder} from 'protractor';

export class ElementHelper {
  static sendKeys(element: ElementFinder, value: string) {
    console.log(`Send keys ${value} to Element: ${element.locator()}`);

    return element.sendKeys(value);
  }
  static click(element: ElementFinder) {
    console.log(`Click to ${element.locator()}`);

    return element.click();
  }

  static async getAttribute(element: ElementFinder, attributeName = 'value') {
    console.log(`Get Attribute value: ${attributeName} from Element: ${element.locator()}`);
    const value = await element.getAttribute(attributeName);
    console.log(`Attribute value: ${value}`);

    return value;
  }
}
