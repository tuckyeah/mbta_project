import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListComponent from './ListComponent';

// TODO: Think about how we want to display Direction, since this is stored as (and queried as) a binary
const ListsContainer = props => {
  const {
    activeStep,
    selectedData,
    departureTime,
    routeData,
    stopNames
  } = props;

  return (
    <div style={{minHeight: '200px'}}>
      {departureTime ? (
        <h2>Your next departure time is {departureTime}</h2>
      ) : (
        <p style={{fontSize: '2em'}}>
          Please select a {activeStep}
        </p>
      )}
      <div>
        {Object.keys(selectedData).map((data, index) => {
          return (<p key={index}>{data.toUpperCase()}: { selectedData[data] }</p>)
        })}
      </div>

      {activeStep === 'route' && (
        <ListComponent
          listItems={Object.keys(routeData)} 
          listKey={'route'} 
          onItemClick={props.onRouteClick}
        />
      )}

      {activeStep === 'stop' && (
        <ListComponent
          listItems={stopNames}
          listKey={'stop'}
          onItemClick={props.onStopClick}
        />
      )}

      {activeStep === 'direction' && (
        <ListComponent
          listItems={routeData[selectedData.route]}
          listKey={'direction'}
          onItemClick={props.onDirectionClick}
        />
      )}
    </div>
  )
};

ListsContainer.propTypes = {
  routeData: PropTypes.object,
  stopNames: PropTypes.array,
  selectedData: PropTypes.object.isRequired,
  onRouteClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired,
  onDirectionClick: PropTypes.func.isRequired,
  departureTime: PropTypes.string.isRequired,
  activeStep: PropTypes.string.isRequired
};

ListsContainer.defaultProps = {
  routeData: {},
  stopNames: []
}

export default ListsContainer;