import React from 'react';
import JobsList from './jobComponenets/jobList';
import Filters from './jobComponenets/filters';
import { useState } from 'react';
function App() {
 
  const [filters, setFilters] = useState({ companyname: '' });

  return (
    <div className="App">
      <Filters filters={filters} setFilters={setFilters} />
      <JobsList filters={filters} />
    </div>
  );
}

export default App;
