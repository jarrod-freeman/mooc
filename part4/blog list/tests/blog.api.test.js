const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blogs');
const helper = require('./test_helper');

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initalBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(helper.initalBlogs.length);
});

test('blogs are returned with an id property', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
});

test('a new blog post can be created', async () => {
    const blog = {
        title: 'A new blog',
        author: 'Author Name',
        url: 'google.com',
        likes: 5
    };

    const postResponse = await api.post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    expect(postResponse.body.title).toBe('A new blog');
    expect(postResponse.body.author).toBe('Author Name');
    expect(postResponse.body.url).toBe('google.com');
    expect(postResponse.body.likes).toBe(5);

    const response = await api.get('/api/blogs');

    expect(response.body.length).toBe(helper.initalBlogs.length + 1);
});

test('a new blog will default to 0 likes if the likes property is missing', async () => {
    const blog = {
        title: 'A new blog',
        author: 'Author Name',
        url: 'google.com'
    };

    const postResponse = await api.post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    expect(postResponse.body.likes).toBe(0);

    const response = await api.get('/api/blogs');

    expect(response.body[helper.initalBlogs.length].likes).toBe(0);
});

afterAll(() => {
    mongoose.connection.close();
});