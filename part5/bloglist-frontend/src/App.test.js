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
});