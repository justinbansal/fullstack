import { useState, useEffect } from 'react';

import personService from './services/persons';

import Filter from './components/Filter';
import Add from './components/Add';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');

  const [filter, setFilter] = useState('');

  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    personService
      .getAll()
      .then(people => {
        setPersons(people);
      })
  }

  useEffect(hook, []);

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter));

  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedPerson = persons.find(person => person.name === newName);
    if (matchedPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...matchedPerson, number: newNumber};

        personService
          .update(matchedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== matchedPerson.id ? person : returnedPerson));
            setErrorMessage(`Updated number for ${newName}`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000)
          })
          .catch(error => console.error(error))
      }
      return false;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        setErrorMessage(`Added ${newName}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
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

  const handleDelete = (id, name) => {
   if (window.confirm(`Delete ${name}?`)) {
    personService
      .deletePerson(id)
      .then(removedPerson => {
        setPersons(persons.filter(person => person.id !== id));
      })
   }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <Add
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
