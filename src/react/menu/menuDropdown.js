import React from 'react';
import LinkObjIterator from './../components/linkObjIterator/';

function MenuDropdown ( props ) {
  const class_base = 'm child scroll-text ',
        class_name = class_base + (props.open ? '' : 'hide '),
        LOI = new LinkObjIterator('clickable-obj fill-child', '', props.linkObjClick),
        menu_items = LOI.iterate_list(
          [
            {key: 'about', content: 'About'},
            {key: 'filters', content: 'Filters'},
            {key: 'ingredients', content: 'All Ingredients'},
            {key: 'types', content: 'All Types'},
            {key: 'colors', content: 'Colors'}
          ],
          'm menu-item unstyled-list-item container-left '
        );
  return (
    <menu id='menu-dropdown' className={class_name}>
      {menu_items}
    </menu>
  );
}

export default MenuDropdown;
