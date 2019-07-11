import React from 'react';
import CountryDetails from './CountryDetails';

const CountryList = ({countries}) => {

    const countryRows = () => countries.map(country => <div key={country.name}>{country.name}</div>);

    if(countries !== undefined){
        if(countries.length > 10){
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            );
        }
        else if(countries.length > 1){
            return (
                <div>
                    {countryRows()}
                </div>
            );
        }
        else if(countries.length === 1){
            return (
                <div>
                    <CountryDetails country={countries[0]} />
                </div>
            )
        }
    }

    return null;
};

export default CountryList;