import './App.css';
import PageContainer from './PageContainer.js';

// Base URL for the MBTA API
const MBTA_BASE_URL = 'https://api-v3.mbta.com/';

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
    .catch(console.error)
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
