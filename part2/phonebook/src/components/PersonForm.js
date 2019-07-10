import React from 'react';

const PersonForm = ({newName, onNameChange, newNumber, onNumberChange, onFormSubmit}) => {
    return (
        <div>
            <form onSubmit={onFormSubmit}>
            <div>
                name: <input value={newName} onChange={onNameChange} />
            </div>
            <div>
                number: <input value={newNumber} onChange={onNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
            </form>
        </div>
    );
};

export default PersonForm;