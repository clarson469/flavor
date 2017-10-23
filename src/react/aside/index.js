import React, { Component } from 'react';
import AsideTab from './asideTab';
import AsideContent from './asideContent';
import './style.css';

class Aside extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }
  handleTabClick() {
    this.setState({ open: !this.state.open });
  }
  componentWillReceiveProps( nextProps ) {
    if (this.state.open) return;
    if (
      (this.props.content.is_null && !nextProps.content.is_null)
      || this.props.content.header !== nextProps.content.header
    ) {
      this.setState({open: true});
    }
  }
  render() {
    const class_base = 'container ',
          class_name = class_base + (this.state.open ? 'open ' : 'closed ');
    return (
      <aside id='aside' className={class_name}>
        <AsideTab open={this.state.open} tabClick={() => this.handleTabClick()} />
        {this.props.content.is_null
          ? <section id='aside-content'></section>
          : <AsideContent content={this.props.content} linkObjClick={(...args) => this.props.linkObjClick(...args)} />
        }
      </aside>
    );
  }
}

export default Aside;
