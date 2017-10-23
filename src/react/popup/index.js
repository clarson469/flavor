import React from 'react';
import About from './about/';
import Filters from './filters/';
import Ingredients from './ingredients/';
import './style.css';

function Popup ( props ) {
  let Child;
  switch ( props.display ) {
    case 'about':
      Child = <About />;
      break;
    case 'filters':
      Child = <Filters data={props.data} filterSubmit={(data) => props.filterSubmit(data)} />;
      break;
    case 'ingredients':
      Child = <Ingredients data={props.data} clickAction={(...args) => props.clickAction(...args)} />;
      break;
    default:
      Child = null;
      break;
  }
  return (
    <section id='popup-window' className='float-child container ' onMouseDown={(event) => props.popupClose(event)} onMouseUp={(event) => props.popupClose(event)}>
      <div className='invisible-wrapper' onClick={(event) => event.stopPropagation()}>
        {Child}
      </div>
    </section>
  );
}

export default Popup;
