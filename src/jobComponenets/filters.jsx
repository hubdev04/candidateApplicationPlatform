// Filters.js
import React from 'react';

const Filters = ({filters, setFilters}) => {
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value
        }));
    };

  return (
    <div>
      <input
        type="text"
        name="companyname"
        value={filters.companyname}
        onChange={handleFilterChange}
        placeholder="Company name"
      />
      {/* Add other filter inputs similarly, make sure each has a corresponding value and onChange */}
    </div>
  );
};

export default Filters;
