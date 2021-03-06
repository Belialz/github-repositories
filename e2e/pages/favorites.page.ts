import {BasePage} from '../base/page.base';
import {$, $$, browser} from 'protractor';
import {Item} from '../controls/Item.control';
import {ItemEntity} from '../entity/item.entity';

export class FavoritesPage extends BasePage {
  constructor() {
    super($('app-favorites'));
  }

  enterPassword(password = '1234') {
    return browser.switchTo().alert().sendKeys(password);
  }

  async listItems(): Promise<Item[]> {
    const listToReturn = [];
    const itemListElement = $$('app-repositories-list mat-card');
    const itemCount = await itemListElement.count();

    for (let i = 0; i < itemCount; i++) {
      const item = new Item(itemListElement.get(i));
      listToReturn.push(item);
    }

    return listToReturn;
  }

  async listItemEntity(): Promise<ItemEntity[]> {
    const listToReturn = [];
    const e = await this.listItems();

    for (let i = 0; i < e.length; i++) {
      const item = await e[i].getAsEntity();
      listToReturn.push(item);
    }

    return listToReturn;
  }
}
