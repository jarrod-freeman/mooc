import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('blog component', () => {
    let component;
    let mockUpdateHandler;
    let mockDeleteHandler;

    beforeEach(() => {
        const blog = {
            title: 'Blog Title',
            author: 'Blog Author',
            likes: 5
        };

        const user = {
            username: 'testUser'
        };

        mockUpdateHandler = jest.fn();
        mockDeleteHandler = jest.fn();

        component = render(<Blog blog={blog} user={user} updateBlog={mockUpdateHandler} deleteBlog={mockDeleteHandler} />);
    });

    test('blog title and author are shown by default', () => {
        const titleDiv = component.container.querySelector('.blogTitle');
        const authorDiv = component.container.querySelector('.blogAuthor');
        expect(titleDiv).toHaveTextContent('Blog Title');
        expect(authorDiv).toHaveTextContent('Blog Author');
    });

    test('clicking blog displays additional info', () => {
        const blogInfoDiv = component.container.querySelector('.blogInfo');
        expect(blogInfoDiv).toHaveStyle('display: none');

        const titleDiv = component.container.querySelector('.blogTitle');
        fireEvent.click(titleDiv);

        const blogInfoDivAfter = component.container.querySelector('.blogInfo');
        expect(blogInfoDivAfter).not.toHaveStyle('display: none');
    });
});