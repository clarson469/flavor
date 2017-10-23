import React, { Component } from 'react';
import Controls from './controls';
import LinkObjIterator from './../../components/linkObjIterator';
import lib from './../../lib/';
import './style.css';

class Ingredients extends Component {
  constructor() {
    super();
    this.state = {
      sort_by: 'name::asc',
      apply_filter: false
    };
  }
  constructList() {
    const sorter = this.state.sort_by.split('::'),
          data = sorter[1] === 'asc'
            ? lib.sort_by_attr(this.props.data, sorter[0])
            : lib.sort_by_attr(this.props.data, sorter[0]).reverse();
    const LOI = new LinkObjIterator('clickable-obj', '', this.props.clickAction);
    return LOI.iterate_list(data.map(
             datum => ({ key: datum.key, content: datum.name })
           ), 'p ingredient unstyled-list-item flip-list-item ');
  }
  handleRadioSelect( event, key ) {
    this.setState({sort_by: key});
  }
  handleSlideToggleChange() {
    this.setState({apply_filter: !this.state.apply_filter});
  }
  render() {
    const sort_options = [
      {key: 'name::asc', name:'A-Z'},
      {key: 'name::desc', name:'Z-A'},
      {key: 'count::desc', name:'Count (desc.)'},
      {key: 'count::asc', name:'Count (asc.)'}
    ];
    return (
      <aside id='all-ingredients' className='p child scroll-text '>
        <hgroup>
          <h2>All Ingredients</h2>
        </hgroup>
        <Controls
          sort_options={sort_options}
          sort_by={this.state.sort_by}
          apply_filter={this.state.apply_filter}
          radioSelect={(...args) => this.handleRadioSelect(...args)}
          slideToggleChange={() => this.handleSlideToggleChange()}
        />
        <ul id='ingredient-list' className='flip-list '>
          {this.constructList()}
        </ul>
      </aside>
    );
  }
}

export default Ingredients;
