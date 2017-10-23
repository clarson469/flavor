import React from 'react';

function Dropper ( props ) {
  const menu_class_name = 'drop-search-dropper scroll-text ' + (props.show ? '' : 'hide '),
        li_class_name = 'unstyled-list-item drop-search-item  ',
        button_class_name = 'clickable-obj no-outline fill-child container-left ';

  let data;
  if (props.search_value === '') data = null;
  else data = props.data
        .filter(item => item.includes(props.search_value))
        .slice(0, props.drop_limit || props.data.length)
        .map((item, i) =>
          <li key={i} className={li_class_name}>
            <button className={button_class_name} onClick={(event) => props.itemClick(event, item)}>
              {item}
            </button>
          </li>
        );
        
  return (
    <menu className={menu_class_name}>
      {data}
    </menu>
  );
}

export default Dropper;
