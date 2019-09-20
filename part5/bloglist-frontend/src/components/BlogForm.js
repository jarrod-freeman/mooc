import React from 'react';
import { useField } from '../hooks';

const BlogForm = ({ formSubmit }) => {
    const title = useField('text');
    const author = useField('text');
    const url = useField('text');

    const handleCreate = (event) => {
        event.preventDefault();

        const blog = {
            title: title.value,
            author: author.value,
            url: url.value
        };

        title.reset();
        author.reset();
        url.reset();

        formSubmit(blog);
    };

    return (
        <div>
            <h2>create new</h2>
            <div>
                title:
                <input {...title} />
            </div>
            <div>
                author:
                <input {...author} />
            </div>
            <div>
                url:
                <input {...url} />
            </div>
            <button onClick={handleCreate}>create</button>
        </div>
    );
};

export default BlogForm;