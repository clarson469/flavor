import React from 'react';

function SearchDDItem ( props ) {
  return (
    <li className='h search-dd-item clickable-obj ' onClick={() => props.searchDDItemClick(props.text)}>
      {props.text}
    </li>
  );
}

export default SearchDDItem;
