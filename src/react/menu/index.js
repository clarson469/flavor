import React, { Component } from 'react';
import Hamburger from './../components/hamburger';
import MenuDropdown from './menuDropdown';
import './style.css';

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      open:false
    };
  }
  handleHamburgerClick() {
    this.setState({open: !this.state.open});
  }
  handleLinkObjClick( event, key ) {
    this.setState({open: false});
    this.props.menuObjClick(event, key);
  }
  render() {
    return (
      <div id='menu-wrapper' className='invisible-wrapper float-top float-right '>
        <Hamburger classes='no-outline clickable-obj ' open={this.state.open} hamburgerClick={() => this.handleHamburgerClick()} />
        <MenuDropdown open={this.state.open} linkObjClick={(event, key) => this.handleLinkObjClick(event, key)} />
      </div>
    );
  }
}

export default Menu;
