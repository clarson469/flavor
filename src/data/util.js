;var _util = (function(){

  // PRIVATE FUNCTIONS

  var sort_pairings = function( flavor_obj ) {
    let key, ingredient;
    for (key in flavor_obj.ingredients) {
      ingredient = flavor_obj.ingredients[key];
      ingredient.pairings = ingredient.pairings.sort((a,b) => (b[1] - a[1]));
    }
  };

  var get_mean_pairing = function ( flavor_obj ) {
    let key, p, sum = 0, count = 0;
    for (key in flavor_obj.ingredients) {
      for (p of flavor_obj.ingredients[key].pairings) {
        sum += p[1]; count++;
      }
    }
    flavor_obj.mean_pairing = sum / count;
  };

  var get_max_pairing = function ( flavor_obj ) {
    let key, val, max=0, max_key='';
    for (key in flavor_obj.ingredients) {
      try { val = flavor_obj.ingredients[key].pairings[0][1]; }
      catch (e) { continue; }
      if (val > max) { max = val; max_key = key; }
    }
    flavor_obj.max_pairing = [max_key]
      .concat(flavor_obj.ingredients[max_key].pairings[0]);
  };

  var get_mean_count = function ( flavor_obj ) {
    const keys = Object.keys(flavor_obj.ingredients),
          count = keys.length;
    let sum = 0, key;
    for (key of keys) { sum += flavor_obj.ingredients[key].count; }
    flavor_obj.mean_count = sum / count;
  };

  var get_array_min = function( array, index=false ) {
    const min = array.reduce( (a, b) => Math.min(a, b) );
    if (!index) return min;
    return [min, array.indexOf(min)];
  };

  var get_array_max = function( array, idex=false ) {
    const max = array.reduce( (a, b) => Math.max(a, b) );
    if (!index) return max;
    return [max, array.indexOf(max)];
  }


  // PUBLIC FUNCTIONS
  // i.e. object-literal of util functions for returning
  var _util = {
    init: function ( flavor_obj ) {
      this.flavor_obj = flavor_obj;
      sort_pairings(this.flavor_obj);
      get_mean_pairing(this.flavor_obj);
      get_max_pairing(this.flavor_obj);
      get_mean_count(this.flavor_obj);
      this.flavor_obj.ingredient_count = Object.keys(this.flavor_obj.ingredients).length;
    },
    find_key: function ( ...names ) {
      try {
      return names.map( (name, i) => {
        let key;
        for (key in this.flavor_obj.ingredients) {
          if (this.flavor_obj.ingredients[key]['name'] === name)
            return key;
        }
        throw Error(`Can't find ingredient named: "${name}".`);
      });
      }
      catch (e) {
        console.error(`Error thrown. Returned empty list.\nMessage:\n${e}`);
        return [];
      }
    },
    get_name: function ( ...keys ) {
      try {
        return keys.map(
          key => this.flavor_obj.ingredients[key].name
        );
      }
      catch (e) {
        console.error( `Error ${e} thrown. Returned empty list` );
        return [];
      }
    },
    get_random: function ( count=1 ) {
      const keys = Object.keys(this.flavor_obj.ingredients),
            max = keys.length,
            output = [];

      while (count--) {
        output.push( keys[ Math.floor( Math.random() * max ) ] );
      }
      return output;
    },
    find_type_key: function ( type_name ) {
      let key;
      for (key in this.flavor_obj.types) {
        if (this.flavor_obj.types[key].name === type_name)
          return key;
      }
      console.error( `Couldn't find type: ${type}. Returned null value` );
      return null;
    },
    get_random_from: function ( type_id, count=1 ) {
      try {
        const keys = this.flavor_obj.types[type_id].ingredients,
              max = keys.length,
              output = [];
      }
      catch (e) {
        console.error( `Error "${e}" thrown. Returned empty list` );
        return [];
      }
      while (count--) {
        output.push( keys[ Math.floor( Math.random() * max ) ] );
      }
      return output;
    },
    get_best_match: function ( ...ids ) {
      if (ids.length === 1)
        return this.flavor_obj.ingredients[ids[0]].pairings[0][0];

      const prime = this.flavor_obj.ingredients[ids[0]].pairings,
            nonprimes = ids.slice(1);

      let pp;
      for (pp of prime) {
        if ( _util.recursive_match(nonprimes, pp[0]) )
          return pp[0];
      }
      return null;

    },
    recursive_match: function ( nonprimes, key ) {
      let npp, pairings;
      if (nonprimes.length === 1) {
        pairings = this.flavor_obj.ingredients[nonprimes[0]].pairings;
        for (npp of pairings) {
          if (npp[0] === key) return true;
        }
      }
      else {
        if (_util.recursive_match( nonprimes.slice(0,1), key ))
          return _util.recursive_match(nonprimes.slice(1), key);
      }
      return false;
    },
    loose_search: function ( search_term ) {
      const ingredients = this.flavor_obj.ingredients,
            keys = Object.keys(ingredients);
      return keys.filter(
        id => ingredients[id].name.includes(search_term)
      );
    },
    check_object_parity: function ( name ) {
      let key, is_type=false;
      for (key in this.flavor_obj.types) {
        if (this.flavor_obj.types[key].name === name) { is_type = true; break; }
      }
      if (!is_type) return false;
      for (key in this.flavor_obj.ingredients) {
        if (this.flavor_obj.ingredients[key].name === name) return true;
      }
      return false;
    },
    get_n_count: function ( n, sort=false ) {
      const keys = Array(n),
            max_vals=Array(n).fill(0),
            ingredients = this.flavor_obj.ingredients;
      let cursor = 0, key, min, amin, count;
      for (key in ingredients) {
        [min, amin] = get_array_min(max_vals, true);
        count = ingredients[key].count;
        if (count > min) {
          cursor = amin;
          max_vals[cursor] = count;
          keys[cursor] = [key, count];
        }
      }
      if (!sort) return keys;

      return keys.sort((a, b) => b[1] - a[1]);
    },
    recipe_match: function ( ingredient1, ingredient2 ) {
      return this.flavor_obj.ingredients[ingredient1].pairings
        .filter( x => x[0] === ingredient2 ).length === 1;
    }
  };


  return _util;

})();

module.exports = _util;
