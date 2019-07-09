import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const personRows = () => {
    return persons.map(person => {
      return (
        <Person key={person.name} person={person} />
      )
    });
  }

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitNewName}>
        <div>
          name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personRows()}
    </div>
  );
};

export default App