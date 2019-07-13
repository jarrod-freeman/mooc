import React from 'react';

const CountryList = ({countries, setCountryToDisplay}) => {

    const countryRows = () => {
        return countries.map(country => {
            return <div key={country.name}>
                        {country.name} 
                        <button onClick={() => { 
                                    setCountryToDisplay(country);
                                }
                            }>show</button>
                    </div>
        });
    }
    
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
    }

    return null;
};

export default CountryList;