import React from 'react';
import DropSearch from './../dropSearch';
import './style.css';

function CumulativeSelect ( props ) {
  const class_base = 'cumulative-select ',
        class_name = class_base + (props.class_info || '');
  return (
    <fieldset className={class_name}>
      <h4 className="cumulative-select-header">{props.title || null}</h4>
      <DropSearch
        input_id={props.input_id}
        placeholder={props.placeholder}
        data={props.data}
        drop_limit={props.drop_limit}
        show_dropper={props.show_dropper}
        value={props.drop_search_value}
        onChange={(event) => props.onDropSearchChange(event)}
        dropperClick={(...args) => props.dropperClick(...args)}
      />
      <ul className="child flip-list-left ">
        {props.values_list.map((item, i) =>
          <li key={i} className="unstyled-list-item cumulative-select-item ">
            <span>{item}</span>
            <button
              className="no-outline clickable-obj cumulative-select-remove "
              onMouseUp={() => props.removeClick(i)}
            ></button>
          </li>
        )}
      </ul>
    </fieldset>
  );
}

export default CumulativeSelect;
