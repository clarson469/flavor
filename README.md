# Flavor v0.1.0
A recipe / ingredient matching visualisation tool.  
Note that the visualisation part of that description is currently lacking.  
In its current (v0.1.x) form, Flavor is just a kind of "skeleton" React App, and is very incomplete.

## About
Flavor is built with ReactJS, and makes use of [create-react-app]. Once it's up and running, the "visualisation" part of the app will be built with D3. The Flavor database was compiled by combining an extensive (if not exhaustive) collection of freely available online-recipes, with a curated list of ingredients and flavour pairings.

## Build
At the moment, there isn't a dedicated build of this hosted anywhere (though that will change soon). For now, clone / download this repo, and run `npm run build` to build it, then serve it however you would serve a local build (npm serve, python's http.server, etc.)

### Features
 * A database of over 1000 ingredients
  * Entries include pairings - which maps ingredients that do (or should) taste good together, determined through both the presence of the ingredients in multiple recipes, and / or a set of curated ingredient pairings lists
  * Entries also have a detailed type-system (though this is flawed at the minute, and needs revision), grouping ingredients into over 150 categories
 * The ability to search for any ingredient in the database, and display some basic information about it
 * A filter system, to limit the ingredients it is possible to select based on name, prevalence, and how many other ingredients it pairs with

### Planned Features
#### for v0.2
 * The "visualisation" bit, where the user can select ingredients, and see whether or not they match with other selected ingredients
 * A revised type system
  * Will include making types part of the search, filter, and selection process

#### for v0.3+
 * Style overhaul - replacing the basic (and frankly ugly) UI with a nicer looking one
 * More detailed ingredient info
  * Providing links to (and / or excerpts from) Wikipedia entries on ingredients (where they exist)
  * Detailing the cuisines an ingredient is commonly used in
  * Showing the colour of the ingredient when used in cooking (where appropriate)
 * Preset filters
 * Preset selections (the Cajun Holy-Trinity, Mirepoix, etc.)


[create-react-app]: https://github.com/facebookincubator/create-react-app
