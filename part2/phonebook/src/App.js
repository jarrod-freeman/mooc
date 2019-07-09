import React, { useState } from 'react';
import Person from './components/Person';

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

  const personRows = () => {
    return persons.filter(person => {
      return person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
    }).map(person => {
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
      <div>
        filter shown with <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>add a new</h2>
      <div>
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
      </div>
      <h2>Numbers</h2>
      {personRows()}
    </div>
  );
};

export default App