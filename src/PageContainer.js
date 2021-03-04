import React, {Component, Fragment} from 'react';
import ListsContainer from './ListsContainer';

// Base URL for the MBTA API
const MBTA_BASE_URL = 'https://api-v3.mbta.com/';

/**
  * Mappings of the sub-route maps for each endpoint. 
  * Routes is hardcoded to filter on Light & Heavy Rail
  * Stops takes in a routeName
  * Prediction is harcoded to return only one (next) result, and takes in a directionId (0,1) and stopId
  */
const MBTA_API_MAP = {
  route: 'routes?filter%5Btype%5D=0%2C1',
  stop: (routeName) => `stops?filter%5Broute%5D=${routeName}`,
  prediction: (directionId, stopId) => `predictions?page%5Boffset%5D=0&page%5Blimit%5D=1&filter%5Bdirection_id%5D=${directionId}&filter%5Bstop%5D=${stopId}`
}

const QUERY_ORDER = ['route', 'stop', 'direction', 'prediction']

// TODO: I bet there is a cleaner and more robust way to do this.
// TODO: Also improve error handling
export const fetchMBTAData = (queryParams) => {
  return fetch(`${MBTA_BASE_URL}${queryParams}`)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        return res
    })
    .catch(err => console.error(err))
}

/** Given an obj of routeData from the API, retrieves and stores the relevant route name(id)
  * & corresponding directional information for later use (to save us the add'l API call) 
  * 
  */
export const formatRouteData = (routeData) => {
  return routeData.reduce((acc, curr) => {
    return {
      [curr.id]: [...curr.attributes.direction_names],
      ...acc
    }
  }, {})
}

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
      this.handleClickOnItem({
        selectedKey,
        value,
        nextStep: 'stop',
        cb: this.fetchStopsData
      })
    }

    handleClickOnItem = ({selectedKey, value, nextStep, cb}) => {
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

    // TODO: this sequence index approach doesn't work at all...
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
      this.handleClickOnItem({selectedKey, value, nextStep: 'direction'})
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
      this.handleClickOnItem({selectedKey, value, cb: this.fetchPredictionData})
    }

    fetchStopsData = () => {
      const url = MBTA_API_MAP['stop'](this.state.selected.route)
      return fetchMBTAData(url)
        .then(res => {
          if (!res?.data) {
            throw new Error();
          }

          this.setState({
            stopData: formatStopData(res.data)
          }, () => console.log(this.state.stopData))
        })
        .catch(err => {
          console.error(err)
          this.setState({
            hasError: true
          })
        })
    }

    fetchPredictionData = () => {
      const {selected: {direction, stop, route}, stopData, routeData} = this.state;
      console.log(stopData[stop])
      const directionIndex = routeData[route].indexOf(direction)
      console.log(directionIndex)
      const url = MBTA_API_MAP['prediction'](direction, stopData[stop])
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
          })
        })
        .catch(err => {
          console.error(err)
          this.setState({hasError: true})
        })
    }

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