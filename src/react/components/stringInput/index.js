import React from 'react';
import './style.css';

function StringInput ( props ) {
  const process_input_change = (event) => {

    const regex_remove = props.regex_remove || /a^/g,
          new_value = event.target.value.replace(regex_remove, '');

    switch (props.force_case) {
      case 'lower': return new_value.toLowerCase();
      case 'upper': return new_value.toUpperCase();
      default:      return new_value;
    }

  };

  let label;
  if (props.label === undefined) label = null;
  else label = props.label + ': ';

  return (
    <label className='string-input-label string-input-container'>
      {label}
      <input
        id={props.input_id}
        className='string-input-input'
        type='text'
        value={props.value}
        onChange={(event) => props.updateValue(process_input_change(event))}
      />
    </label>
  );
}

export default StringInput;
