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

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(people => {
            if(people){
                response.json(people.map(person => person.toJSON()));
            }
            else{
                response.status(204).end();
            }
        })
        .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person){
                response.json(person.toJSON());
            }
            else{
                response.status(204).end();
            }
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
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

    let person = new Person({
        name: body.name,
        number: body.number
    });

    person.save()
        .then(savedPerson => {
            response.json(savedPerson.toJSON());
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body;

    const person = {
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson.toJSON());
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if(error.name === 'CastError' && error.kind === 'ObjectId'){
        return response.status(400).send({ error: 'malformed id' });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});