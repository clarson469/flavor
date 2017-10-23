import React from 'react';
import RadioSelector from './../../components/radioSelector';
import SlideToggle from './../../components/slideToggle';

function Controls ( props ) {
  return (
    <menu id='ingredient-list-controls' className='flip-list '>
      <RadioSelector
        class_info={'unstyled-list-item '}
        label={'Sort By: '}
        choices={props.sort_options}
        active={props.sort_by}
        radioSelect={(...args) => props.radioSelect(...args)}
      />
      <SlideToggle
        name={'apply filter'}
        show_label={true}
        is_on={props.apply_filter}
        slideToggleChange={() => props.slideToggleChange()}
      />
    </menu>
  );
}

export default Controls;
