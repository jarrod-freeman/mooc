const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
    try{
        const users = await User.find({});
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