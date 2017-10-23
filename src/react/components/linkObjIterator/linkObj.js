import React from 'react';

function LinkObj ( props ) {
  const class_base = 'link-obj ',
        class_name = class_base + props.class_info;
  if (!props.inject_react) {
    return (
      <a className={class_name} onClick={(event) => props.linkObjClick(event, props._key)}>
        {props.content + props.separator}
      </a>
    );
  }
  else {
    return (
      <a className={class_name} onClick={(event) => props.linkObjClick(event, props._key)}>
        {props.content}
      </a>
    );
  }
}

export default LinkObj;
