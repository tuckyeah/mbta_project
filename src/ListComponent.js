import React from 'react';
import PropTypes from 'prop-types';

// Represents an individual list of data
const ListComponent = (props) => {
  const {listKey, listItems, onItemClick} = props;
  return (
    <>
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
  listItems: PropTypes.array,
  listKey: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

ListComponent.defaultProps = {
  listItems: []
};

export default ListComponent;