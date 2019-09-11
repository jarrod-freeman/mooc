import React from 'react';
import { render } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('simple blog component', () => {
    test('renders title and author', () => {
        const blog = {
            title: 'Blog Title',
            author: 'Blog Author',
            likes: 5
        };

        const component = render(<SimpleBlog blog={blog} />);
        const div = component.container.querySelector('.blogTitleAuthor');
        expect(div).toHaveTextContent('Blog Title Blog Author');
    });

    test('renders amount of likes', () => {
        const blog = {
            title: 'Blog Title',
            author: 'Blog Author',
            likes: 5
        };

        const component = render(<SimpleBlog blog={blog} />);
        const div = component.container.querySelector('.blogLikes');
        expect(div).toHaveTextContent('blog has 5 likes');
    });
});