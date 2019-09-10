import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const showWhenVisible = { display: detailsVisible ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const handleBlogClicked = () => {
        setDetailsVisible(!detailsVisible);
    };

    const handleLikeClicked = () => {
        const blogToUpdate = {
            id: blog.id,
            user: blog.user.id,
            likes: blog.likes + 1,
            title: blog.title,
            url: blog.url
        };

        updateBlog(blogToUpdate);
    };

    const handleDeleteClicked = () => {
        if(window.confirm(`remove blog ${blog.title} by ${blog.author}?`)){
            deleteBlog(blog.id);
        }
    };

    return (
        <div style={blogStyle}>
            <div onClick={handleBlogClicked}>
                {blog.title}
            </div>
            <div style={showWhenVisible}>
                <div>
                    {blog.url}
                </div>
                <div>
                    {blog.likes} likes <button onClick={handleLikeClicked}>like</button>
                </div>
                <div>
                    added by {blog.author}
                </div>
                {blog.user && blog.user.username === user.username && <button onClick={handleDeleteClicked}>delete</button>}
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
};

export default Blog;