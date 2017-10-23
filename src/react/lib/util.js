;var util = {
  process_key_press: function ( event ) {
    const key_code = event.keyCode;
    if (key_code === 32 || (key_code >= 65 && key_code <= 90))
      return String.fromCharCode(key_code).toLowerCase();
    else if (key_code === 13) return 'Enter';
    else if (key_code === 8) return 'Backspace';
    else return '';
  },
  process_num_key_press: function ( event ) {
    const key_code = event.keyCode;
    if ((key_code >= 48 && key_code <= 57) || (key_code >= 96 && key_code <= 105))
      return String.fromCharCode(key_code);
    else if (key_code === 13) return 'Enter';
    else if (key_code === 8) return 'Backspace';
    else return '';
  },
  unique_id: function ( prepend="id-" ) {
    let _id;
    if (window.GLOBAL_COUNTER !== undefined) _id = window.GLOBAL_COUNTER++;
    else {
      console.warn("WARNING: Couldn't find global variable \"window.GLOBAL_COUNTER\", using \"Math.random()\" to generate unique id instead")
      _id = Math.random().toString(7).slice(2);
    }
    return prepend + _id;
  }
};

module.exports = util;
