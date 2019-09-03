const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getDecodedToken = (request, response) => {
    const decodedToken = request.token !== undefined
        ? jwt.verify(request.token, process.env.SECRET)
        : null;

    if(!request.token || !decodedToken.id){
        return response.status(401).json({ error: 'token missing or invalid' });
    }

    return decodedToken;
};

blogsRouter.get('/', async (request, response, next) => {
    try{
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
        response.json(blogs.map(blog => blog.toJSON()));
    }
    catch(exception){
        next(exception);
    }
});

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body;

    try{
        const decodedToken = getDecodedToken(request, response);

        const user = await User.findById(decodedToken.id);

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        });

        const savedBlog = await blog.save();

        user.blogs = user.blogs.concat(savedBlog._id);
        await user.save();

        response.status(201).json(savedBlog);
    }
    catch(exception){
        next(exception);
    }
});

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body;

    const blog = {
        likes: body.likes
    };

    try{
        let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).exec();
        response.json(updatedBlog.toJSON());
    }
    catch(exception){
        next(exception);
    }
});

blogsRouter.delete('/:id', async (request, response, next) => {
    try{
        const decodedToken = getDecodedToken(request, response);

        const blog = await Blog.findById(request.params.id);

        if(blog.user.toString() !== decodedToken.id){
            response.status(422).json({ error: 'Unable to delete a blog belonging to another user' });
        }

        await Blog.findByIdAndDelete(request.params.id);
        response.status(204).end();
    }
    catch(exception){
        next(exception);
    }
});

module.exports = blogsRouter;