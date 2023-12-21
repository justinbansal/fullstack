import axios from 'axios';
const api_key = import.meta.env.VITE_SOME_KEY;
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
}

const getWeatherForCity = (country) => {
  const city = country.capital[0];
  const request = axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${api_key}`)
  return request.then(response => {
    const { lat, lon } = response.data[0];
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    .then(response => response.data);
  });
}

export default { getCountries, getWeatherForCity };
