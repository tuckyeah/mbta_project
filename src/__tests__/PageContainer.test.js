import { render, screen, cleanup, waitFor } from '@testing-library/react';
import PageContainer, {formatRouteData, formatStopData} from '../PageContainer';
import {MOCK_ROUTES_RESPONSE, MOCK_STOPS_RESPONSE, FORMATTED_ROUTE_DATA, FORMATTED_STOPS_DATA,} from '../__mocks__/mock_constants.js'

let mockFetchMBTAData;

afterEach(() => cleanup());

test('renders the loading spinner', () => {
  mockFetchMBTAData = function() {
    return Promise.resolve(MOCK_ROUTES_RESPONSE);
  }
  render(<PageContainer fetchMBTAData={mockFetchMBTAData} />);
  expect(screen.queryByTestId('loadingSpinner')).toBeVisible();
});


test('renders the error spinner on failure to receive response', async () => {
  mockFetchMBTAData = function() {
    return Promise.resolve({});
  }
  render(<PageContainer fetchMBTAData={mockFetchMBTAData} />);
  await waitFor(() => {
    expect(screen.getByTestId('errorSpinner')).toBeTruthy();
    expect(screen.queryByTestId('loadingSpinner')).not.toBeInTheDocument();
  })
});

test('displays Please Select Banner on successful load', async () => {
  mockFetchMBTAData = function() {
    return Promise.resolve(MOCK_ROUTES_RESPONSE);
  }
  render(<PageContainer fetchMBTAData={mockFetchMBTAData} />);
  await waitFor(() => {
    expect(screen.queryByTestId('listsContainer')).toBeTruthy();
    expect(screen.queryByTestId('loadingSpinner')).not.toBeInTheDocument();
  })
});

test('displays Please Select Banner on successful load', async () => {
  mockFetchMBTAData = function() {
    return Promise.resolve(MOCK_ROUTES_RESPONSE);
  }
  render(<PageContainer fetchMBTAData={mockFetchMBTAData} />);
  await waitFor(() => {
    expect(screen.queryByTestId('listsContainer')).toBeTruthy();
    expect(screen.queryByTestId('loadingSpinner')).not.toBeInTheDocument();
  })
});

test('formats route data into the to be keyed off routeId: [directionName]', () => {
  const result = formatRouteData(MOCK_ROUTES_RESPONSE.data);
  expect(result).toEqual(FORMATTED_ROUTE_DATA)
});

test('formats stops data into the to be keyed off stopName: stopId', () => {
  const result = formatStopData(MOCK_STOPS_RESPONSE.data);
  expect(result).toEqual(FORMATTED_STOPS_DATA)
});


