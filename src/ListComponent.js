import React from 'react';
import PropTypes from 'prop-types';

// TODO: Fix up the key thing here
const ListComponent = (props) => {
  return (
    <ul>
      {props.listItems.map((item, index) => 
        <li key={index} onClick={() => props.onItemClick(props.listKey, item)}>
          {item}
        </li>
      )}
    </ul>
  )
}

ListComponent.propTypes = {
  listItems: PropTypes.array.isRequired,
  listKey: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default ListComponent;