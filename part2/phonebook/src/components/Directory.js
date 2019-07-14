import React from 'react';
import Person from './Person';
import personService from '../services/PersonService';

const Directory = ({persons, setPersons, filter}) => {
  const deletePerson = (personToDelete) => {
    if(window.confirm(`Delete ${personToDelete.name}?`)){
      personService.deletePerson(personToDelete);
      setPersons(persons.filter(person => person.id !== personToDelete.id));
    }
  };

  const personRows = () => {
      return persons.filter(person => {
        return person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      }).map(person => {
        return (
          <Person key={person.name} person={person} deleteHandler={() => deletePerson(person)} />
        )
      });
  };

  return (
      <div>
          {personRows()}
      </div>
  );
};

export default Directory;