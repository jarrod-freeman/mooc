require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('body', (request, response) => {
    if(request.method === 'POST'){
        return JSON.stringify(request.body);
    }

    return undefined;
});

app.use(bodyParser.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(express.static('build'));

app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has info for ${people.length} people</div><p>${new Date()}</p>`);
});

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people.map(person => person.toJSON()));
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person.toJSON());
    });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        });
    }

    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        });
    }

    // if(persons.find(person => person.name === body.name)){
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     });
    // }

    let person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        response.json(savedPerson.toJSON());
    })
});

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id);

    // persons = persons.filter(person => person.id !== id);

    // response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});