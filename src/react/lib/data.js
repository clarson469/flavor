;var data = {
  sort_by_attr: function ( data, attr, type=null ) {
    if (type === null) type = typeof data[0][attr];
    switch (type) {
      case 'string':
        return data.sort(
          (a, b) => ( a[attr].toLowerCase() < b[attr].toLowerCase() ? -1 : 1 )
        );
      case 'number':
        return data.sort( (a,b) => (a[attr] - b[attr]) );
      default:
        return data;
    }
  },
  obj_max_by_attr: function ( obj, attr, return_key_only=false ) {
    let maxVal = 0, currentVal, maxKey;
    Object.keys(obj).forEach(key => {
      currentVal = obj[key][attr];
      if (currentVal > maxVal) { maxVal = currentVal; maxKey = key; }
    });
    return return_key_only ? maxKey : obj[maxKey];
  }
};

module.exports = data;
