const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
    try{
        const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
        response.json(users.map(user => user.toJSON()));
    }
    catch(exception){
        next(exception);
    }
});

usersRouter.post('/', async (request, response, next) => {
    const body = request.body;
    const saltRounds = 10;

    try{
        if(body.password === undefined){
            response.status(400).json({ error: 'password is required' });
        }
        else if(body.password.length < 3){
            response.status(400).json({ error: `\`password\` (\`${body.password}\`) is shorter than the minimum allowed length (3)` });
        }

        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });

        const savedUser = await user.save();

        response.json(savedUser);
    }
    catch(exception){
        next(exception);
    }
});

module.exports = usersRouter;