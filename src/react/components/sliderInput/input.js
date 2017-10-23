import React from 'react';

function Input ( props ) {
  return (
    <input
      id={props.input_id}
      className='slider-input-input'
      type='text'
      value={props.value}
      onChange={(event) => props.inputChange(event)}
    />
  );
}

export default Input;
