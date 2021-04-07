DEMO:
[15-second demo](https://youtu.be/mXW2KgMBKRU)

You can also fork, npm install, and npm start to see the app working on port 3000. I ran into too many bugs while deploying - see notes.

Fundamentally, I get what we are trying to do, but got stuck a lot. So this implementation is far from perfect.

First I read through basics to get a feel for the total Algolia ecosystem. Then a few mis-starts. It took a while, but I found the guide for building multi-index search. That seemed like the right documentation for building the feature I wanted: federated search with autocomplete query suggestions and products. I imported the ‘index’ widget and registered it last after hits, passing the query_suggestions indexName I generated on Algolia’s dashboard. Then, the goal would be to add a custom widget/component that renders to a #autocomplete-queries div or just shares the original #searchbox div and appends children. The guides showed various implementations.

The hard part: Building the custom Autocomplete Component and Render callback

The code in
https://www.algolia.com/doc/api-reference/widgets/autocomplete/js/?client=js#about-this-widget
and
https://codesandbox.io/s/github/algolia/doc-code-samples/tree/isjs-v4/InstantSearch.js/query-suggestions?file=/src/app.js
And
https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/query-suggestions/tutorials/building-query-suggestions-ui/js/
And
https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/multi-index-search/js/
All have slight variations!

Unfortunately, none of these solutions were working out of the box. One error consistent among my attempts was calling instantsearch.connectors.connectAutocomplete, when { connectAutocomplete } from 'instantsearch.js/es/connectors' is the preferred import. Then, I debugged some DOM errors in a few of the implementations -- calling .html() and .find() on the container node.

After getting stuck where the connectAutocomplete callback handles an array prop called ‘indices’, I finally moved the custom autocomplete widget from being called inside the index widget scope, to the main searchInstance scope, and got a working autocomplete feature. But that’s just hitting the main SPENCER_WILLIAM index.

So getting to the query_suggestions index… I moved it back and despite my generating it from SPENCER_WILLIAM with all 10k of its records, it only had 2 records instead of 10k ranked by popularity that I expected.

The next thing I saw in the docs was to use facet data to start generating query suggestions. I did that for brand, name, category, and description, and populated 700+ records, and finally saw the changes needed in the app.

Lastly, I tried to deploy the app, but had too many issues with parcel to get the build right with correct relative paths coming from the dist folder -- in particular I was stuck with a 404 error for the location of the autocomplete.js file. Tried on Netlify and GitHub pages with neither working in a reasonable amount of time, but settled for a little video demo (link above).
