import React from 'react';
import LinkObjIterator from './../components/linkObjIterator/';

function AsideContent ( props ) {
  const LOI = new LinkObjIterator('clickable-obj', ', ', props.linkObjClick),
        type_list = LOI.iterate(props.content.types),
        pairings_list = LOI.iterate_list(props.content.pairings, 'ac-list-item ac-text ');
  return (
    <section id='aside-content' className='a child scroll-text '>
      <h3 id='ac-header'>{props.content.header}</h3>
      <p id='ac-count-ratio' className='ac-text'>Used in {props.content.ratio} of recipes</p>
      <p id='ac-types' className='ac-text'>Types: {type_list}</p>
      <ol id='ac-pairings'>
        Pairings:
        {pairings_list}
      </ol>
    </section>
  );
}

export default AsideContent;
