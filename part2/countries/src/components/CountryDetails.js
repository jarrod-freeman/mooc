import React from 'react'

const CountryDetails = ({country}) => {
    
    const languageRows = () => {
        if(country === undefined || country.languages === undefined){
            return null;
        }

        return country.languages.map(language => <li key={language.name}>{language.name}</li>);
    }

    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                capital: {country.capital}                
            </div>
            <div>
                population: {country.population}
            </div>
            <h2>languages</h2>
            <ul>
                {languageRows()}
            </ul>
            <img src={country.flag} style={{"maxWidth": "200px"}} alt="country flag" />
        </div>
    );
};

export default CountryDetails;