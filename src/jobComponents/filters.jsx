

import React, { useState } from 'react';
import { Box, Container,Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, MenuItem, Select } from '@mui/material';
import FilterInput from '../shared/filtersUi/filterInput';
import FilterSelector from '../shared/filtersUi/filterSelector'
const Filters = ({ filters, setFilters }) => {
  // Define available filters here
  const filterOptions = [
     // Predefined filter options for job listings.
    { key: 'location', name: 'Location' },
    { key: 'jobRole', name: 'Job Role' },
    { key: 'minExp', name: 'Min Experience' },
    { key: 'minJdSalary', name: 'Min base Pay' },
    { key: 'workType', name: 'Work Type' }
    // Add more filters as needed
  ];

  // State to track the currently selected filter
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterTypeChange = (event) => {
    const newFilterType = event.target.value;
    setSelectedFilter(newFilterType);

    // Reset the corresponding filter value when changing the filter type
    setFilters({
      ...filters,
      [newFilterType]: ''// Ensures that when switching filters, the input starts empty.
    });
  };

  const handleFilterValueChange = (event) => {
    // Update the value for the currently selected filter

    setFilters({
      ...filters,
      workType: '',
      [selectedFilter]: event.target.value 
    });
  };

  const handleWorkTypeChange = (event) => {
    // Update workType filter directly
    setFilters({
      ...filters,
      [selectedFilter]: event.target.value, // Directly updates the workType in the filters state.
    });
  };

  return (
    <Container  display='flex' justifyContent='center' sx={{width:'33%'}}>
    <Box sx={{  }}>
      <Box sx={{ mb: 2}}>
        <FilterSelector selectedFilter={selectedFilter} handleFilterTypeChange={handleFilterTypeChange} filterOptions={filterOptions}/>
      </Box>
      {selectedFilter === 'workType' ? (
        <FilterInput selectedFilter={selectedFilter} filters={filters} handleFilterValueChange={handleFilterTypeChange} handleWorkTypeChange={handleWorkTypeChange} filterOptions={filterOptions}/>
      ) : (
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            type="text"
            name={selectedFilter}
            value={filters[selectedFilter] || ''}
            onChange={handleFilterValueChange}
            label={`Enter ${filterOptions.find(opt => opt.key === selectedFilter)?.name}`}
            variant="outlined"
          />
        </Box>
      )}
    </Box>
    </Container>
  );
};

export default Filters;
