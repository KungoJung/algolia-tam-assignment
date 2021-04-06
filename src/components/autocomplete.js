import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';

// Instant Search Widgets
import { hits,
  searchBox,
  configure,
  pagination,
  refinementList,
  rangeSlider } from 'instantsearch.js/es/widgets';

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';

/**
 * @class Autocomplete
 * @description Instant Search class to display content in the page's autocomplete
 */
class Autocomplete {
  /**
   * @constructor
   */
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      'G3IY9X55TN',
      '502e42eac394450040c1048d8bd6e2b4'
    );

    this._searchInstance = instantsearch({
      indexName: 'SPENCER_WILLIAM',
      searchClient: this._searchClient,
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      configure({
        hitsPerPage: 5,
      }),
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: "#categories",
        attribute: "categories",
        autoHideContainer: false,
        templates: {
          header: "Categories"
        },
      }),
      refinementList({
        container: "#brands",
        attribute: "brand",
        searchForFacetValues: true,
        autoHideContainer: false,
        templates: {
          header: "Brands"
        },
      }),
      rangeSlider({
        container: "#price",
        autoHideContainer: false,
        attribute: "price",
        templates: {
          header: "Price"
        },
      }),
    ]);
  }
  // do brand, category, price

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default Autocomplete;
