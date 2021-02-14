import {BaseControl} from '../base/control.base';
import {Button} from './button.control';
import {Table} from './table.control';
import {ItemEntity} from '../entity/item.entity';
import {ElementHelper} from '../helpers/element.helper';

export class Item extends BaseControl {
  avatar() {
    return this.webElement.$('.repo-list__avatar');
  }

  title() {
    return this.webElement.$('.repo-list__name');
  }

  table(){
    return new Table(this.webElement.$('table'));
  }

  addFavoriteElement() {
    return this.webElement.$('app-favorite-btn');
  }

  addFavoriteButton() {
    return new Button(this.addFavoriteElement());
  }

  async getTitle(): Promise<string> {
    return  ElementHelper.getAttribute(this.title(), 'innerText');
  }

  async isAddToFavorite(): Promise<boolean> {
    const value = await ElementHelper.getAttribute(this.addFavoriteButton().webElement, 'ng-reflect-is-favorite');

    return value === 'true';
  }

  async getAsEntity(): Promise<ItemEntity> {
    const entity = new ItemEntity();

    entity.title = await this.getTitle();
    entity.avatar = await ElementHelper.getAttribute(this.avatar(), 'src');

    const tableValue = await this.table().rows().map((row, index) => this.table().getValue(index));
    // @ts-ignore
    tableValue.map(rowValue => entity[rowValue.name.toLowerCase().replace(':', '')] = rowValue.value);
    entity.isFavorite = await this.isAddToFavorite();

    return entity;
  }
}
