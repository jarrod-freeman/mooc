const blogsRouter = require('express').Router();
const Blog = require('../models/blogs');

blogsRouter.get('/', async (request, response, next) => {
    try{
        const blogs = await Blog.find({});
        response.json(blogs.map(blog => blog.toJSON()));
    }
    catch(exception){
        next(exception);
    }
});

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body);

    await blog.save()
        .then(result => {
            response.status(201).json(result);
        });
});

module.exports = blogsRouter;