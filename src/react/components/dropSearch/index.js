import React from 'react';
import Dropper from './dropper';
import './style.css';

function DropSearch ( props ) {
  const class_base = 'drop-search-container ',
        class_name = class_base + (props.class_info || '');
  return (
    <label className={class_name}>
      {props.label || null}
      <input
        id={props.input_id || null}
        className="drop-search-input"
        type='text'
        placeholder={props.placeholder || 'Search'}
        value={props.value}
        onChange={(event) => props.onChange(event)}
      />
      <Dropper
        show={props.show_dropper}
        search_value={props.value}
        data={props.data}
        drop_limit={props.drop_limit}
        itemClick={(...args) => props.dropperClick(...args)}
      />
    </label>
  );
}

export default DropSearch;
