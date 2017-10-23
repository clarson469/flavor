import React from 'react';
import Search from './search';
import SearchDropdown from './searchDropdown';
import './style.css';

function Header ( props ) {
  return (
    <header id='header' className='container '>
      <Search search_string={props.search_string} searchChange={(event) => props.searchChange(event)} />
      <SearchDropdown search_response={props.search_response} searchDDItemClick={(text) => props.searchDDItemClick(text)} />
    </header>
  );
}

export default Header;
