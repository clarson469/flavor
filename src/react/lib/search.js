;var search = {
  loose_search: function ( object, term ) {
    return Object.keys(object).filter( id => object[id].name.includes(term) )
      .sort( (a, b) => (object[b].count - object[a].count) );
  }
};

module.exports = search;
