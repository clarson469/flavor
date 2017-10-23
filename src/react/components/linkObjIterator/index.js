import React from 'react';
import LinkObj from './linkObj';

class LinkObjIterator {
  constructor( class_info, separator, callback, inject_react=false ) {
    this.class_info = class_info;
    this.separator = separator;
    this.callback = callback;
    this.inject_react = inject_react;
  }
  iterate( data ) {
    const len = data.length;
    return data.map(
      (datum, i) => (
        <LinkObj
          key={i}
          _key={datum.key}
          content={datum.content}
          inject_react={this.inject_react}
          class_info={this.class_info}
          separator={i === len-1 ? '' : this.separator}
          linkObjClick={(...args) => this.callback(...args)}
        />
      )
    );
  }
  iterate_list( data, list_class_info='' ) {
    return data.map(
      (datum, i) => (
        <li key={i} className={list_class_info}>
          <LinkObj
            _key={datum.key}
            content={datum.content}
            inject_react={this.inject_react}
            class_info={this.class_info}
            separator=''
            linkObjClick={(...args) => this.callback(...args)}
          />
        </li>
      )
    );
  }
}

export default LinkObjIterator;
