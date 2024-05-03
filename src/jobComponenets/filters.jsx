// // Filters.js
// import React from 'react';

// const Filters = ({filters, setFilters}) => {
//     const handleFilterChange = (event) => {
//         const { name, value } = event.target;
//         setFilters(prevFilters => ({
//           ...prevFilters,
//           [name]: value
//         }));
//     };

//   return (
//     <div>
//       <input
//         type="text"
//         name="location"
//         value={filters.location}
//         onChange={handleFilterChange}
//         placeholder="location"
//       />
//       {/* Add other filter inputs similarly, make sure each has a corresponding value and onChange */}
//     </div>
//   );
// };

// export default Filters;


import React, { useState } from 'react';

const Filters = ({ filters, setFilters }) => {
    // Define available filters here
    const filterOptions = [
        { key: 'location', name: 'Location' },
        { key: 'jobRole', name: 'Job Role' },
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
            [newFilterType]: ''
        });
    };

    const handleFilterValueChange = (event) => {
        // Update the value for the currently selected filter
        setFilters({
            ...filters,
            [selectedFilter]: event.target.value
        });
    };

    return (
        <div>
            <div>
                <label>Filter by: </label>
                <select onChange={handleFilterTypeChange} value={selectedFilter}>
                    <option value="">Select a filter</option>
                    {filterOptions.map(option => (
                        <option key={option.key} value={option.key}>{option.name}</option>
                    ))}
                </select>
            </div>
            {selectedFilter && (
                <div>
                    <input
                        type="text"
                        name={selectedFilter}
                        value={filters[selectedFilter] || ''}
                        onChange={handleFilterValueChange}
                        placeholder={`Enter ${filterOptions.find(opt => opt.key === selectedFilter)?.name}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Filters;
