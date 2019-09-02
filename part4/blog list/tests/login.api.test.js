const mongoose = require('mongoose');
const User = require('../models/user');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

describe('login api', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const password = 'secret';
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name: 'superuser',
            username: 'root',
            passwordHash: passwordHash
        });
        await user.save();
    });

    test('a token is returned when a user successfully logs in', async () => {
        const loginUser = {
            username: 'root',
            password: 'secret'
        };

        const result = await api.post('/api/login')
            .send(loginUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(result.body.token).toBeDefined();
    });

    afterAll(() => {
        mongoose.connection.close();
    });
});