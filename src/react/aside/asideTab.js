import React from 'react';

function AsideTab ( props ) {
  const class_base = 'a float-right no-outline tab-right ',
        class_name = class_base + (props.open ? 'open ' : 'closed ');
  return (
    <button id='aside-tab' className={class_name} onClick={() => props.tabClick()}></button>
  );
}

export default AsideTab;
