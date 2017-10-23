import React, { Component } from 'react';
import SliderInput from './../../components/sliderInput';
import StringInput from './../../components/stringInput';
import CumulativeSelect from './../../components/cumulativeSelect';
import './style.css';

class Filters extends Component {
  constructor() {
    super();
    this.state = {
      read_values: {
        limit_count: '0',
        limit_pairings: '0',
        string_filter: '',
        ingredient_filter: [],
        type_filter: []
      },
      no_read_values: {
        ingredients: '',
        types: ''
      },
      show_droppers: {
        ingredients: false,
        types: false
      },
      do_submit: false
    };
    this.catchKeyUp = this.catchKeyUp.bind(this);
  }
  catchKeyUp( event ) {
    switch (event.keyCode) {
      case 13:
        this.catchEnter(event);
        break;
      case 27:
        this.catchEsc(event);
        break;
      default:
        event.stopPropagation();
        return;
    }
  }
  catchEnter( event ) {
    event.preventDefault();

    const read_values = this.state.read_values,
          no_read_values = this.state.no_read_values;
    switch (event.target.id) {
      case "ingredients-drop-search":
        if (!this.props.data.ingredients.includes(no_read_values.ingredients))
          break;
        read_values.ingredient_filter.push(no_read_values.ingredients);
        no_read_values.ingredients = '';
        this.setState({read_values: read_values, no_read_values: no_read_values});
        break;
      default:
        break;
    }
    event.stopPropagation();
  }
  catchEsc( event ) {
    this.setState({ show_droppers: { ingredients: false, types: false } });
    event.stopPropagation();
  }
  handleSliderChange( value, key ) {
    const read_values = this.state.read_values;
    read_values[key] = value;
    this.setState({ read_values: read_values });
  }
  handleStringInputChange( value ) {
    const read_values = this.state.read_values;
    read_values.string_filter = value;
    this.setState({ read_values: read_values });
  }
  handleDropSearchChange( event, key ) {
    const no_read_values = this.state.no_read_values,
          show_droppers = this.state.show_droppers;
    no_read_values[key] = event.target.value
      .replace(/[^A-Za-z ]/g, '')
      .toLowerCase();
    show_droppers[key] = (event.target.value !== '');
    this.setState({no_read_values: no_read_values, show_droppers: show_droppers});
  }
  handleDropperClick( key, event, value ) {
    const no_read_values = this.state.no_read_values,
          show_droppers = this.state.show_droppers;
    no_read_values[key] = value;
    show_droppers[key] = false;
    this.setState({no_read_values: no_read_values, show_droppers: show_droppers});
    document.getElementById(key + '-drop-search').focus();
  }
  handleRemoveClick( index, key ) {
    const read_values = this.state.read_values;
    read_values[key].splice(index, 1);
    this.setState({read_values: read_values});
  }
  handleSubmitClick( event ) {
    this.setState({do_submit: true});
  }
  handleSubmit() {
    if (!this.state.do_submit) return;
    const data = this.state.read_values;
    this.setState({
      read_values: {
        limit_count: '0',
        limit_pairings: '0',
        string_filter: '',
        ingredient_filter: [],
        type_filter: []
      },
      no_read_values: {
        ingredients: '',
        types: ''
      },
      show_droppers: {
        ingredients: false,
        types: false
      },
      do_submit: false
    });

    this.props.filterSubmit(data);
  }
  componentDidMount() {
    document.getElementById('filters-form').addEventListener('keyup', this.catchKeyUp);
  }
  componentWillUnmount() {
    document.getElementById('filters-form').removeEventListener('keyup', this.catchKeyUp);
  }
  render() {
    return (
      <aside id='filters-window' className='p child scroll-text '>
        <hgroup>
          <h2>Filters</h2>
        </hgroup>
        <form id='filters-form' onSubmit={(event) => {event.preventDefault(); this.handleSubmit();}}>
          <SliderInput
            value={this.state.read_values.limit_count}
            input_id={'limit-count'}
            label={'Limit Count'}
            max_val={this.props.data.max_count}
            updateValue={(value) => this.handleSliderChange(value, 'limit_count')}
          />
          <SliderInput
            value={this.state.read_values.limit_pairings}
            input_id={'limit-pairings'}
            label={'Limit No. of Pairings'}
            max_val={this.props.data.max_pairing}
            updateValue={(value) => this.handleSliderChange(value, 'limit_pairings')}
          />
          <StringInput
            value={this.state.read_values.string_filter}
            input_id={'filter-string'}
            label={'Filter specific string'}
            regex_remove={new RegExp(/[^A-Za-z ]/g)}
            force_case={'lower'}
            updateValue={(value) => this.handleStringInputChange(value)}
          />
          <CumulativeSelect
            title={"Filter Ingredients"}
            input_id={'ingredients-drop-search'}
            data={this.props.data.ingredients}
            drop_limit={8}
            drop_search_value={this.state.no_read_values.ingredients}
            show_dropper={this.state.show_droppers.ingredients}
            onDropSearchChange={(event) => this.handleDropSearchChange(event, 'ingredients')}
            dropperClick={(...args) => this.handleDropperClick('ingredients', ...args)}
            values_list={this.state.read_values.ingredient_filter}
            removeClick={(index) => this.handleRemoveClick(index, "ingredient_filter")}
          />
          <button type="submit" form="filters-form" onClick={(event) => this.handleSubmitClick(event)}>
            Submit
          </button>
        </form>
      </aside>
    );
  }
}

export default Filters;
