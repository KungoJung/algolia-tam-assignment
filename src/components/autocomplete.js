import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
// import { autocomplete, getAlgoliaHits } from '@algolia/autocomplete-js';
import { connectAutocomplete } from 'instantsearch.js/es/connectors'

// Instant Search Widgets
import { hits, searchBox, configure, index } from 'instantsearch.js/es/widgets';

// Autocomplete Template
import autocompleteProductTemplate from '../templates/autocomplete-product';

// Helper for the render function
const renderIndexListItem = indexObj => `
  ${indexObj.hits
    .map(
      hit =>
        `<li>${instantsearch.highlight({ attribute: 'query', hit })}</li>`
        // `<li>${hit.query}</li>`
    )
    .join('')}
`;

const autocompleteQueryComponent = connectAutocomplete(
  ({ indices, refine, widgetParams }, isFirstRendering) => {
    const { container: containerStr } = widgetParams;
    const container = document.querySelector(containerStr);
    let searchBoxElement;
    if (isFirstRendering) {
      searchBoxElement = document.querySelector('#searchbox');

      searchBoxElement.addEventListener('input', event => {
        refine(event.target.value);
      });
    }
    console.log(indices)
    container.innerHTML = indices
      .map(renderIndexListItem)
      .join('');
  }
);

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
        hitsPerPage: 3,
      }),
      searchBox({
        container: '#searchbox',
      }),
      hits({
        container: '#autocomplete-hits',
        templates: { item: autocompleteProductTemplate },
      }),
      index({ indexName: 'SPENCER_WILLIAM_query_suggestions' }).addWidgets([
        // The index inherits from the parent's `searchBox` search parameters
        configure({
          hitsPerPage: 5,
        }),
        autocompleteQueryComponent({
          container: '#autocomplete_query',
        }),
      ]),
    ]);
  }

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
