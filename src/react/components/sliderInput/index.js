import React, { Component } from 'react';
import Slider from './slider';
import Input from './input';
import RatioError from './error';
import './style.css';

class SliderInput extends Component {
  constructor() {
    super();
    this.state = {
      expectedValue: '0',
      pos: 0,
      x: null,
      ratio: null
    };
    this.sliderDown = this.sliderDown.bind(this);
    this.sliderMove = this.sliderMove.bind(this);
    this.sliderUp = this.sliderUp.bind(this);
  }
  sliderDown( event ) {
    if (event.target.id !== this.props.input_id + '-slider') return;
    event.preventDefault();
    this.setState({x: event.clientX});
  }
  sliderMove( event ) {
    if (this.state.x === null) return;
    event.stopPropagation();
    const dx = event.clientX - this.state.x,
          new_pos = Math.max(0, Math.min(this.state.pos + dx, 100)),
          new_value = Math.round(new_pos / this.state.ratio).toString();
    this.setState({x: event.clientX, expectedValue: new_value, pos: new_pos});
    this.props.updateValue(new_value);
  }
  sliderUp( event ) {
    if (this.state.x === null) return;
    this.setState({x: null});
  }
  processInputChange( event ) {
    const new_value = event.target.value.replace(/\D/g, '');
    this.props.updateValue(new_value);
  }
  updatePos( value ) {
    value = value === '' ? '0' : value;
    const pos = parseInt(value, 10) * this.state.ratio;
    this.setState({expectedValue: value, pos: pos});
  }
  updateRatio( props ) {
    const ratio = 100 / ( (props.max_val || 1000) - (props.min_val || 0) );
    if (ratio <= 0) throw new RatioError();
    this.setState({ratio: ratio});
  }
  componentDidMount() {
    window.addEventListener('mousedown', this.sliderDown);
    window.addEventListener('mousemove', this.sliderMove);
    window.addEventListener('mouseup', this.sliderUp);
    this.updateRatio( this.props );
  }
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.sliderDown);
    window.removeEventListener('mousemove', this.sliderMove);
    window.removeEventListener('mouseup', this.sliderUp);
  }
  componentWillReceiveProps( nextProps ) {
    if (nextProps.max_val !== this.props.max_val || nextProps.min_val !== this.props.min_val)
      this.updateRatio( nextProps );
    if (nextProps.value !== this.props.value && nextProps.value !== this.state.expectedValue)
      this.updatePos(nextProps.value);
  }
  render() {
    const class_base = 'slider-input-container ',
          class_name = class_base + (this.props.class_info || '');
    return (
      <div className={class_name}>
        <label className='slider-input-label' htmlFor={this.props.input_id}>
          {this.props.label + ':'}<br/>
        </label>
        <Slider slider_id={this.props.input_id + '-slider'} pos={this.state.pos} />
        <Input
          input_id={this.props.input_id}
          value={this.props.value}
          inputChange={(event) => this.processInputChange(event)}
        />
      </div>
    );
  }
}

export default SliderInput;
