import React from 'react';
import Person from './Person';

const Directory = ({persons, filter, deleteHandler}) => {
  
  const personRows = () => {
      return persons.filter(person => {
        return person.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
      }).map(person => {
        return (
          <Person key={person.name} person={person} deleteHandler={() => deleteHandler(person)} />
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