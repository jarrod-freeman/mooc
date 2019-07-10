import React from 'react'

const Filter = ({onFilterChange}) => {
    return (
        <div>
            filter shown with <input onChange={onFilterChange} />
        </div>
    );
};

export default Filter;