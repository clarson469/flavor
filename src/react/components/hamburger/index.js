import React from 'react';
import './style.css';

function Hamburger ( props ) {
  const class_base = 'hamburger-button ',
        class_name = class_base + (props.open ? 'open ' : 'closed ')
                      + (props.classes || '');

  return <button className={class_name} onClick={(event) => props.hamburgerClick(event)}></button>;
}

export default Hamburger;
