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
                <input {...title} reset={null} />
            </div>
            <div>
                author:
                <input {...author} reset={null} />
            </div>
            <div>
                url:
                <input {...url} reset={null} />
            </div>
            <button onClick={handleCreate}>create</button>
        </div>
    );
};

export default BlogForm;