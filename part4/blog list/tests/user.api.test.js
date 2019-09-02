const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

describe('when there is initially one user in the db', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const user = new User({ name: 'superuser', username: 'root', password: 'secret' });
        await user.save();
    });

    test('users are returned as json', async () => {
        await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('the user can be retrieved', async () => {
        const usersAtStart = await helper.usersInDB();

        const response = await api.get('/api/users');
        
        const users = response.body;

        expect(users.length).toBe(usersAtStart.length);

        expect(users[0].name).toBe('superuser');
        expect(users[0].username).toBe('root');
        expect(users[0].passwordHash).not.toBeDefined();
    });

    test('creating a new user succeeds', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            name: 'Test User',
            username: 'test',
            password: 'password'
        };

        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creating a user fails with proper status and message if username is taken', async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'secret'
        };

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd.length).toBe(usersAtStart.length);
    });
});