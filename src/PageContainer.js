import React, {Component, Fragment} from 'react';
import ListsContainer from './ListsContainer';

// Base URL for the MBTA API
const MBTA_BASE_URL = 'https://api-v3.mbta.com/';

/**
  * Mappings of the sub-route maps for each endpoint. 
  * Stops, Departures take in parameters for proper URL querying
  */
const MBTA_API_MAP = {
  routes: 'routes?filter%5Btype%5D=0%2C1',
  stops: (routeName) => `stops?filter%5Broute%5D=${routeName}`,
  prediction: (directionId, stopId) => `predictions?page%5Boffset%5D=0&page%5Blimit%5D=1&filter%5Bdirection_id%5D=${directionId}&filter%5Bstop%5D=${stopId}`
}

// The ordering of the data points we need to fetch.
const QUERY_SEQUENCE = ['routes', 'stops', 'directions', 'prediction']


// TODO: I bet there is a cleaner and more robust way to do this.
// TODO: Also improve error handling
export const fetchMBTAData = (queryParams) => {
    // console.log("I ran!");
    // const urlSubstr = '';
    // if (urlParams) {
    //   const urlSubstr = MBTA_API_MAP[apiMapKey]('Red');
    //   console.log(urlSubstr);
    // }
    return fetch(`${MBTA_BASE_URL}${queryParams}`)
      .then(res => res.json())
      .then(res => {
          console.log(res)
          return res
      })
      .catch(err => console.error(err))
}

export const getRouteNameData = (routeData) => routeData.map(route => route.id)
export const getStopNameData = (stopData) => stopData.map(stop => stop.attributes.name)

/** Given an obj of routeData from the API, retrieves and stores the relevant route name(id)
  * & corresponding directional information for later use (to save us the add'l API call) 
  * 
  */
export const formatRouteData = (routeData) => {
  return routeData.reduce((acc, curr) => {
    return {
      [curr.id]: {
        ...curr.attributes.direction_names
      },
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
      routeData: [],
      stopNames: [],
      stopData: {},
      sequenceIndex: 0,
      selected: {
        route: '',
        stop: '',
        direction: ''
      },
      departureTime: ''
    }

    // TODO: Trim down routeData to save just route name and direction destintation info
    // also revisit the way we are fetching
    componentDidMount() {
      fetchMBTAData(MBTA_API_MAP['routes'])
      .then(res => {
        this.setState({
          isPageLoading: false,
          routeNameData: getRouteNameData(res.data),
          routeData: formatRouteData(res.data)
        })
      })
      .catch(() => {
        this.setState({
          hasError: true
        })
      })
    }

    handleItemClick = (selectedKey, value) => {
      // this.setState({
      //   selected: {
      //     ...this.state.selected,
      //     [selectedKey]: value
      //   }
      // })
      this.setState((prevState) => {
        return {
          selected: {
            ...prevState.selected,
            [selectedKey]: value
          },
          sequenceIndex: prevState.sequenceIndex + 1
        }
      }, this.fetchStopsData)
    }

    // TODO: this sequence index approach doesn't work at all...
    handleStopClick = (selectedKey, value) => {
      // console.log('selectedKey', selectedKey);
      // console.log('value', value)
      this.setState((prevState) => {
        return {
          selected: {
            ...prevState.selected,
            [selectedKey]: value
          },
          sequenceIndex: prevState.sequenceIndex + 1
        }
      })
    }

    // TODO: This can be much cleaner since this is a binary value.
    handleDirectionClick = (selectedKey, value) => {
      this.setState((prevState) => {
        return {
          selected: {
            ...prevState.selected,
            [selectedKey]: value
          },
          sequenceIndex: prevState.sequenceIndex + 1
        }
      }, this.fetchPredictionData)
    }

    fetchStopsData = () => {
      const mapKey = QUERY_SEQUENCE[this.state.sequenceIndex];
      const url = MBTA_API_MAP['stops'](this.state.selected.route)
      return fetchMBTAData(url)
        .then(res => {
          this.setState({
            stopData: formatStopData(res.data),
            stopNames: getStopNameData(res.data)
          }, () => console.log(this.state.stopData))
        })
        .catch(err => console.error(err))
    }

    fetchPredictionData = () => {
      const {selected: {direction, stop}, stopData} = this.state;
      console.log(stopData[stop])
      const url = MBTA_API_MAP['prediction'](direction, stopData[stop])
      return fetchMBTAData(url)
        .then(res => {
          console.log(res)
          console.log(res.data[0].attributes.departure_time)
          const departureTime = new Date(res.data[0].attributes.departure_time)
          this.setState({
            departureTime: departureTime.toString()
          })
        })
        .catch(err => console.error(err))
    }

    render() {
      return (
        <div style={{width: '50%', border: '1px solid black'}}>
            <p>Hello World!</p>

            {this.state.isPageLoading ? (
              <p>Loading...</p>
            ) : (
              <ListsContainer 
                routeData={this.state.routeData}
                stopNames={Object.keys(this.state.stopData)}
                selectedData={this.state.selected}
                onRouteClick={this.handleItemClick}
                onStopClick={this.handleStopClick}
                onDirectionClick={this.handleDirectionClick}
                departureTime={this.state.departureTime}
              />
            )} 

            {this.state.hasError && (
                <p style={{color: 'red'}}>Something went wrong!</p>
            )}
        </div>
      )
    }
}