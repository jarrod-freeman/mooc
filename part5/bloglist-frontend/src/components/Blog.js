import React, { useState } from 'react';

const Blog = ({ blog }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);

    const showWhenVisible = { display: detailsVisible ? '' : 'none' };

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const handleBlogClick = (e) => {
        setDetailsVisible(!detailsVisible);
    };

    return (
        <div style={blogStyle}>
            <div onClick={handleBlogClick}>
                {blog.title}
            </div>
            <div style={showWhenVisible}>
                <div>
                    {blog.url}
                </div>
                <div>
                    {blog.likes} likes <button>like</button>
                </div>
                <div>
                    added by {blog.author}
                </div>
            </div>
        </div>
    );
};

export default Blog