import React, { useState } from 'react';
import Search from './components/Search';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);

  return (
    <div>
      <Search onSearchComplete={setCountries} />
      <CountryList countries={countries} />
    </div>
  );
}

export default App;
