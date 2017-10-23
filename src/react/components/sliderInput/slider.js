import React from 'react';

function Slider ( props ) {
  const css_style = { left: props.pos };
  return (
    <span className='slider-input-bar'>
      <span id={props.slider_id} className='slider-input-slider' style={css_style}></span>
    </span>
  );
}

export default Slider;
