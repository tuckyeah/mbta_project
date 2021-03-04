import React from 'react';
import PropTypes from 'prop-types';

const ListComponent = (props) => {
  const {listKey, listItems, onItemClick} = props;
  return (
    <>
    <p>{listKey}</p>
    <ul>
      {listItems.map((item, index) => 
        <li key={index} onClick={() => onItemClick(listKey, item)}>
          {item}
        </li>
      )}
    </ul>
    </>
  )
}

ListComponent.propTypes = {
  listItems: PropTypes.array.isRequired,
  listKey: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired
};

export default ListComponent;