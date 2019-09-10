import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const showWhenVisible = { display: detailsVisible ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const handleBlogClicked = (e) => {
        setDetailsVisible(!detailsVisible);
    };

    const handleLikeClicked = (e) => {
        const blogToUpdate = {
            id: blog.id,
            user: blog.user.id,
            likes: blog.likes + 1,
            title: blog.title,
            url: blog.url
        };

        updateBlog(blogToUpdate);
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
            </div>
        </div>
    );
};

export default Blog