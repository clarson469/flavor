import React, { Component } from 'react';
// component imports
import Header from './header';
import Menu from './menu';
import Aside from './aside';
import Popup from './popup';
// function imports
import flavor_init from './../data/flavor_init';
import lib from './lib';
// css
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      flavor: flavor_init(),
      search_string: '',
      search_response: [],
      focus: null,
      popup_open: true,
      popup_display: 'filters',
      popup_closing: false,
      filterOn: false,
      filter: {}
    };
  }
  setFocus( newFocus ) {
    if (!this.state.filterOn) { this.setState({focus: newFocus}); return; }

    const filter = this.state.filter;
    if (newFocus.count < +filter.limit_count) return;
    if (newFocus.pairings.length < +filter.limit_pairings) return;
    if (filter.string_filter === '') {  } // pass
    else if (newFocus.name.match(filter.string_filter) !== null) return;
    if (filter.ingredient_filter.includes(newFocus.name)) return;

    this.setState({focus: newFocus});
  }
  handleSearchChange( event ) {
    const val = lib.process_key_press(event);
    let new_string;

    if (val === 'Enter') { this.handleSearchSubmit(); return; }
    else if (val === 'Backspace') new_string = this.state.search_string.slice(0,-1);
    else new_string = this.state.search_string + val;

    const response = this.getSearchResponse(new_string);
    this.setState({
      search_string: new_string,
      search_response: response
    });
  }
  getSearchResponse( string ) {
    if (string === '') return [];
    const ingredients = this.state.flavor.ingredients,
          response = lib.loose_search(ingredients, string)
            .slice(0,10);
    return lib.get_name(ingredients, ...response);
  }
  handleSearchSubmit() {
    const ingredients = this.state.flavor.ingredients,
          id = lib.get_key(ingredients, this.state.search_string);
    if (id === null) {
      this.setState({
        search_string: '',
        search_response: []
      });
      return;
    }

    const focus = ingredients[id];
    this.setFocus(focus);
    this.setState({search_string:'', search_response: []});
  }
  handleSearchDDItemClick( text ) {
    document.getElementById('search-box').focus();
    this.setState({
      search_string: text,
      search_response: []
    });
  }
  handleLinkObjClick( event, key ) {
    if (key[0] !== 'i') return;
    const flavor = this.state.flavor;
    const focus = flavor.ingredients[key];
    this.setFocus(focus);
  }
  getFocusObjContent() {
    const content = {is_null:null};
    if (this.state.focus === null) { content.is_null = true; return content; }
    this.ingredientContent(content);
    return content;
  }
  ingredientContent( content ) {
    const focus = this.state.focus,
          flavor=  this.state.flavor;
    content.is_null = false;
    content.is_ingredient = true;
    content.header = lib.capitalise(focus.name);
    content.ratio = lib.percent(focus.count / flavor.recipe_count);
    content.types = focus.types.map(
      type => ({
        key: type,
        content: lib.capitalise(flavor.types[type].name)
      })
    );
    content.pairings = focus.pairings.slice(0,5).map(
      pairing => ({
        key: pairing[0],
        content:lib.capitalise(flavor.ingredients[pairing[0]].name)
      })
    );
  }
  handleMenuObjClick( event, key ) {
    this.setState({popup_open: true, popup_display: key});
  }
  preparePopupData() {
    const flavor = this.state.flavor;
    switch (this.state.popup_display) {
      case 'ingredients':
        return Object.keys(flavor.ingredients).map(key => ({
          key: key,
          name: lib.capitalise(flavor.ingredients[key].name),
          count: flavor.ingredients[key].count
        }));
      case 'filters':
        return {
          ingredients: Object.keys(flavor.ingredients).map(key =>
            flavor.ingredients[key].name),
          types: Object.keys(flavor.types).map(key =>
            flavor.types[key].name),
          max_count: flavor.ingredients[lib.obj_max_by_attr(flavor.ingredients, 'count', true)].count,
          max_pairing: flavor.max_pairing
        };
      default:
        return null;
    }
  }
  handlePopupClick( ...args ) {
    if (this.state.popup_display === 'ingredients') {
      let key = args[1];
      this.setState({focus: this.state.flavor.ingredients[key]});
    }
  }
  handlePopupClose( event ) {
    if (event.target.id !== 'popup-window') return;
    if (event.type === 'mousedown') {
      this.setState({popup_closing: true});
      return;
    }
    if (event.type === 'mouseup' && this.state.popup_closing && this.state.popup_open)
      this.setState({popup_open: false, popup_display: null, popup_closing: false});
    return;
  }
  handleFilterSubmit( filter ) {
    this.setState({filterOn: true, filter: filter});
  }
  render() {
    return (
      <div id='flavor-wrapper'>
        <Header
          search_string = {this.state.search_string}
          searchChange={(event) => this.handleSearchChange(event)}
          search_response={this.state.search_response}
          searchDDItemClick={(text) => this.handleSearchDDItemClick(text)}
        />
        <Menu menuObjClick={(event, key) => this.handleMenuObjClick(event, key)} />
        <Aside
          content={this.getFocusObjContent()}
          linkObjClick={(...args) => this.handleLinkObjClick(...args)}
        />
        {this.state.popup_open
          ? <Popup
              display={this.state.popup_display}
              data={this.preparePopupData()}
              clickAction={(...args) => this.handlePopupClick(...args)}
              popupClose={(event) => this.handlePopupClose(event)}
              filterSubmit={(filter) => this.handleFilterSubmit(filter)}
            />
          : null
        }
      </div>
    );
  }
}

export default App;
