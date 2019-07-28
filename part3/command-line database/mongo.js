const mongoose = require('mongoose');

if(process.argv.length < 3){
    console.log('give password as argument');
    process.exit();
}

const password = process.argv[2];


const url = `mongodb+srv://fullstack:${password}@cluster0-zr45j.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true});

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

if(process.argv.length === 3){
    //display phonebook entries
    console.log('phonebook:');
    Person.find({}).then(people => {
        people.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
else if(process.argv.length === 5){
    //add new person to phonebook
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
        id: Math.floor(Math.random() * 100000),
        name: name,
        number: number
    });
    
    person.save().then(response => {
        console.log('person saved');
        mongoose.connection.close();
    });
}
else{
    console.log('invalid number of arguments provided');
    process.exit();
}