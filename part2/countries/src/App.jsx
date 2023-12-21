import countriesService from './services/countries';

import { useState, useEffect } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState(null);
  const [country, setCountry] = useState(null);

  const hook = () => {
    countriesService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries);
      })
  }

  useEffect(hook, []);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    let filteredCountries = countries.filter(country => country.name.common.includes(event.target.value));
    console.log(filteredCountries);

    if (filteredCountries.length > 10) {
      setMessage('Too many matches, specify another filter');
      setResults(null);
      setCountry(null);
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      setMessage('');
      // show all countries matching query
      const results = filteredCountries.map(country => (
        <li key={country.name.common}>{country.name.common}</li>
      ))
      setResults(results);
      setCountry(null);
    }

    if (filteredCountries.length === 1) {
      setMessage('');
      setResults(null);
      const country = filteredCountries[0];
      let markup = (
        <>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital[0]}</p>
          <p>area {country.area}</p>

          <p>languages:</p>
          <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
          </ul>
          <img src={country.flags.svg} alt={country.flags.alt} />
        </>
      )
      setCountry(markup);
    }
  }

  return (
    <div>
      <div>
        find countries <input type="text" onChange={handleSearch}/>
        <p>{message}</p>
        <ul>
          {results}
        </ul>
        {country}
      </div>
    </div>
  )
}

export default App;
