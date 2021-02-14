import {Field} from './field.control';
import {BaseControl} from '../base/control.base';
import {Dropdown} from './dropdown.control';

export class FiltersControl extends BaseControl {
  searchByElement() {
    return this.webElement.$('[formcontrolname="searchQuery"]');
  }

  languageElement() {
    return this.webElement.$('[formcontrolname="language"]');
  }

  searchByField() {
    return new Field(this.searchByElement());
  }

  languageDropdown() {
    return new Dropdown(this.languageElement());
  }
}
