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
  stops: (routeName) => `stops?filter%5Broute%5D=${routeName}`
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
        direction_names: {...curr.attributes.direction_names}
      },
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
      sequenceIndex: 0,
      selected: {
        route: '',
        stop: '',
        direction: ''
      }
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
      console.log('selectedKey', selectedKey);
      console.log('value', value)
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

    fetchStopsData = () => {
      const mapKey = QUERY_SEQUENCE[this.state.sequenceIndex];
      const url = MBTA_API_MAP['stops'](this.state.selected.route)
      return fetchMBTAData(url)
        .then(res => {
          this.setState({
            stopNames: getStopNameData(res.data)
          }, () => console.log(this.state.stopNames))
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
                routeNames={this.state.routeNameData}
                stopNames={this.state.stopNames}
                selectedData={this.state.selected}
                onRouteClick={this.handleItemClick}
                onStopClick={this.handleStopClick}
              />
            )} 

            {this.state.hasError && (
                <p style={{color: 'red'}}>Something went wrong!</p>
            )}
        </div>
      )
    }
}