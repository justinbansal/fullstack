import axios from 'axios';

import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Add from './components/Add';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      })
  }

  useEffect(hook, []);

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter));

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return false;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));
      })
      .catch(error => console.log(error))
  }

  const handleChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <Add
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App;
