import countriesService from './services/countries';

import { useState, useEffect } from 'react';

const App = () => {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState(null);
  const [country, setCountry] = useState(null);
  const [view, setView] = useState('search');

  const hook = () => {
    countriesService
      .getCountries()
      .then(initialCountries => {
        setCountries(initialCountries);
      })
  }

  useEffect(hook, []);

  const renderCountry = (country) => {
    setView('country');
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

  const handleSearch = (event) => {
    setQuery(event.target.value);
    let filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(event.target.value));
    console.log(filteredCountries);

    if (filteredCountries.length > 10) {
      setMessage('Too many matches, specify another filter');
      setResults(null);
      setCountry(null);
    }

    if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
      setView('list');
      setMessage('');
      const results = filteredCountries.map(country => (
        <li key={country.name.common}>{country.name.common} <button onClick={() => renderCountry(country)}>show</button></li>
      ))
      setResults(results);
    }

    if (filteredCountries.length === 1) {
      setMessage('');
      renderCountry(filteredCountries[0]);
    }
  }

  if (view === 'search') {
    return (
      <div>
        find countries <input type="text" onChange={handleSearch}/>
        <p>{message}</p>
      </div>
    )
  }

  if (view === 'list') {
    return (
      <div>
        find countries <input type="text" onChange={handleSearch}/>
        <p>{message}</p>
        <ul>
          {results}
        </ul>
      </div>
    )
  }

  if (view === 'country') {
    return (
      <div>
        find countries <input type="text" onChange={handleSearch}/>
        <p>{message}</p>
        {country}
      </div>
    )
  }
}

export default App;
