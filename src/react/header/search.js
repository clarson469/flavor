import React from 'react';

function Search ( props ) {
  return (
    <input
      id='search-box'
      className='h child input text-field'
      value={props.search_string}
      onKeyDown={(event) => props.searchChange(event)}
      placeholder='Search'
    />
  );
}

export default Search;
