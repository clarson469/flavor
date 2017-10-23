import React from 'react';
import lib from './../../lib';
import './style.css';

function SlideToggle ( props ) {
  const class_base = 'slide-toggle ',
        class_name = class_base + (props.class_info || '') + (props.is_on ? ' on ' : ' off ');
  if (props.name === undefined) console.warn('WARNING::SlideToggle.props.name is undefined.\nYou should give input elements unique names. One has been provided here. If you use more than one instance of this component, you must provide them with unique names yourself, otherwise DOM errors will appear.');

  return (
    <label className='slide-toggle-container'>
      {props.show_label ? lib.capitalise(props.name) + ': ' : null}
      <input
        id={props.name || 'slide-toggle-checkbox'}
        className={class_name}
        type='checkbox'
        name={props.name || 'slide-toggle-checkbox'}
        value={props.is_on}
        onChange={(event) => props.slideToggleChange(event)}
      />
    </label>
  );
}

export default SlideToggle;
