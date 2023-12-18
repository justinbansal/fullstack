import { useState } from 'react';

import Filter from './components/Filter';
import Add from './components/Add';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

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
    const personsCopy = persons.concat(newPerson);
    setPersons(personsCopy);
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
