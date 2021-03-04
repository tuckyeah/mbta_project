import React, {useState} from 'react';
import PropTypes from 'prop-types';
import ListComponent from './ListComponent';

export const formatDirectionData = (routeData, selectedStopName) => {
  console.log(routeData[selectedStopName])
  return Object.values(routeData[selectedStopName])
}
const ListsContainer = props => {
  return (
    <div>
      <ListComponent
        listItems={Object.keys(props.routeData)} 
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
      {props.selectedData.stop && (
        <>
        <p style={{'color': 'green'}}> You've selected the {props.selectedData.stop} stop</p>
        <ListComponent
          listItems={formatDirectionData(props.routeData, props.selectedData.route)}
          listKey={'direction'}
          onItemClick={(key, value)=>{
            // this works because the id of the direction is always its index. 
            // TODO: this is horrifically messy and repetitive - we can definitely clean it up
            const directionKey = Object.values(props.routeData[props.selectedData.route]).indexOf(value)
            console.log(directionKey)
            props.onDirectionClick('direction', directionKey)
          }}
        />
        </>
      )}
      {props.departureTime && (
        <h2>Your next departure time is {props.departureTime}</h2>
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
  departureTime: PropTypes.string.isRequired
};

ListsContainer.defaultProps = {
  routeData: {},
  stopNames: []
}

export default ListsContainer;