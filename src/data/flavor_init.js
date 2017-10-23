
var flavor_init = function(){

  var flavor = require('./flavor.master.min');

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
    let max = 0;
    const ingredients = flavor_obj.ingredients;
    Object.keys(ingredients).forEach(key => {
      let p = ingredients[key].pairings.length;
      max = p > max ? p : max;
    });
    flavor_obj.max_pairing = max;
  };

  var get_mean_count = function ( flavor_obj ) {
    const keys = Object.keys(flavor_obj.ingredients),
          count = keys.length;
    let sum = 0, key;
    for (key of keys) { sum += flavor_obj.ingredients[key].count; }
    flavor_obj.mean_count = sum / count;
  };

  sort_pairings(flavor);
  get_mean_pairing(flavor);
  get_max_pairing(flavor);
  get_mean_count(flavor);
  flavor.ingredient_count = Object.keys(flavor.ingredients).length;
  return flavor;
};

export default flavor_init;
