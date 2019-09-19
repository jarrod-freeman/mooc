import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

jest.mock('./services/blogs');

describe('App Component', () => {
    test('if no user logged in, blogs are not rendered', async () => {
        const component = render(<App />);

        await waitForElement(() => component.getByText('login'));

        expect(component.container).toHaveTextContent('username');
        expect(component.container).toHaveTextContent('password');
    });

    test('when a user is logged in, the blog posts are rendered', async () => {
        const user = {
            username: 'test',
            token: '123456',
            name: 'Test User'
        };

        localStorage.setItem('loggedInUser', JSON.stringify(user));

        const component = render(<App />);

        await waitForElement(() => component.getByText('blogs'));

        expect(component.container).toHaveTextContent('Blog Title');
        expect(component.container).toHaveTextContent('Blog Author');
        expect(component.container).not.toHaveTextContent('username');
        expect(component.container).not.toHaveTextContent('password');
    });
});