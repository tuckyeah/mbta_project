import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListsContainer from './ListsContainer';

/**
  * Constants for the various keys used throughout the application.
  * These are used to:
  *   - indicate the active step
  *   - in the MBTA_API_MAP
  *   - indicate selected field
  */
export const ROUTE_KEY = 'route';
export const STOP_KEY = 'stop';
export const DIRECTION_KEY = 'direction';
export const PREDICTION_KEY = 'prediction';

/**
  * Mappings of the sub-route maps for each endpoint. 
  * Routes is hardcoded to filter on Light & Heavy Rail
  * Stops takes in a routeName (str)
  * Prediction is harcoded to return only one (next) result, and takes in a directionId (0,1) and stopId (str)
  */
const MBTA_API_MAP = {
  [ROUTE_KEY]: 'routes?filter%5Btype%5D=0%2C1',
  [STOP_KEY]: (routeName) => `stops?filter%5Broute%5D=${routeName}`,
  [PREDICTION_KEY]: (directionId, stopId) => `predictions?page%5Boffset%5D=0&page%5Blimit%5D=1&filter%5Bdirection_id%5D=${directionId}&filter%5Bstop%5D=${stopId}`
}

// Used to format the UTC date from the server into a nicer, more readable format.
const DATE_FORMAT_OPTIONS = {hour: '2-digit', minute: '2-digit', second: '2-digit'}

/** 
  * Given an obj of routeData from the API, retrieves and stores the route name(id)
  * & corresponding directional information for later use (to save us the add'l API call).
  * 
  * This assumes these are the only two data points we will ever need from this dataset for brevity, but
  * could be adapted to store object of key/value pairs by route name/ID if needed.
  * This is also nice because the Route ID is human readable and just the line name.
  * We're also in luck because the direction data is always a tuple, and direction_id represents its index.
  * 
  * @param {obj} routeData
  * 
  * @returns {obj} Object in the shape of {routeId: [directionNames]}
  */
export const formatRouteData = (routeData) => {
  return routeData.reduce((acc, curr) => {
    return {
      [curr.id]: [...curr.attributes.direction_names],
      ...acc
    }
  }, {})
}

/** 
  * Given an obj of stopData from the API, retrieves and stores the stop name and stop ID
  * 
  * Similar to the above, this assumes that this is the only data we will need, but could be
  * refactored to store an object instead. Unlike the above, the stop name is _not_ the same as the ID,
  * and the ID is not reader-friendly.
  * 
  * @param {obj} stopData
  * 
  * @returns {obj} Object in the shape of {stopName: stopId(string)}
  */
export const formatStopData = (stopData) => {
  return stopData.reduce((acc, curr) => {
    return {
      [curr.attributes.name]: curr.id,
      ...acc
    }
  }, {})
}

// This is the main Page Container which holds most of our business logic.
class PageContainer extends Component {
    state = {
      isLoading: true,
      hasError: false,
      activeStep: ROUTE_KEY,
      routeData: {},
      stopData: {},
      selected: {
        [ROUTE_KEY]: '',
        [STOP_KEY]: '',
        [DIRECTION_KEY]: ''
      },
      departureTime: ''
    }

    /**
      * On initial page load, get Routes data. 
      * On successful fetch, set isLoading to false and format/update state with routeData
      * On error, display generic error message to user.
      */
    componentDidMount() {
      this.props.fetchMBTAData(MBTA_API_MAP[this.state.activeStep])
      .then(res => {
        if (!res?.data || !res.data.length) {
          throw new Error()
        }
        this.setState({
          isLoading: false,
          routeData: formatRouteData(res.data)
        })
      })
      .catch(() => {
        this.handleError();
      })
    }

