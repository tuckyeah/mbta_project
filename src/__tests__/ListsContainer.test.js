import { render, screen, cleanup, waitFor } from '@testing-library/react';
import ListsContainer from '../ListsContainer';
import {MOCK_ROUTES_RESPONSE, FORMATTED_ROUTE_DATA, FORMATTED_STOPS_DATA} from '../__mocks__/mock_constants.js'

const initialProps = {
  activeStep: 'route',
  selectedData: {
      route: '',
      stop: '',
      direction: ''
  },
  departureTime: '',
  routeData: FORMATTED_ROUTE_DATA,
  stopNames: [],
  onDirectionClick: () => {},
  onStopClick: () => {},
  onRouteClick: () => {}
}

test('renders the departure time header if departure time is present', () => {
  render(<ListsContainer {...initialProps} departureTime={(new Date()).toString()} />);
  expect(screen.queryByTestId('departureTimeHeader')).toBeVisible();
});

test('renders the Please Select banner if departure time is not present', () => {
  render(<ListsContainer {...initialProps} />);
  expect(screen.queryByTestId('pleaseSelectBanner')).toBeVisible();
  expect(screen.queryByTestId('departureTimeHeader')).not.toBeInTheDocument();
});

test('renders the Route List component if active step is Route', () => {
  render(<ListsContainer {...initialProps} />);
  expect(screen.queryByTestId('routeComponent')).toBeVisible();
  expect(screen.queryByTestId('stopComponent')).not.toBeInTheDocument();
  expect(screen.queryByTestId('directionComponent')).not.toBeInTheDocument();
});

test('renders the Stop List component if active step is Stop', () => {
  render(<ListsContainer {...initialProps} activeStep={'stop'} />);
  expect(screen.queryByTestId('stopComponent')).toBeVisible();
  expect(screen.queryByTestId('routeComponent')).not.toBeInTheDocument();
  expect(screen.queryByTestId('directionComponent')).not.toBeInTheDocument();
});

test('renders the Direction List component if active step is Direction', () => {
  render(<ListsContainer 
          {...initialProps} 
          activeStep={'direction'} 
          selectedData={{...initialProps.selectedData, route: 'Red'}}
      />);
  expect(screen.queryByTestId('directionComponent')).toBeVisible();
  expect(screen.queryByTestId('routeComponent')).not.toBeInTheDocument();
  expect(screen.queryByTestId('stopComponent')).not.toBeInTheDocument();
});