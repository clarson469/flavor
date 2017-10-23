import React from 'react';
import SearchDDItem from './searchDropdownItem';

function SearchDropdown ( props ) {
  const display = props.search_response.length > 0,
        class_base = 'h float-child scroll-text ',
        class_name = class_base + (display ? '' : 'hide ');
  return (
    <ul id='search-dropdown' className={class_name}>
      {props.search_response.map(
        (text, i) => <SearchDDItem text={text} key={i} searchDDItemClick={(text) => props.searchDDItemClick(text)} />
      )}
    </ul>
  );
}

export default SearchDropdown;
