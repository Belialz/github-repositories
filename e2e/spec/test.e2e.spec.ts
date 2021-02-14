import {FilterPage} from '../pages/filter.page';
import {FavoritesPage} from '../pages/favorites.page';
import {browser, logging } from 'protractor';
import {Urls} from '../data/varibles';

describe('smoke tests', () => {
  let filterPage: FilterPage;
  let favoritesPage: FavoritesPage;

  beforeEach(async () => {
    filterPage = new FilterPage();
    favoritesPage = new FavoritesPage();
    await filterPage.navigateToFilters();
  });

  it('bass page is Filter page', async () => {
    const currentUrl = await browser.getCurrentUrl();

    expect(currentUrl).toEqual(Urls.FILTER_PAGE);
  });

  it('check is results return after set value to search field', async () => {
    const filterForm = filterPage.filtersForm();
    await filterForm.searchByField().setValue('test, js');
    const items = await filterPage.listItems();

    expect(items.length).toBeGreaterThan(0, 'No result for search');
  });

  it('check is searching return valid values', async () => {
    const filterForm = filterPage.filtersForm();
    await filterForm.searchByField().setValue('test');
    const items = await filterPage.listItemEntity();
    const isAllHaveSearchingWord = items.map( item => item.isContain('test')).every(result => result === true);

    expect(isAllHaveSearchingWord).toBe(true, 'Result is not valid');
  });

  it('dropdown should show suggestions', async () => {
    const filterForm = filterPage.filtersForm();
    await filterForm.searchByField().setValue('test');
    await filterForm.languageDropdown().openDropdown();
    const dropdown = await filterForm.languageDropdown().getOptionsName();

    expect(dropdown.length).toBeGreaterThan(1, 'No options');
  });

  it('select language criteria to search', async () => {
    const filterForm = filterPage.filtersForm();
    await filterForm.searchByField().setValue('test');
    await filterForm.languageDropdown().openDropdown();
    await filterForm.languageDropdown().selectByText('JavaScript');
    const items = await filterPage.listItems();

    expect(items.length).toBeGreaterThan(0, 'No result for search with selected Language criteria');
  });

  it('navigation to Favorites page', async () => {
    await filterPage.navigateToFavorites();
    const currentUrl = await browser.getCurrentUrl();

    expect(currentUrl).toEqual(Urls.FAVORITES);
  });

  it('add to favorite', async () => {
    await filterPage.filtersForm().searchByField().setValue('test, js');
    await filterPage.filtersForm().languageDropdown().openDropdown();
    await filterPage.filtersForm().languageDropdown().selectByText('JavaScript');
    const items = await filterPage.listItems();
    const firstItem = items[0];
    await firstItem.addFavoriteButton().clickButton();
    const itemEntity = await firstItem.getAsEntity();
    await filterPage.navigateToFavorites();
    const fav = await favoritesPage.listItems();
    const addedItem = fav.find(async fa => (await fa.getTitle()) === itemEntity.url);
    expect(addedItem).toBeDefined('Item was not added');

    await addedItem.addFavoriteButton().clickButton();
  });

  it('remove from favorite, Filters page', async () => {
    await filterPage.filtersForm().searchByField().setValue('test');
    const items = await filterPage.listItems();
    const firstItem = items[0];
    await firstItem.addFavoriteButton().clickButton();
    const isAddToFavorite = await firstItem.isAddToFavorite();

    expect(isAddToFavorite).toBe(true, 'Item was not added');

    await firstItem.addFavoriteButton().clickButton();

    const isAddToFavoriteAfterRemove = await firstItem.isAddToFavorite();

    expect(isAddToFavoriteAfterRemove).toBe(false, 'Item was not removed');
  });

  it('remove from favorite, Favorite page', async () => {
    await filterPage.filtersForm().searchByField().setValue('test');
    const itemsFavoritePage = await filterPage.listItems();
    const selectedItem = itemsFavoritePage[2];
    await selectedItem.addFavoriteButton().clickButton();
    const title = await selectedItem.getTitle();

    await filterPage.navigateToFavorites();
    const itemsFilterPage = await favoritesPage.listItems();
    const addedItem = itemsFilterPage.find(async item => (await item.getTitle()) === title);
    await addedItem.addFavoriteButton().clickButton();

    const itemsAfterRemove = await favoritesPage.listItems();
    const isItemRemove = itemsAfterRemove.find(async item => (await item.getTitle()) === title);

    expect(isItemRemove).toBeFalsy('Item was not removed');
  });
});
