import React, {Component, Fragment} from 'react';
import ListsContainer from './ListsContainer';

// Base URL for the MBTA API
const MBTA_BASE_URL = 'https://api-v3.mbta.com/';

/**
  * Mappings of the sub-route maps for each endpoint. 
  * Routes is hardcoded to filter on Light & Heavy Rail
  * Stops takes in a routeName (str)
  * Prediction is harcoded to return only one (next) result, and takes in a directionId (0,1) and stopId (str)
  */
const MBTA_API_MAP = {
  route: 'routes?filter%5Btype%5D=0%2C1',
  stop: (routeName) => `stops?filter%5Broute%5D=${routeName}`,
  prediction: (directionId, stopId) => `predictions?page%5Boffset%5D=0&page%5Blimit%5D=1&filter%5Bdirection_id%5D=${directionId}&filter%5Bstop%5D=${stopId}`
}

// TODO: What am I doing with this.
// const QUERY_ORDER = ['route', 'stop', 'direction', 'prediction']

// TODO: Also improve error handling
/**
  * Generic function to hit the MBTA API with a specified formatted URL query path.
  * 
  * @param {str} queryPath - formatted URl path
  * 
  * @returns {Promise} JSON-encoded Response from API
  */
export const fetchMBTAData = (queryPath) => {
  return fetch(`${MBTA_BASE_URL}${queryPath}`)
    .then(res => res.json())
    .then(res => {
        console.log(res);
        return res;
    })
    .catch(err => console.error(err))
}

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

export default class PageContainer extends Component {
    state = {
      isPageLoading: true,
      hasError: false,
      activeStep: 'route',
      routeData: {},
      stopData: {},
      selected: {
        route: '',
        stop: '',
        direction: ''
      },
      departureTime: ''
    }

    // TODO: Trim down routeData to save just route name and direction destintation info
    // also revisit the way we are fetching
    /**
      * On initial page load, get Routes data. 
      * On successful fetch, set isLoading to false and format/update state with routeData
      * On error, display generic error message to user.
      */
    componentDidMount() {
      fetchMBTAData(MBTA_API_MAP[this.state.activeStep])
      .then(res => {
        this.setState({
          isPageLoading: false,
          routeData: formatRouteData(res.data)
        })
      })
      .catch(() => {
        this.setState({
          hasError: true
        })
      })
    }

    // fetchRouteData = () => {
    //   fetchMBTAData(MBTA_API_MAP[this.state.activeStep])
    //   .then(res => {
    //     this.setState({
    //       isPageLoading: false,
    //       routeData: formatRouteData(res.data)
    //     })
    //   })
    //   .catch(() => {
    //     this.setState({
    //       hasError: true
    //     })
    //   })
    // }

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
      // this.setState((prevState) => {
      //   return {
      //     selected: {
      //       ...prevState.selected,
      //       [selectedKey]: value
      //     },
      //     activeStep: 'stop'
      //   }
      // }, this.fetchStopsData)
      this.handleItemClick({
        selectedKey,
        value,
        nextStep: 'stop',
        cb: this.fetchStopsData
      })
    }

    handleStopClick = (selectedKey, value) => {
      // this.setState((prevState) => {
      //   return {
      //     selected: {
      //       ...prevState.selected,
      //       [selectedKey]: value
      //     },
      //     activeStep: 'direction'
      //   }
      // })
      // No need to provide a callback here - we don't need to fetch any directional data,
      // because we already have it when we got route data!
      this.handleItemClick({selectedKey, value, nextStep: 'direction'})
    }

    // TODO: This can be much cleaner since this is a binary value.
    handleDirectionClick = (selectedKey, value) => {
      console.log(selectedKey, value)
      // this.setState((prevState) => {
      //   return {
      //     selected: {
      //       ...prevState.selected,
      //       [selectedKey]: value
      //     }
      //   }
      // }, this.fetchPredictionData)
      // No need to provide a nextStep here - there is no next step!
      this.handleItemClick({selectedKey, value, cb: this.fetchPredictionData})
    }

    /**
      * I think there is definitely room for optimization among these fetch calls.
      * There's a lot of repeat code here.
      */
    fetchStopsData = () => {
      const url = MBTA_API_MAP['stop'](this.state.selected.route)
      this.setState({isLoading: true})
      return fetchMBTAData(url)
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
          console.error(err)
          this.setState({
            hasError: true
          })
        })
    }

    fetchPredictionData = () => {
      // TODO: add in some major error handling here, possibly lift out for testing purposes.
      const {selected: {direction, stop, route}, stopData, routeData} = this.state;
      console.log(stopData[stop])
      const directionIndex = routeData[route].indexOf(direction)
      console.log(directionIndex)
      const url = MBTA_API_MAP['prediction'](direction, stopData[stop])
      this.setState({isLoading: true});
      return fetchMBTAData(url)
        .then(res => {
          console.log(res)
          console.log(res.data[0].attributes.departure_time)
          // console.log(res.data[0].attributes)
          if (res?.data.length <= 0 || !res.data[0].attributes) {
            throw new Error()
          }
          const time = res.data[0].attributes.departure_time;

          // TODO: lift this out to test, especially for null
          const departureTime = time ? new Date(time) : 'NOT FOUND'

          this.setState({
            departureTime: departureTime.toString(),
            isLoading: false
          })
        })
        .catch(err => {
          console.error(err)
          this.setState({hasError: true})
        })
    }

    // TODO: Figure out if there is a better/cleaner way to test this
    resetData = () => {
      this.setState({
        stopData: {},
        directionTime: '',
        selected: {
          route: '',
          stop: '',
          direction: ''
        },
        activeStep: 'route',
        departureTime: '',
      })
    }

    render() {
      return (
        <div style={{width: '50%', border: '1px solid black'}}>

            {this.state.hasError && (
              <p style={{color: 'red'}}>Something went wrong!</p>
            )}

            {this.state.isPageLoading ? (
              <p>Loading...</p>
            ) : (
              <>
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
              </>
            )}
        </div>
      )
    }
}