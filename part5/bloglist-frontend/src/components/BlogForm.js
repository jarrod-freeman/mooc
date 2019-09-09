import React, { useState } from 'react';

const BlogForm = ({ formSubmit }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreate = (event) => {
        event.preventDefault();

        const blog = {
            title,
            author,
            url
        };

        setTitle('');
        setAuthor('');
        setUrl('');

        formSubmit(blog);
    }

    return (
        <div>
            <h2>create new</h2>
            <div>
                title: 
                <input type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} />
            </div>
            <div>
                author: 
                <input type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author} />
            </div>
            <div>
                url: 
                <input type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url} />
            </div>
            <button onClick={handleCreate}>create</button>
        </div>
    );
};

export default BlogForm;