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
  const [successMessage, setSuccessMessage] = useState(null);

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
            setSuccessMessage(`Updated number for ${newName}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(`Failed to update number for ${newName}. Person may not exist anymore.`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000)
          })
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
        setSuccessMessage(`Added ${newName}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Failed to add ${newName}.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
      })
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
        setSuccessMessage(`Deleted ${name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Failed to delete ${name}. Person may not exist anymore.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000)
      })
   }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
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
