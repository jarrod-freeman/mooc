import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryToDisplay, setCountryToDisplay] = useState(null);
  const [forceCountryDisplay, setForceContryDisplay] = useState(false);

  useEffect(() => {
    setForceContryDisplay(false);

    if(countries && countries.length === 1){
      setCountryToDisplay(countries[0]);
    }
  }, [countries]);

  const handleDisplayCountry = (country) => {
    setForceContryDisplay(true);
    setCountryToDisplay(country);
  };

  if(!forceCountryDisplay){
    if(countries && countries.length > 1){
      if(countryToDisplay){
        setCountryToDisplay(null);
      }
    }
  }

  return (
    <div>
      <Search onSearchComplete={setCountries} />
      <CountryList countries={countries} setCountryToDisplay={handleDisplayCountry} />
      <CountryDetails country={countryToDisplay} />
    </div>
  );
}

export default App;
