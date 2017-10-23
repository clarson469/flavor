import React from 'react';
import './style.css';

function RadioSelector ( props ) {
  const class_info = props.class_info || '',
        choices = props.choices.map(
    (choice, i) => {
      const li_class_base = 'radio-selector-item ',
            li_class_name = li_class_base + class_info,
            btn_class_name = 'radio-selector-button ' + (choice.key === props.active ? 'active ' : '');
      return (
        <li className={li_class_name} key={i}>
          <button className={btn_class_name} onClick={(event) => props.radioSelect(event, choice.key)}>{choice.name}</button>
        </li>
      );
    }
  );
  return (
    <menu className='radio-selector flip-list '>
      {props.label}
      {choices}
    </menu>
  );
}

export default RadioSelector;
