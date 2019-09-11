import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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

    test('the event handler is called when the button is clicked', () => {
        const mockClickHandler = jest.fn();
        const blog = {
            title: 'Blog Title',
            author: 'Blog Author',
            likes: 5
        };

        const component = render(<SimpleBlog blog={blog} onClick={mockClickHandler} />);
        const button = component.container.querySelector('button');

        fireEvent.click(button);
        fireEvent.click(button);

        expect(mockClickHandler.mock.calls.length).toBe(2);
    });
});