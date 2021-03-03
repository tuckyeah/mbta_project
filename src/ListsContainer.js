import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListComponent from './ListComponent';

const ListsContainer = props => {
  return (
    <div>
      <ListComponent
        listItems={props.routeNames} 
        listKey={'route'} 
        onItemClick={props.onRouteClick}
      />
      {props.selectedData.route && (
        <p style={{color: 'blue'}}>You've selected the {props.selectedData.route} line</p>
      )}
      {props.stopNames && (
        <ListComponent
          listItems={props.stopNames}
          listKey={'stop'}
          onItemClick={props.onStopClick}
        />

      )}
    </div>
  )
};

ListsContainer.propTypes = {
  routeNames: PropTypes.array,
  stopNames: PropTypes.array,
  selectedData: PropTypes.object.isRequired,
  onRouteClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired
};

ListsContainer.defaultProps = {
  routeNames: [],
  stopNames: []
}

export default ListsContainer;