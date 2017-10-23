;var get = {
  get_name: function ( object, ...keys ) {
    try {
      return keys.map( key => object[key].name );
    }
    catch (error) {
      console.error( `Error "${error}" thrown. Returned empty list` );
      return [];
    }
  },
  get_key: function ( object, name ) {
    let key;
    for (key in object) {
      if (object[key].name === name) return key;
    }
    return null;
  },
  check_key_parity: function ( object, key, return_key=false ) {
    const name = object.types[key].name,
          p_key = get.get_key(object.ingredients, name);
    return p_key !== null ? (return_key ? p_key : true) : false;
  }
};

module.exports = get;
