;var string = {
  capitalise: function ( string, all=true ) {
    string = string.trim();
    if (all) return string.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ');
    return string[0].toUpperCase() + string.slice(1);
  },
  percent: function ( value ) {
    return value >= 0.0001 ? (value * 100).toFixed(2) + '%' : '<0.01%';
  }
};

module.exports = string;
