import React from 'react';
import PropTypes from 'prop-types';
import ListComponent from './ListComponent';

// This is the main container component that is in charge of displaying the text on the page, as well as which list of data to show.
const ListsContainer = props => {
  const {
    activeStep,
    selectedData,
    departureTime,
    routeData,
    stopNames,
    onDirectionClick,
    onRouteClick,
    onStopClick
  } = props;

  return (
    <div style={{minHeight: '200px'}}>
      {departureTime ? (
        <h2 data-testid={'departureTimeHeader'}>Your next departure time is {departureTime}</h2>
      ) : (
        <p style={{fontSize: '2em'}} data-testid={'pleaseSelectBanner'}>
          Please select a {activeStep}
        </p>
      )}
      <div className={'selectedDataDisplay'}>
        {Object.keys(selectedData).map((data, index) => {
          return (<p key={index}>{data.toUpperCase()}: { selectedData[data] }</p>)
        })}
      </div>

      {activeStep === 'route' && (
        <span data-testid={'routeComponent'}>
          <ListComponent
            listItems={Object.keys(routeData)} 
            listKey={activeStep} 
            onItemClick={onRouteClick}
          />
        </span>
      )}

      {activeStep === 'stop' && (
        <span data-testid={'stopComponent'}>
        <ListComponent
          listItems={stopNames}
          listKey={activeStep}
          onItemClick={onStopClick}
        />
        </span>
      )}

      {activeStep === 'direction' && (
        <span data-testid={'directionComponent'}>
        <ListComponent
          listItems={routeData[selectedData.route]}
          listKey={activeStep}
          onItemClick={onDirectionClick}
        />
        </span>
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