import React, { useState, useEffect } from 'react';
import Directory from './components/Directory';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/PersonService';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(persons => {
        setPersons(persons);
      });
  }, []);

  const resetForm = () => {
    setNewName('');
    setNewNumber('');
  }

  const submitNewName = (event) => {
    event.preventDefault();

    const person = persons.find(person => person.name === newName);

    if(!person){
      let newPerson = {
        name: newName,
        number: newNumber
      };

      personService.create(newPerson)
        .then(addedPerson => {
          setMessageType('notification');
          setMessage(`Added ${addedPerson.name}`);
          setPersons(persons.concat(addedPerson));
          resetForm();

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(error => {
          setMessageType('error');
          setMessage(error.response.data.error);

          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
    else{
      if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = { ...person, number: newNumber };
        personService.update(personToUpdate)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personToUpdate.id ? person : updatedPerson))
            resetForm('');
          })
      }
    }
  };

  const deletePerson = (personToDelete) => {
    if(window.confirm(`Delete ${personToDelete.name}?`)){
      personService.deletePerson(personToDelete.id)
        .then(success => {
          if(success){
            setPersons(persons.filter(person => person.id !== personToDelete.id));
          }
          else{
            setMessageType('error');
            setMessage(`Information of ${personToDelete.name} has already been removed form server`);
          }
        });
    }
  };

  const filterChangeHandler = (e) => setFilter(e.target.value);
  const nameChangedHandler = (e) => setNewName(e.target.value);
  const numberChangedHandler = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
      <Filter onFilterChange={filterChangeHandler} />
      <h2>add a new</h2>
      <PersonForm newName={newName} onNameChange={nameChangedHandler} 
        newNumber={newNumber} onNumberChange={numberChangedHandler} 
        onFormSubmit={submitNewName} />
      <h2>Numbers</h2>
      <Directory persons={persons} filter={filter} deleteHandler={deletePerson} />
    </div>
  );
};

export default App