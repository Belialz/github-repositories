import {BaseControl} from './control.base';
import {browser} from 'protractor';
import {Urls} from '../data/varibles';

export class BasePage extends BaseControl {
  async navigateToFilters() {
    return browser.get(Urls.FILTER_PAGE);
  }


  // https://github.com/angular/protractor/issues/308 // NOT WORK
  async navigateToFavorites() {
    return browser.get(Urls.FAVORITES);
    //   .catch(() => {
    //   return browser.switchTo().alert().then((alert) => {
    //
    //     alert.sendKeys('1234');
    //     return browser.get(browser.baseUrl + '/favorites');
    //
    //   });
    // });
  }
 }
