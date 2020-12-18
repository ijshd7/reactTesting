import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import App from './App';
import fetchMock from 'jest-fetch-mock';
import mockResponse from './__mocks__/subreddit-reactjs-response.json';

// test from the user's perspective
// use screen.debug()
// use getByRole, findByRole, etc.. for accessing DOM tree where possible

fetchMock.enableMocks();

// try using test.each for combining tests

// use this to replace: 
// render(
//   <MemoryRouter>
//     <App />
//   </MemoryRouter>
// );
// this prevents duplication of rendering

function setup() {
  return render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
}

describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    setup();
    const link = screen.getByRole('link', { name: /how it works/i });
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /how it works/i })
    ).toBeInTheDocument();
  });

  test('"About" link points to the correct page', () => {
    setup();
    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /about/i })
    ).toBeInTheDocument();
  });

  test('"Logo" link points to the correct page', () => {
    setup();
    const link = screen.getByRole('link', { name: /logo/i });
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /find the top posts on reddit/i })
    ).toBeInTheDocument();
  });
});

describe('Subreddit form', () => {
  test('loads posts that are rendered on the page', async () => {
     fetch.once(JSON.stringify(mockResponse));
    setup();

    const subredditInput = screen.getByLabelText('r /');
    userEvent.type(subredditInput, 'reactjs');

    const submitButton = screen.getByRole('button', { name: /search/i });
    userEvent.click(submitButton);

    // const loadingMessage = screen.getByText(/is loading/i);
    // expect(loadingMessage).toBeInTheDocument();
    expect(screen.getByText(/is loading/i)).toBeInTheDocument();

    // const numberOfTopPosts = await screen.findByText(/number of top posts:/i);
    // expect(await screen.findByText(/number of top posts: 25/i)).toBeInTheDocument();
    expect(await screen.findByText(/Number of top posts: 25/i)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/reactjs/top.json');
  });
});
