import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import App from './App';

// describe method not necessary, but good for grouping together suite of tests

describe('Header', () => {
  test('"How it works" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /how it works/i });
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /how it works/i })
    ).toBeInTheDocument();
  });

  test('"About" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /about/i });
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /about/i })
    ).toBeInTheDocument();
  });

  test('"Logo" link points to the correct page', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const link = screen.getByRole('link', { name: /logo/i });
    userEvent.click(link);
    
    expect(
      screen.getByRole('heading', { name: /find the top posts on reddit/i })
    ).toBeInTheDocument();
  });
});
