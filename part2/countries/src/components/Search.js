import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({onSearchComplete}) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
            .then(response => {
                onSearchComplete(response.data);
            })
            .catch(error => {
                onSearchComplete(undefined);
            });

    }, [searchTerm, onSearchComplete]);
    
    return (
        <div>
            find countries <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    );
};

export default Search;