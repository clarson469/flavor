class RatioError {
  constructor() {
    this.name = 'SliderInput::RatioError';
    this.message = 'SliderInput.props.max_val <= SliderInput.props.min_val\nmax_val must be greater than min_val. You may be ignoring default values: max_val defaults to 1000, min_val to 0';
  }
}

export default RatioError;