    /**
      * Generic handler for all list item clicks. Updates state with the
      * selected key/value pair from the list, and updates activeStep with the provided
      * nextStep, to indicate which part of the process we are on
      * (or none if we have reached the end of the line). Finally, calls the provided callback
      * to fetch the next data set.
      * 
      * String comparison is a bit risky so normally I would consider using constants, but felt this
      * was a bit easier to read, and a bit quicker to write.
      *
      * @param {obj} selectedKey: (str) - the selected field we are updating
      *              value: (str) - the selection
      *              nextStep: (str) - the next step in the process (route, stop, direction)
      *              cb: (func) - a callback function for fetching the next data set
      */
    handleItemClick = ({selectedKey, value, nextStep, cb}) => {
      this.setState((prevState) => {
        return {
          selected: {
            ...prevState.selected,
            [selectedKey]: value
          },
          activeStep: nextStep || ''
        }
      }, cb)
    }

    handleRouteClick = (selectedKey, value) => {
      this.handleItemClick({
        selectedKey,
        value,
        nextStep: STOP_KEY,
        cb: this.fetchStopsData
      })
    }

    handleStopClick = (selectedKey, value) => {
      // No need to provide a callback here - we don't need to fetch any directional data,
      // because we already have it when we got route data!
      this.handleItemClick({selectedKey, value, nextStep: DIRECTION_KEY})
    }

    handleDirectionClick = (selectedKey, value) => {
      // No need to provide a nextStep here - there is no next step!
      this.handleItemClick({selectedKey, value, cb: this.fetchPredictionData})
    }

    /**
      * Retrieves the stops data.
      */
    fetchStopsData = () => {
      const url = MBTA_API_MAP[STOP_KEY](this.state.selected.route)
      this.setState({isLoading: true})
      return this.props.fetchMBTAData(url)
        .then(res => {
          if (!res?.data) {
            throw new Error();
          }

          this.setState({
            stopData: formatStopData(res.data),
            isLoading: false
          })
        })
        .catch(err => {
          console.error(err);
          this.handleError();
        })
    }

    // There is also opportunity here for lifting out logic here to make more testable.
    fetchPredictionData = () => {
      const {selected: {direction, stop}, stopData} = this.state;
      const url = MBTA_API_MAP[PREDICTION_KEY](direction, stopData[stop])
      this.setState({isLoading: true});
      return this.props.fetchMBTAData(url)
        .then(res => {
          if (!res?.data.length || !res.data[0].attributes) {
            throw new Error()
          }
          const time = res.data[0].attributes.departure_time;
          // Sometimes we may not get a date time back if we're at the end of the line.
          // This generic handler helps prevent a 1969 date from showing up.
          const departureTime = time ? new Date(time) : 'NOT FOUND'
          this.setState({
            departureTime: departureTime.toLocaleDateString(navigator.language, DATE_FORMAT_OPTIONS),
            isLoading: false
          })
        })
        .catch(err => {
          console.error(err)
          this.handleError()
        })
    }

    /**
      * Generic error handler to set Loading to false and hasError to true. 
      * Fired on all failed fetch calls
      */
    handleError = () => {
      this.setState({
        hasError: true,
        isLoading: false
      });
    }

    /**
      * Used by the Reset button to clear all selected data back to an initial 'clean' state.
      * Retain routeData to save us an API call.
      */
    resetData = () => {
      this.setState({
        stopData: {},
        directionTime: '',
        selected: {
          route: '',
          stop: '',
          direction: ''
        },
        activeStep: [ROUTE_KEY],
        departureTime: '',
      })
    }

    render() {
      return (
        <div className={'main'}>

            {this.state.hasError && (
              <p style={{color: 'red'}} data-testid={'errorSpinner'}>Something went wrong!</p>
            )}

            {this.state.isLoading ? (
              <p data-testid={'loadingSpinner'}>Loading...</p>
            ) : (
              <span data-testid={'listsContainer'}>
                <ListsContainer
                  routeData={this.state.routeData}
                  stopNames={Object.keys(this.state.stopData)}
                  selectedData={this.state.selected}
                  onRouteClick={this.handleRouteClick}
                  onStopClick={this.handleStopClick}
                  onDirectionClick={this.handleDirectionClick}
                  departureTime={this.state.departureTime}
                  activeStep={this.state.activeStep}
                />
                <button onClick={this.resetData}>Reset</button>
              </span>
            )}
        </div>
      )
    }
}

PageContainer.propTypes = {
  fetchMBTAData: PropTypes.func.isRequired
}

export default PageContainer;