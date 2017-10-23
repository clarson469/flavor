;var lib = (function(){

  var extend = require('./extend'),
      search = require('./search'),
      get = require('./get'),
      util = require('./util'),
      string = require('./string'),
      data = require('./data');

  var lib = {};

  extend(lib, search);
  extend(lib, get);
  extend(lib, util);
  extend(lib, string);
  extend(lib, data);

  return lib;

})();

export default lib;
