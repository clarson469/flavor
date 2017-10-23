;var extend = function extend ( object, extension ) {
  const toString = Object.prototype.toString,
        objTest = toString.call({});
  let key;
  for (key in extension) {
    if (extension[key] && objTest === toString.call(extension[key])) {
      object[key] = object[key] || {};
      extend(object[key], extension[key]);
    }
    else {
      object[key] = extension[key];
    }
  }
  return object;
};

module.exports = extend;
