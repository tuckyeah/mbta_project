import './App.css';
import PageContainer from './PageContainer.js';

// Base URL for the MBTA API
const MBTA_BASE_URL = 'https://api-v3.mbta.com/';

// TODO: Also improve error handling
/**
  * Generic function to hit the MBTA API with a specified formatted URL query path.
  * There's definitely more to be done here w/r/t ensuring our queryPath is correct.
  * 
  * @param {str} queryPath - formatted URl path
  * 
  * @returns {Promise} JSON-encoded Response from API
  */
export const fetchMBTAData = (queryPath) => {
  // console.log("Hello!")
  return fetch(`${MBTA_BASE_URL}${queryPath}`)
    .then(res => res.json())
    .then(res => {
        // console.log(res);
        return res;
    })
    .catch(err => console.error(err))
}

function App() {
  return (
    <div className="App">
        <PageContainer 
          fetchMBTAData={fetchMBTAData}
        />
    </div>
  );
}

export default App;
