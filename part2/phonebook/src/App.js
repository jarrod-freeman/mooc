import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Directory from './components/Directory';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const submitNewName = (event) => {
    event.preventDefault();

    if(!persons.find((person) => person.name === newName)){
      let person = {
        name: newName,
        number: newNumber
      };
  
      setPersons(persons.concat(person));
      resetForm();
    }
    else{
      alert(`${newName} is already add to phonebook`);
    }
  };

  const filterChangeHandler = (e) => setFilter(e.target.value);
  const nameChangedHandler = (e) => setNewName(e.target.value);
  const numberChangedHandler = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={filterChangeHandler} />
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={nameChangedHandler} 
        newNumber={newNumber} onNumberChange={numberChangedHandler} 
        onFormSubmit={submitNewName} />
      <h2>Numbers</h2>
      <Directory persons={persons} filter={filter} />
    </div>
  );
};

export default App