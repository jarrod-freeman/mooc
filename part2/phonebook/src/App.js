import React, { useState } from 'react';
import Directory from './components/Directory';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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